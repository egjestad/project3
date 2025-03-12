import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedInUser: null as string | null,
    name: '',
    email: '',
  }),
  actions: {
    updateName(name: string) {
      this.name = name
    },
    updateEmail(email: string) {
      this.email = email
    },
    resetContact() {
      this.name = ''
      this.email = ''
    },
  },
})
