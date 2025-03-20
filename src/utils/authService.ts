import axios from 'axios'
import type { User } from '@/models/interfaces'
import { ref } from 'vue'
import { handleLogoutClick } from '@/scripts/LoginScript'
import { useLoginUserStore } from '@/store/loginUserStore'

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
  withCredentials: true,
})

//add autorization header to all requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('jwt_token')
    console.log('token:', token)

    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`
      console.log('config:', config)
    } else {
      console.log('No valid token found. Request may be rejected.')
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Handle expired tokens and refresh automatically
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized: Checking for refresh token...')

      try {
        const refreshResponse = await apiClient.post(
          '/refresh',
          {},
          {
            withCredentials: true,
          },
        )

        if (refreshResponse.status === 200) {
          const newToken = refreshResponse.data.accessToken
          sessionStorage.setItem('jwt_token', newToken)
          error.config.headers.Authorization = `Bearer ${newToken}`
          return axios(error.config)
        }
      } catch (refreshError) {
        console.log('Failed to refresh token. Logging out...')
        handleLogoutClick()
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

/*

      const errorMessage = error.response.data

      if (errorMessage === 'Password incorrect' || errorMessage === 'User not found') {
        return Promise.reject(error)
      }

      if (errorMessage === 'Token expired or invalid') {
        console.log('Token expired. Attempting to refresh...')
        const refreshToken = sessionStorage.getItem('refresh_token')

        if (!refreshToken) {
          console.log('No refresh token found. Logging out...')
          handleLogoutClick()
          return Promise.reject(error)
        }

        try {
          const response = await apiClient.post(
            '/refresh',
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )

          if (response.status === 200) {
            const newToken = response.data.accessToken
            sessionStorage.setItem('jwt_token', newToken)
            error.config.headers.Authorization = `Bearer ${newToken}`
            return axios(error.config)
          }
        } catch (refreshError) {
          console.log('Failed to refresh token. Logging out...')
          handleLogoutClick()
          return Promise.reject(refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)
  */

export async function getJwtToken(username: string, password: string): Promise<boolean> {
  const response = await apiClient.post(
    '/login',
    {
      username: username,
      password: password,
    },
    { withCredentials: true },
  )
  console.log('getJwtToken: ', response)

  const loginUserStore = useLoginUserStore()
  if (response.status === 200) {
    const token = response.data.accessToken
    sessionStorage.setItem('jwt_token', token)
    loginUserStore.saveUserToStore(username, response.data.accessToken)
    console.log('User logged in: ', username + ' ' + token)
    return true
  } else if (response.status === 401) {
    console.log('Invalid username or password')
    return false
  }

  console.log('Failed to login user')
  return false
}

export async function registerUser(username: string, password: string): Promise<boolean> {
  console.log('registerUser: ', username)
  const response = await apiClient.post(
    '/register',
    {
      username: username,
      password: password,
    },
    { withCredentials: true },
  )

  if (response.status === 200) {
    sessionStorage.setItem('jwt_token', response.data.accessToken)
    useLoginUserStore().saveUserToStore(username, response.data)
    return true
  } else if (response.status === 409) {
    console.log('Username already exists')
    return false
  }

  console.log('Failed to register user')
  return false
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
