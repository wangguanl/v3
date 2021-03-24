import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

import router, { ResetRouter } from '@/router'
import store from '@/store'

import dictionaries from '@/mock/dictionaries'

// 全局路由跳转之前触发
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    // 终止所有请求
    store.commit('REMOVE_PENGDINGS');
    if (to.path !== '/login') {
        // 获取权限
        if (!(store.getters['permission/asyncRouterMap'].length)) {
            store.dispatch('SET_Dictionaries', dictionaries)
            const Routes = await store.dispatch('permission/GenerateRoutes')

            router.addRoute(...Routes);
            next({
                name: Routes[0].children[0].name
            });
            // 获取字典
        } /* else if (JSON.stringify(store.getters['dictionaries']) === '{}') {
            store.dispatch('SET_Dictionaries', dictionaries)
            next('/');
        } */ else {
            next();
        }
    } else {
        next();
    }





    /* 
    // 如果本地缓存中有登录信息， 则调用SET_USERINFO进行赋值
    localStorage.userinfo && store.commit('SET_USERINFO', JSON.parse(localStorage.userinfo));
    
    // 已登录
    if (store.getters.token) {
        if (to.path === '/login') {
            NProgress.done();
            next({
                path: '/'
            });
        } else {
            next();
            // 为空时，未获取权限路由
            if (!(store.getters['permission/asyncRouterMap'].length)) {
                const Routes = await store.dispatch('permission/GenerateRoutes')
                console.log(Routes)
                router.Routes(Routes);
                next({
                    path: '/'
                });
            } else {
                next();
            }
        }
    } else {
        if (to.path !== '/login') {
            next({
                path: '/login'
            });
        } else if (to.path === '/login') {
            NProgress.done();
            next();
        }
    } */
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
})