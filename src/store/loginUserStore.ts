import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', {
  state: () => ({
    loggedInUser: null as string | null,
  }),
  actions: {
    async login(username: string) {
      try {
        this.loggedInUser = username
      } catch (error) {
        console.error(error)
      }
    },
  },
})
