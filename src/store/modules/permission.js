export default {
    strict: true,
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    }
}

/*
 * 生成侧边栏展示导航
 * 生成一级路由
 */

// GenerateRoutes({
//     commit
// }) {
//     return new Promise(async resolve => {
//         // const asyncRoutesData = await axios.get('/jbk/auth/main/menu', {})
//         let {
//             addRoutes,
//             asyncRoutes
//         } = generaterRoutes(asyncRoutesData);
//         commit('SET_ROUTERS', asyncRoutes);
//         const R = deepCopy(constantRouterMap)
//         R[0].redirect = { name: addRoutes[0].name };
//         R[0].children = addRoutes;
//         resolve(R)
//         /* resolve([...R, {
//             path: '/:pathMatch(.*)*',
//             component: () => import('@/views/Home'),
//             meta: {
//                 icon: '',
//                 title: '页面找不到了'
//             }
//         }]); */
//     })
// }
// function generaterRoutes(Router) {

//     const asyncRoutes = {};
//     asyncRouterMap.forEach((r) => (asyncRoutes[r.name] = r));

//     const addRoutes = [];

//     function filterAsyncRouter(Router) {
//         return Router.filter(({
//             isHidden
//         }) => Object.is(isHidden, 0)).map(router => {
//             const {
//                 children,
//                 path,
//                 label,
//                 imgUrl
//             } = router;
//             let Route = {
//                 path,
//                 name: path,
//                 meta: {
//                     icon: imgUrl,
//                     title: label,
//                 },
//                 children: [],
//             };
//             if (Array.isArray(children) && children.length) {
//                 const c = filterAsyncRouter(children);
//                 Route.children = c;
//                 c.length && (Route.redirect = {
//                     name: c[0].name
//                 })
//             }
//             const R = asyncRoutes[path];
//             if (R) {
//                 // 通过component字段的值来区分是否为组件： 字符串（导航）  组件（实体路由）
//                 Route.component = path;
//                 addRoutes.push({
//                     ...R,
//                     ...Route,
//                     component: R.component
//                 });
//             }
//             return Route
//         })
//     }
//     return {
//         asyncRoutes: filterAsyncRouter(Router), //  侧边栏展示集合, 数据格式：tree
//         addRoutes, // 动态添加路由集合, 数据格式：展开扁平化
//     }
// }