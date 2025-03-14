import router from '@/router'
import { useLoginUserStore } from '@/store/loginUserStore'
import api from './api'

export function loginStatus() {
  const userStore = useLoginUserStore()
  if (!userStore.loginStatus) {
    return 'Not logged in'
  } else {
    return 'Logged in as ' + userStore.loggedInUsername
  }
}

export async function handleLoginClick(username: string, password: string) {
  const userStore = useLoginUserStore()

  if (userStore.loginStatus) {
    alert('You are already logged in')
    return
  }

  if (username.length > 1 && password.length > 7) {
    const userData = await loginUser(username, password)
    if (userData) {
      userStore.login(userData.username, userData.userId)
      router.push('/Home')
    } else {
      alert('Invalid username or password')
    }
  } else {
    alert(
      'Username must be at least 2 characters long and password must be at least 8 characters long',
    )
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await api.post('/login', { username, password })
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.error(error)
  }
}
