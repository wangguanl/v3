export default [
  {
    path: 'searchbar',
    name: 'SearchBar',
    meta: { title: '搜索栏-searchbar', icon: 'el-icon-s-check' },
    component: () => import(/* webpackChunkName: "SearchBar" */ '@/views/ComponentsDemo/SearchBar'),
    children: []
  },
  // {
  //   path: 'menu2',
  //   name: 'Menu2',
  //   meta: { title: '子路由2', icon: 'el-icon-s-check' },
  //   component: () => import(/* webpackChunkName: "Menu2" */ '@/views/ComponentDemos/Menu2'),
  // },
]