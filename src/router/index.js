import {
  createRouter,
  createWebHistory
} from 'vue-router'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [{
    path: '',
    component: () => import('@/views/Home/index.vue')
  }],
})

export default router