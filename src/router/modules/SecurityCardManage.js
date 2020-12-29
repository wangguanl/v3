export default [{
    path: 'SecurityCard',
    name: 'SecurityCard',
    meta: {
        icon: '',
        title: '个人保障卡信息',
    },
    component: () => import('@/views/Home')
}, {
    path: 'SecurityCardApply',
    name: 'SecurityCardApply',
    meta: {
        icon: '',
        title: '补换卡申请',
    },
    component: () => import('@/views/Home')
}, {
    path: 'SecurityCardHistory',
    name: 'SecurityCardHistory',
    meta: {
        icon: '',
        title: '补换卡进度查询',
    },
    component: () => import('@/views/Home')
}]