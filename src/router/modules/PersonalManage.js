export default [{
    path: 'PersonalInformation',
    name: 'PersonalInformation',
    meta: {
        icon: '',
        title: '个人信息管理',
    },
    component: () => import('@/views/Home')
}, {
    path: 'PersonalInformationChangeHistory',
    name: 'PersonalInformationChangeHistory',
    meta: {
        icon: '',
        title: '变更历史信息',
    },
    component: () => import('@/views/Home')
}, {
    path: 'PersonalInformationChangeApply',
    name: 'PersonalInformationChangeApply',
    meta: {
        icon: '',
        title: '变更申请',
    },
    component: () => import('@/views/Home')
}]