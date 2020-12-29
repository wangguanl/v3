export default [{
    path: 'SupplyRelations',
    name: 'SupplyRelations',
    meta: {
        icon: '',
        title: '个人现有供给信息',
    },
    component: () => import('@/views/Home')
}, {
    path: 'SupplyRelationsHistory',
    name: 'SupplyRelationsHistory',
    meta: {
        icon: '',
        title: '变更历史记录查询',
    },
    component: () => import('@/views/Home')
}]