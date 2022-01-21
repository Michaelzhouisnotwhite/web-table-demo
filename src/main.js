import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'


const app = createApp(App)

app.config.globalProperties.$http = axios
axios.defaults.baseURL = "https://www.escook.cn"

app.mount('#app')
