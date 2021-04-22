export default [
  {
    path: 'searchbar',
    name: 'SearchBar',
    meta: { title: '搜索栏-searchbar', icon: 'el-icon-s-check' },
    component: () => import(/* webpackChunkName: "SearchBar" */ '@/views/ComponentsDemo/SearchBar'),
    children: []
  },
  {
    path: 'table',
    name: 'Table',
    meta: { title: '表格-table', icon: 'el-icon-s-check' },
    component: () => import(/* webpackChunkName: "Table" */ '@/views/ComponentsDemo/Table'),
    children: []
  },
  {
    path: 'form',
    name: 'Form',
    meta: { title: '表单-form', icon: 'el-icon-s-check' },
    component: () => import(/* webpackChunkName: "Form" */ '@/views/ComponentsDemo/Form'),
    children: []
  },
  {
    path: 'handleuploadpic',
    name: 'handleUploadPic',
    meta: { title: '上传-handleUploadPic', icon: 'el-icon-s-check' },
    component: () => import(/* webpackChunkName: "handleUploadPic" */ '@/views/ComponentsDemo/Upload/handleUploadPic'),
    children: []
  },
]