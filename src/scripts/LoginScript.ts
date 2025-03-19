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
  const userStore = useLoginUserStore()
  let token = null

  if (isLoggedIn()) return

  if (!validateUsernameAndPassword(username.value, password.value)) return

  try {
    token = await getJwtToken(username.value, password.value)
  } catch (error) {
    alert(error)
    console.error('Error logging in:', error)
    loginMessage.value = 'Login failed!'
    return
  }

  if (token) {
    userStore.saveUserToStore(username.value, token)
    loginMessage.value = 'You are logged in'
    username.value = ''
    password.value = ''
    //alert('Login successful')

    // Fetch recent calculations for the user
    fetchCalculations()

    router.push('/Home')
  } else {
    alert('Error logging in')
    loginMessage.value = 'Login failed!'
  }
}

export async function handleRegisterClick() {
  const userStore = useLoginUserStore()
  let token = null

  if (!validateUsernameAndPassword(username.value, password.value)) return

  try {
    console.log('Registering user:', username.value)
    token = await registerUser(username.value, password.value)
  } catch (error) {
    alert(error)
    console.error('Error registering user:', error)
    return
  }

  if (token) {
    userStore.saveUserToStore(username.value, token)
    loginMessage.value = 'User registered and logged in'
    username.value = ''
    password.value = ''

    router.push('/Home')
  }
}

export async function handleLogoutClick() {
  loginMessage.value = ''
  const userStore = useLoginUserStore()
  const calculationStore = useCalculationStore()
  userStore.logout()
  calculationStore.clearCalculations()
}
