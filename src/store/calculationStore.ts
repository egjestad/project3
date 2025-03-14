import { defineStore } from 'pinia'

export const useCalculationStore = defineStore('calculation', {
  state: () => ({
    userId: '',
    calculation: '',
    result: '',
  }),
  actions: {
    updateCalculation(calculation: string) {
      this.calculation = calculation
    },
    updateResult(result: string) {
      this.result = result
    },
    updateUserId(userId: string) {
      this.userId = userId
    },
    resetCalculation() {
      this.calculation = ''
      this.result = ''
    },
  },
})
