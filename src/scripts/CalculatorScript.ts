import { defineComponent, ref, provide, computed, watchEffect } from 'vue'
import LogComponent from '@/components/LogComponent.vue'
import { useLoginUserStore } from '@/store/loginUserStore'
import { apiClient } from '@/utils/authService'
import { useCalculationStore } from '@/store/calculationStore'

export default defineComponent({
  name: 'CalculatorView',
  components: { LogComponent },
  setup() {
    const userStore = useLoginUserStore()
    const displayValue = ref<string>('')
    const calculated = ref<boolean>(false)
    const calculationStore = useCalculationStore()
    const log = computed(() => calculationStore.getCalculations())

    provide('log', log)

    // Hent utregninger når brukeren logger inn
    watchEffect(() => {
      if (userStore.loginStatus) {
        calculationStore.fetchCalculationsFromBackend()
      }
    })

    const handleClick = (value: string): void => {
      if (value === '=') {
        calculated.value = true
        calculate()
      } else {
        displayValue.value += value
      }
    }

    const handleNumberClick = (value: string): void => {
      if (calculated.value) {
        handleClear()
        calculated.value = false
      }
      displayValue.value += value
    }

    const handleOperatorClick = (operator: string): void => {
      if (displayValue.value === '' || displayValue.value === '-') {
        if (operator === '-') {
          displayValue.value += operator
        }
        return
      }
      if (/[/+*-]$/.test(displayValue.value)) {
        displayValue.value = displayValue.value.slice(0, -1)
      }
      calculated.value = false
      displayValue.value += operator
    }

    const handleClear = (): void => {
      displayValue.value = ''
      calculated.value = false
    }

    const calculate = async (): Promise<void> => {
      try {
        const response = await apiClient.post('/calc', {
          expression: displayValue.value,
        })

        if (response.status === 200) {
          let result = await response.data.result

          if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid input')
          }

          if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(9).replace(/\.?0+$/, ''))
          }

          //userStore.saveCalculation(displayValue.value, result)
          const expression = displayValue.value
          calculationStore.addCalculation({ expression, result })

          displayValue.value = String(result)
          calculated.value = true
        } else if (response.status === 401) {
          throw new Error('Unauthorized')
        } else if (response.status === 400) {
          throw new Error('Invalid input')
        } else if (response.status === 403) {
          throw new Error('Forbidden')
        } else {
          const error = await response.data.error
          throw new Error(error.message)
        }
      } catch (error) {
        if (error instanceof Error) {
          displayValue.value = error.message
        } else {
          displayValue.value = 'Error'
        }
      }
    }

    return {
      displayValue,
      calculated,
      log,
      handleClick,
      handleNumberClick,
      handleOperatorClick,
      handleClear,
      calculate,
    }
  },
})
