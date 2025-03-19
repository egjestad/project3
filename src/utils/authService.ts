import axios from 'axios'
import type { User } from '@/models/interfaces'
import { ref } from 'vue'

export const loggedIn = ref(false)

if (sessionStorage.getItem('jwt_token')) {
  loggedIn.value = true
}

//function to check if user is logged in and that token is valid
export function isLoggedIn() {
  if (sessionStorage.getItem('jwt_token')) {
    loggedIn.value = true
  }
  return loggedIn.value
}

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

//add autorization header to all requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(' config:', config)
    return config
  },
  (error) => Promise.reject(error),
)

export async function getJwtToken(username: string, password: string): Promise<string | null> {
  const response = await apiClient.post('/login', {
    username: username,
    password: password,
  })

  if (response.status === 200) {
    return response.data.token
  } else if (response.status === 401) {
    console.log('Invalid username or password')
    throw new Error('Invalid username or password')
  }

  console.log('Failed to login user')
  return null
}

export async function registerUser(username: string, password: string): Promise<string | null> {
  console.log('registerUser: ', username)
  const response = await apiClient.post('/register', {
    username: username,
    password: password,
  })

  if (response.status === 200) {
    return response.data.token
  } else if (response.status === 409) {
    console.log('Username already exists')
    throw new Error('Username already exists')
  }

  console.log('Failed to register user')
  return null
}

export async function userDetails(username: string, token: string): Promise<User | null> {
  try {
    const response = await axios.get(`http://localhost:8080/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
  return null
}
