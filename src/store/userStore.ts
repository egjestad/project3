import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
    },
  }),
  actions: {
    setName(name: string) {
      this.user.name = name
    },
    setEmail(email: string) {
      this.user.email = email
    },
  },
})
