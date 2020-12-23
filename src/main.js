import {
    createApp
} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
const app = createApp(App);

/* 全局样式 */
import '@/assets/css/index.scss';

/* 组件库 */
import elementPlus from '@/basics/element-plus'
elementPlus(app)
// import antd from '@/basics/ant-design-vue'
// antd(app)
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

app.use(antd).use(store).use(router).mount('#app')