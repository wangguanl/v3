const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const mockDir = path.join(process.cwd(), 'mock')
// 注册路由
function registerRoutes(app) {
  let mockLastIndex
  const Mocks = require('./modules/home')
  Mocks.map(({ url, type = 'get', response }) => {
    // const timer = Math.ceil(Math.random() * 10000);
    // console.log(timer)
    app[type](new RegExp(url), (req, res) => {
      // setTimeout(() => {
      res.json({
        code: 200,
        result: response(req)
      })

      // }, timer)
    });
    mockLastIndex = app._router.stack.length
  })
  const mockRoutesLength = Object.keys(Mocks).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

// 清除缓存 注销缓存内已注册的路由
function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}


module.exports = app => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // 监听文件改动，热更新服务
  chokidar.watch(mockDir, {
    // ignored: /mock/,
    // ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      console.log(456)
      try {
        // 监听文件改动，清空已经注册的路由stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 清除已缓存的路由
        unregisterRoutes()

        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
