import axios from 'axios'
import type { User } from '@/models/interfaces'
import { ref } from 'vue'

export const loggedIn = ref(false)

if (sessionStorage.getItem('jwt_token')) {
  loggedIn.value = true
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
  try {
    const response = await axios.post('http://localhost:8080/login', {
      username: username,
      password: password,
    })

    if (response.status === 200) {
      return response.data.token
    }
  } catch (error) {
    console.error(error)
  }
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
