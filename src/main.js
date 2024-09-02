import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // router/index.js からインポート
import '@/assets/styles/main.css'
import { BootstrapVue3, BModal } from 'bootstrap-vue-3'

const app = createApp(App)

// BootstrapVue3の設定
app.use(BootstrapVue3)
app.component('b-modal', BModal)

app.use(router) // ルーターをアプリケーションに組み込む

app.mount('#app')
