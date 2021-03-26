module.exports = {
    // publicPath: './', // 相对路径
    productionSourceMap: false,
    devServer: {
        before: require('./mock/mock-server.js')
    },
    /* chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    } */

}