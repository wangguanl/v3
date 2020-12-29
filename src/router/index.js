import {
  createRouter,
  createWebHistory
} from 'vue-router'

import {
  constantRouterMap,
} from './routers'

const CreateRouter = () => createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: (to, from, savePosition) => (savePosition ? savePosition : {
    top: 0
  }),
  routes: constantRouterMap,
})

const router = CreateRouter();

export const ResetRouter = () => {
  router.matcher = CreateRouter().matcher
}

export default router