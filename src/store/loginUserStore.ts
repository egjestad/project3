import { defineStore } from 'pinia'
import { getJwtToken } from '@/utils/authService'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    username: '',
    userId: '',
    jwtToken: '',
    loginStatus: false,
    calculations: [] as Array<{ expression: string; result: number }>,
  }),
  getters: {
    loggedInUsername: (state) => state.username,
    loggedInUserId: (state) => state.userId,
    resentCalculations: (state) => state.calculations,
  },
  actions: {
    async login(username: string, userId: string) {
      this.username = username
      this.userId = userId
      this.loginStatus = true
      localStorage.setItem('user', JSON.stringify({ username, userId }))
      await this.fetchRecentCalculationsFromBackend()
    },

    async getTokenAndSaveInStore(username: string, password: string) {
      try {
        await getJwtToken(username, password).then((token) => {
          if (token) {
            console.log('Token:', token)
            this.jwtToken = token
            this.username = username
            this.loginStatus = true
            localStorage.setItem('jwt_token', token)
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
      this.userId = ''
      this.loginStatus = false
      localStorage.removeItem('user')
      localStorage.removeItem('calculations')
    },

    async getUserId() {
      return this.userId
    },

    async getUsername() {
      return this.username
    },

    async saveCalculation(expression: string, result: number) {
      const calculation = { expression, result }
      this.calculations.unshift(calculation)
      if (this.calculations.length > 10) {
        this.calculations.pop()
      }
      localStorage.setItem('calculations', JSON.stringify(this.calculations))
    },

    async loadUserFromStorage() {
      const userData = localStorage.getItem('user')
      const token = localStorage.getItem('jwt_token')

      if (userData && token) {
        const { username, userId } = JSON.parse(userData)
        this.loginStatus = true
        this.username = username
        this.userId = userId
        await this.fetchRecentCalculationsFromBackend()
      }

      const calculationsData = localStorage.getItem('calculations')
      if (calculationsData) {
        this.calculations = JSON.parse(calculationsData)
      }
    },

    async fetchRecentCalculationsFromBackend() {
      if (!this.userId) return
      try {
        const response = await fetch(`http://localhost:8080/${this.userId}/recent`)
        if (!response.ok) throw new Error('Failed to fetch calculations')
        const data = await response.json()
        this.calculations = data
        localStorage.setItem('calculations', JSON.stringify(this.calculations))
      } catch (error) {
        console.error('Error fetching recent calculations:', error)
      }
    },
  },
})
