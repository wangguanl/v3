const ModulesFiles = require.context("./modules", true, /\.js$/);
const { Menu, ComponentsDemo } = ModulesFiles.keys().reduce(
  (modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = ModulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  },
  {}
);

export const constantRouterMap = [
  {
    path: "/Login",
    name: "Login",
    props: true,
    meta: {
      icon: "",
      title: "后台管理系统-登录",
    },
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login"),
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "Layout" */ "@/views/Layout"),
    meta: {
      icon: "",
      title: "后台管理系统",
    },
    redirect: { name: "Home" },
    children: [
      {
        path: "",
        name: "Home",
        meta: { title: "首页", icon: "el-icon-s-check" },
        component: () => import(/* webpackChunkName: "Home" */ "@/views/Home"),
        children: [],
      },
      {
        path: "componentsdemo",
        name: "ComponentsDemo",
        meta: { title: "组件 demo", icon: "el-icon-s-grid" },
        component: () =>
          import(
            /* webpackChunkName: "ComponentsDemo" */ "@/views/ComponentsDemo"
          ),
        children: ComponentsDemo,
        redirect: { name: ComponentsDemo[0].name },
      },
      {
        path: "menu",
        name: "Menu",
        meta: { title: "嵌套路由", icon: "el-icon-s-grid" },
        component: () => import(/* webpackChunkName: "Menu" */ "@/views/Menu"),
        children: Menu,
      },
    ],
  },
];
