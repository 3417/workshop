import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import plugin from '@/plugins/varlet';
import '@as/style/iconfont.css';
import '@as/style/common.scss';
const app = createApp(App);
app.use(router).use(createPinia()).use(plugin).mount('#app')
