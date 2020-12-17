import {
  createRouter,
  createWebHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '',
    redirect: '/SearchBar',
  }, {
    path: '/SearchBar',
    component: () => import('@/components/index.vue')
  }, {
    path: '/AntdForm',
    component: () => import('@/views/Forms/AntdForm')
  }],
})

export default router