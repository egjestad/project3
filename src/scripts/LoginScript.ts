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
      const userCalculations = await fetchRecentCalculations()
      if (userCalculations) {
        userCalculations.forEach((calculation: { expression: string; result: number }) => {
          userStore.saveCalculation(calculation.expression, calculation.result)
        })
      }
      console.log('User logged in:', userData)
      console.log('User calculations:', userCalculations)
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

export async function fetchRecentCalculations() {
  const userStore = useLoginUserStore()
  const userId = userStore.loggedInUserId

  if (!userId) {
    alert('You must be logged in to view recent calculations')
    return
  }

  try {
    const response = await fetch(`http://localhost:8080/${userId}/recent`)

    if (!response.ok) throw new Error('Failed to fetch calculations')

    return await response.json()
  } catch (error) {
    console.error('Error fetching recent calculations:', error)
  }
}
