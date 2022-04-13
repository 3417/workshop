import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import plugin from '@/plugins/varlet';
const app = createApp(App);
app.use(router).use(createPinia()).use(plugin).mount('#app')
