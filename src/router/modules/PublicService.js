export default [{
    path: 'Message',
    name: 'Message',
    meta: {
        icon: '',
        title: '消息管理',
    },
    component: () => import('@/views/Home')
}, {
    path: 'Notice',
    name: 'Notice',
    meta: {
        icon: '',
        title: '公告管理',
    },
    component: () => import('@/views/Home')
}, {
    path: 'Private',
    name: 'Private',
    meta: {
        icon: '',
        title: '私信管理',
    },
    component: () => import('@/views/Home')
}, {
    path: 'Opinion',
    name: 'Opinion',
    meta: {
        icon: '',
        title: '意见反馈',
    },
    component: () => import('@/views/Home')
}]