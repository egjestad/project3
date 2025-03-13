import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    username: '',
    userId: '',
  }),
  getters: {
    loggedInUsername: (state) => state.username,
    loggedInUserId: (state) => state.userId,
  },
  actions: {
    async login(username: string, userId: string) {
      this.username = username
      this.userId = userId
    },
    async logout() {
      this.username = ''
      this.userId = ''
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
      const username = localStorage.getItem('username')
      const userId = localStorage.getItem('userId')
      if (username && userId) {
        this.username = username
        this.userId = userId
      }
    },
  },
})
