import { defineStore } from 'pinia'
import type { Calculation } from '@/models/interfaces'
import { ref } from 'vue'
import { apiClient } from '@/utils/authService'

export const useCalculationStore = defineStore('calculation', () => {
  const calculations = ref<Calculation[]>([])

  function addCalculation(calculation: Calculation) {
    calculations.value.unshift(calculation)
    if (calculations.value.length >= 10) {
      calculations.value.pop()
    }
    saveToSessionStorage()
  }

  function getResult() {
    return calculations.value.length === 0 ? 0 : calculations.value[0].result
  }

  function getCalculations() {
    return calculations.value
  }

  function setCalculations(newCalculations: Calculation[]) {
    calculations.value = newCalculations
    saveToSessionStorage()
  }

  function clearCalculations() {
    calculations.value = []
    sessionStorage.removeItem('calculations')
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
        setCalculations(response.data)
      }
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
