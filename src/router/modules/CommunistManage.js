export default [{
    path: 'ThreeSessions',
    name: 'ThreeSessions',
    meta: {
        icon: '',
        title: '三会一课',
    },
    component: () => import('@/views/Home')
}, {
    path: 'OrganizationIn',
    name: 'OrganizationIn',
    meta: {
        icon: '',
        title: '党员信息录入',
    },
    component: () => import('@/views/Home')
}, {
    path: 'OrganizationManage',
    name: 'OrganizationManage',
    meta: {
        icon: '',
        title: '党组织关系管理',
    },
    component: () => import('@/views/Home')
}, {
    path: 'OrganizationSetting',
    name: 'OrganizationSetting',
    meta: {
        icon: '',
        title: '组织架构设置',
    },
    component: () => import('@/views/Home')
}, {
    path: 'ChangeOffice',
    name: 'ChangeOffice',
    meta: {
        icon: '',
        title: '换届提醒',
    },
    component: () => import('@/views/Home')
}, {
    path: 'Education',
    name: 'Education',
    meta: {
        icon: '',
        title: '党员教育学习',
    },
    component: () => import('@/views/Home')
}, {
    path: 'Examination',
    name: 'Examination',
    meta: {
        icon: '',
        title: '线上考试',
    },
    component: () => import('@/views/Home')
},
{
    path: 'Activity',
    name: 'Activity',
    meta: {
        icon: '',
        title: '群团工作活动',
    },
    component: () => import('@/views/Home')
}
]