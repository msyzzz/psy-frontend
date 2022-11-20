import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus';
import Axios from 'axios'
import 'element-plus/dist/index.css';
const app = createApp(App)
app.config.globalProperties.$http = Axios
Axios.defaults.baseURL="https://localhost:3000"
app.use(router).use(ElementPlus).mount('#app')
