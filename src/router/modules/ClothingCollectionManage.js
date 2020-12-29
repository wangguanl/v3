export default [{
    path: 'ClothingCollection',
    name: 'ClothingCollection',
    meta: {
        icon: '',
        title: '个人被装档案信息',
    },
    component: () => import('@/views/Home')
}, {
    path: 'ClothingCollectionHistory',
    name: 'ClothingCollectionHistory',
    meta: {
        icon: '',
        title: '被装领取记录查询',
    },
    component: () => import('@/views/Home')
}]