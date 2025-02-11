import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '@/views/CalculatorView.vue'
import HomeView from '@/views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/Calculator',
      name: 'CalculatorView',
      component: CalculatorView,
    },
    {
      path: '/Contact',
      name: 'ContactView',
      component: ContactView,
    },
  ],
})

export default router
