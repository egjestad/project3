import './assets/main.css'

import { createApp } from 'vue'
import router from '@/router/'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useLoginUserStore } from './store/loginUserStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const userStore = useLoginUserStore()
userStore.loadUserFromStorage()

app.mount('#app')
