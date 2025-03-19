import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '@/views/CalculatorView.vue'
import HomeView from '@/views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/Home',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/Calculator',
      name: 'CalculatorView',
      component: CalculatorView,
      meta: { requiresAuth: true },
    },
    {
      path: '/Contact',
      name: 'ContactView',
      component: ContactView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('jwt_token')

  if (to.meta.requiresAuth && !token) {
    next('/')
  } else {
    next()
  }
})

export default router
