export const constantRouterMap = [{
    path: '/',
    component: () => import('@/views/Layout'),
    meta: {
        icon: '',
        title: '首页'
    },
    children: []
}, {
    path: '/Login',
    component: () => import('@/views/Login'),
    meta: {
        icon: '',
        title: '登录'
    }
}];
const ModulesFiles = require.context('./modules', true, /\.js$/);
const Modules = ModulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = ModulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});
export const asyncRouterMap = Object.values(Modules).flat();