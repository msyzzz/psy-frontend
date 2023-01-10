import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus';
import axios from './http'
import 'element-plus/dist/index.css';
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App)
app.config.globalProperties.$http = axios
axios.defaults.baseURL="http://localhost:3000"
app.use(router).use(ElementPlus).mount('#app')

for(let iconName in ElIconModules){
    app.component(iconName, ElIconModules[iconName])
}