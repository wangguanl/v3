export default [{
    path: 'Housing',
    name: 'Housing',
    meta: {
        icon: '',
        title: '个人现有住房信息',
    },
    component: () => import('@/views/Home')
}, {
    path: 'HousingHistory',
    name: 'HousingHistory',
    meta: {
        icon: '',
        title: '历史记录查询',
    },
    component: () => import('@/views/Home')
}]