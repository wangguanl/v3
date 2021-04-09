import {
    createApp
} from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

const app = createApp(App);

/* 组件库 */
import elementPlus from '@/basics/element-plus'
app.use(store).use(router).use(elementPlus).mount('#app')
