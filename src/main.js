import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import "normalize.css";
/* 组件库 */
import elementPlus from "@/basics/element-plus";
import components from "@/components/install"; // 自定义组件
createApp(App)
  .use(router)
  .use(store)
  .use(elementPlus)
  .use(components)
  .mount("#app");
