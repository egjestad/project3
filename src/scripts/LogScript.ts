import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorLog',
  setup() {
    // Inject the provided "log". If not provided, default to an empty reactive array.
    const log = inject('log', ref<string[]>([]))
    return { log }
  },
})
