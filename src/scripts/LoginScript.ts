import router from '@/router'
import { useLoginUserStore } from '@/store/loginUserStore'
import { useCalculationStore } from '@/store/calculationStore'

export function loginStatus() {
  const userStore = useLoginUserStore()
  if (!userStore.loginStatus) {
    return 'Not logged in'
  } else {
    return 'Logged in as ' + userStore.username
  }
}

export async function handleLoginClick(username: string, password: string) {
  const userStore = useLoginUserStore()

  if (userStore.loginStatus) {
    alert('You are already logged in')
    return
  }

  if (username.length > 1 && password.length > 7) {
    userStore.getTokenAndSaveInStore(username, password).then(() => {
      if (userStore.jwtToken) {
        alert('Login successful')
        sessionStorage.setItem('jwt_token', userStore.jwtToken)
        sessionStorage.setItem('username', userStore.username)

        // Fetch recent calculations for the user
        const calculationStore = useCalculationStore()
        calculationStore.fetchCalculationsFromBackend()

        router.push('/Home')
      } else {
        alert('Error logging in')
      }
    })
  } else {
    alert(
      'Username must be at least 2 characters long and password must be at least 8 characters long',
    )
  }
}

/*
    const userData = await loginUser(username, password)
    alert('userData: ' + userData)

    if (userData.token) {
      localStorage.setItem('jwt_token', userData.token)

      userStore.login(userData.username, userData.userId)
      alert('login successful')

      // Fetch recent calculations for the user
      const userCalculations = await fetchRecentCalculations()
      if (userCalculations) {
        userCalculations.forEach((calculation: { expression: string; result: number }) => {
          userStore.saveCalculation(calculation.expression, calculation.result)
        })
      }

      router.push('/Home')
    } else {
      alert(userData.error || 'Error logging in')
    }
  } else {
    alert(
      'Username must be at least 2 characters long and password must be at least 8 characters long',
    )
  }
}
  */

export async function fetchRecentCalculations() {
  const userStore = useLoginUserStore()
  const userId = userStore.userId
  const jwtToken = localStorage.getItem('jwt_token')

  if (!userId || !jwtToken) {
    alert('You must be logged in to view recent calculations')
    return
  }

  try {
    const response = await fetch(`http://localhost:8080/${userId}/recent`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })

    if (!response.ok) throw new Error('Failed to fetch calculations')

    return await response.json()
  } catch (error) {
    console.error('Error fetching recent calculations:', error)
  }
}
