const Mock = require('mockjs')

const List = []
const total = Math.ceil(Math.random() * 1000)
for (let i = 0; i < total; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    name: '@first',
    qq: '@integer(0,9999999999)',
    content: '@title(5, 10)',
    createTime: '@datetime',
    gender: '@integer(0, 1)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    platforms: ['a-platform'],
  }))
}
module.exports = [
  {
    url: '/tables',
    type: 'post',
    response: config => {
      const { currentPage = 1, pageSize = 20, qq, gender, name } = config.body;

      const FilterData = List.filter(item => (item.qq + '').match(new RegExp(qq))).filter(item => (!gender && gender !== 0) ? item : item.gender === gender).filter(item => item.name.match(new RegExp(name)));
      return {
        code: 200,
        result: {
          total: FilterData.length,
          data: FilterData.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))
        }
      }
    }
  },
  {
    url: '/dictionaries',
    type: 'post',
    response: () => {
      return {
        code: 200,
        result: {
          gender: [{
            value: 0,
            label: '女'
          }, {
            value: 1,
            label: '男'
          }]
        }
      }
    }
  },
  {
    url: '/routes',
    type: 'post',
    response: () => {
      return {
        code: 200,
        result: [{
          parentId: 0,
          id: 1,
          label: '首页',
          icon: 'el-icon-s-check',
          children: []
        }, {
          parentId: 0,
          id: 2,
          label: '路由嵌套',
          icon: 'el-icon-s-grid',
          children: [{
            parentId: 2,
            id: 3,
            label: '1-1',
            children: []
          }, {
            parentId: 2,
            id: 4,
            label: '1-2',
            children: []
          }, {
            parentId: 2,
            id: 5,
            label: '1-3',
            children: [{
              parentId: 5,
              id: 6,
              label: '3-1',
              children: []
            }, {
              parentId: 5,
              id: 7,
              label: '3-2',
              children: []
            }]
          }]
        }],
      }
    }
  },
]

