import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

import router from '@/router'
import { PD } from '@/basics/request'

// 全局路由跳转之前触发
router.beforeEach((to, from, next) => {
    NProgress.start();
    // 切换页面（路由）时终止所有请求
    PD.REMOVE_PENGDINGS();

    next();
});

router.afterEach(() => {
    NProgress.done() // 结束Progress
})