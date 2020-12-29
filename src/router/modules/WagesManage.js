export default [{
    path: 'WagesInformation',
    name: 'WagesInformation',
    meta: {
        icon: '',
        title: '个人工资信息查询',
    },
    component: () => import('@/views/Home')
}, {
    path: 'WagesDetail',
    name: 'WagesDetail',
    meta: {
        icon: '',
        title: '历次工资发放记录',
    },
    component: () => import('@/views/Home')
}]