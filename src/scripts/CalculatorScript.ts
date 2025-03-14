import { defineComponent, ref, provide, computed, watchEffect } from 'vue'
import LogComponent from '@/components/LogComponent.vue'
import { useLoginUserStore } from '@/store/loginUserStore'

export default defineComponent({
  name: 'CalculatorView',
  components: { LogComponent },
  setup() {
    const userStore = useLoginUserStore()
    const displayValue = ref<string>('')
    const calculated = ref<boolean>(false)
    const log = computed(() => userStore.calculations)

    provide('log', log)

    // Hent utregninger når brukeren logger inn
    watchEffect(() => {
      if (userStore.loginStatus) {
        userStore.fetchRecentCalculationsFromBackend()
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
        const response = await fetch('http://localhost:8080/calc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            expression: displayValue.value,
            userId: userStore.userId,
          }),
        })
        if (response.ok) {
          const answer = await response.json()
          let result = answer.result

          if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid input')
          }

          if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(9).replace(/\.?0+$/, ''))
          }

          userStore.saveCalculation(displayValue.value, result)
          
          displayValue.value = String(result)
          calculated.value = true
        } else {
          const error = await response.json()
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
