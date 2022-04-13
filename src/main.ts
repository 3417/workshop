import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Button } from '@varlet/ui'
import '@varlet/ui/es/button/style/index.js'
const app = createApp(App);
app.use(router).use(createPinia()).use(Button).mount('#app')
