import router from '@/router'
import { useLoginUserStore } from '@/store/loginUserStore'
import { useCalculationStore } from '@/store/calculationStore'
import { getJwtToken, registerUser } from '@/utils/authService'
import { ref } from 'vue'

export const loginMessage = ref('')
export const username = ref('')
export const password = ref('')

function isLoggedIn() {
  const userStore = useLoginUserStore()
  if (userStore.loginStatus) {
    alert('you are logged in')
    return true
  } else {
    return false
  }
}

function fetchCalculations() {
  // Fetch recent calculations for the user
  console.log('Authorization Header:', sessionStorage.getItem('jwt_token')?.toString())

  const calculationStore = useCalculationStore()
  calculationStore.fetchCalculationsFromBackend()
}

function validateUsernameAndPassword(username: string, password: string) {
  if (username.length > 1 && password.length > 7) {
    return true
  } else {
    loginMessage.value =
      'Username must be at least 2 characters and password must be at least 8 characters'
    return false
  }
}

export async function handleLoginClick() {
  if (isLoggedIn()) return

  if (!validateUsernameAndPassword(username.value, password.value)) return

  const succes = await getJwtToken(username.value, password.value)
  console.log('succes:', succes)
  if (!succes) {
    loginMessage.value = 'Login failed!'
    return
  }

  const token = sessionStorage.getItem('jwt_token')
  if (!token) {
    console.log('No token found. Logging out...')
    loginMessage.value = 'Error storing token'
    return
  }

  loginMessage.value = 'You are logged in'
  username.value = ''
  password.value = ''
  //alert('Login successful')

  // Fetch recent calculations for the user
  fetchCalculations()

  router.push('/Home')
}

export async function handleRegisterClick() {
  if (!validateUsernameAndPassword(username.value, password.value)) return

  if (!(await registerUser(username.value, password.value))) {
    loginMessage.value = 'Registration failed!'
    return
  }

  loginMessage.value = 'User registered and logged in'
  username.value = ''
  password.value = ''

  router.push('/Home')
}

export async function handleLogoutClick() {
  loginMessage.value = ''
  const userStore = useLoginUserStore()
  const calculationStore = useCalculationStore()
  userStore.logout()
  calculationStore.clearCalculations()
}
