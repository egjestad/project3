import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    username: sessionStorage.getItem('username') || '',
    userId: sessionStorage.getItem('userId') || '',
    jwtToken: sessionStorage.getItem('jwt_token') || '',
    loginStatus: false,
  }),
  actions: {
    async saveUserToStore(username: string, token: string) {
      this.username = username
      this.jwtToken = token
      this.loginStatus = true
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('jwt_token', token)
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

    startSessionExpirationCheck() {
      setInterval(
        () => {
          const token = sessionStorage.getItem('jwt_token')
          if (!token) {
            this.logout()
          }
        },
        1000 * 5 * 60,
      )
    },
  },
})
