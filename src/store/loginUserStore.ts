import { defineStore } from 'pinia'
import { getJwtToken } from '@/utils/authService'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    username: sessionStorage.getItem('username') || '',
    userId: sessionStorage.getItem('userId') || '',
    jwtToken: sessionStorage.getItem('jwt_token') || '',
    loginStatus: false,
  }),
  actions: {
    async getTokenAndSaveInStore(username: string, password: string) {
      try {
        await getJwtToken(username, password).then((token) => {
          if (token) {
            console.log('Token:', token)
            this.jwtToken = token
            this.username = username
            this.loginStatus = true
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('jwt_token', token)
          } else {
            console.error('Failed to get token')
          }
        })
      } catch (error) {
        console.error('Error getting token:', error)
      }
    },

    async logout() {
      this.username = ''
      this.loginStatus = false
      this.jwtToken = ''
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('jwt_token')
    },

    async loadUserFromSession() {
      const token = sessionStorage.getItem('jwt_token')
      if (token) {
        this.loginStatus = true
        this.jwtToken = token
        this.username = sessionStorage.getItem('username') || ''
      }
    },
  },
})
