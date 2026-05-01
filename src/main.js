import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const { loadEnvFile } = require("node:process");
loadEnvFile("../.env");

const app = createApp(App)

app.use(router)

app.mount('#app')
