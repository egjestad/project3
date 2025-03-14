import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    username: '',
    userId: '',
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
    },
    async logout() {
      this.username = ''
      this.userId = ''
      this.loginStatus = false
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
      if (userData) {
        const { username, userId } = JSON.parse(userData)
        this.loginStatus = true
        this.username = username
        this.userId = userId
        await this.loadCalculationsFromStorage()
      }
    },

    async loadCalculationsFromStorage() {
      const calculationsData = localStorage.getItem('calculations')
      if (calculationsData) {
        this.calculations = JSON.parse(calculationsData)
      }
    },
  },
})
