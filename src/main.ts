import './assets/main.css'

import { createApp } from 'vue'
import router from '@/router/'
import App from './App.vue'
import CalculatorComponent from '@/components/CalculatorComponent.vue'

const app = createApp(App)

app.use(router)
app.component('CalculatorComponent', CalculatorComponent)

app.mount('#app')
