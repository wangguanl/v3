import {
    createApp
} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
const app = createApp(App);

/* 全局样式 */
import '@/assets/css/index.scss';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// import Element3 from 'element3'
// import 'element3/lib/theme-chalk/index.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
app.use(Antd).use(ElementPlus).use(store).use(router).mount('#app')