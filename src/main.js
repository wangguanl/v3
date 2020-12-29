import {
    createApp
} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
const app = createApp(App);

import '@/router/routereEach'

/* 全局样式 */
import '@/assets/css/index.scss';

/* 组件库 */
/* import elementPlus from '@/basics/element-plus'
elementPlus(app) */


import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

app.use(ElementPlus).use(store).use(router).mount('#app')
