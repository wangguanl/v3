export default [{
    path: 'Bedclothes',
    name: 'Bedclothes',
    meta: {
        icon: '',
        title: '被装统计分析',
    },
    component: () => import('@/views/Home')
}, {
    path: 'personnel',
    name: 'personnel',
    meta: {
        icon: '',
        title: '人员统计分析',
    },
    component: () => import('@/views/Home')
}]