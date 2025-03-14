import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    username: '',
    userId: '',
    loginStatus: false,
  }),
  getters: {
    loggedInUsername: (state) => state.username,
    loggedInUserId: (state) => state.userId,
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

    async isLoggedIn() {
      return this.username !== ''
    },

    async getUserId() {
      return this.userId
    },

    async getUsername() {
      return this.username
    },

    async loadUserFromStorage() {
      const userData = localStorage.getItem('user')
      if (userData) {
        const { username, userId } = JSON.parse(userData)
        this.loginStatus = true
        this.username = username
        this.userId = userId
      }
    },
  },
})
