import { defineStore } from 'pinia'
import type { Calculation } from '@/models/interfaces'
import { ref } from 'vue'
import { apiClient } from '@/utils/authService'

export const useCalculationStore = defineStore('calculation', () => {
  const calculations = ref<Calculation[]>([])

  function addCalculation(calculation: Calculation) {
    if (calculations.value.length >= 10) {
      calculations.value.shift()
    }
    calculations.value.push(calculation)
  }

  function getResult() {
    if (calculations.value.length === 0) {
      return 0
    }
    return calculations.value[calculations.value.length - 1].result
  }

  function getCalculations() {
    return calculations.value
  }

  function setCalculations(newCalculations: Calculation[]) {
    calculations.value = newCalculations
  }

  function clearCalculations() {
    calculations.value = []
  }

  function saveToSessionStorage() {
    sessionStorage.setItem('calculations', JSON.stringify(calculations.value))
  }

  function loadFromSessionStorage() {
    const calculationsData = sessionStorage.getItem('calculations')
    if (calculationsData) {
      calculations.value = JSON.parse(calculationsData)
    }
  }

  async function fetchCalculationsFromBackend() {
    clearCalculations()
    try {
      const response = await apiClient.get('/recent')
      if (response.status === 200) {
        response.data.forEach((calculation: Calculation) => {
          addCalculation(calculation)
        })
      }
      saveToSessionStorage()
    } catch (error) {
      console.error('Error fetching recent calculations:', error)
    }
  }
  return {
    calculations,
    addCalculation,
    getResult,
    getCalculations,
    setCalculations,
    clearCalculations,
    saveToSessionStorage,
    loadFromSessionStorage,
    fetchCalculationsFromBackend,
  }
})
