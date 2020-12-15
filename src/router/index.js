import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '/ElForm',
    component: () => import('@/views/Forms/ElForm')
  }, {
    path: '/AntdForm',
    component: () => import('@/views/Forms/AntdForm')
  }, {
    path: '/AntdForm2',
    component: () => import('@/views/Forms/AntdForm2')
  }]
})

export default router