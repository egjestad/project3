import { computed, ref } from 'vue'
import { useUserStore } from '@/store/userStore'

export default {
  setup() {
    const store = useUserStore()
    const name = ref('')
    const email = ref('')
    const message = ref('')

    const isFormValid = computed(() => {
      return ValidateNameInput() && ValidateEmailInput() && ValidateMessageInput()
    })

    function handleSubmit() {
      if (!isFormValid.value) {
        alert('Invalid form input!')
        return
      }

      store.setName(name.value)
      store.setEmail(email.value)
      alert('Form submitted!')
    } 

    function ValidateNameInput() {
      return name.value.trim().length > 0
    }

    function ValidateEmailInput() {
      const emailRegex = /^[a-zA-Z0-9._-]+[@][a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(email.value)
    }

    function ValidateMessageInput() {
      return message.value.trim().length > 0
    }

    return { name, email, message, handleSubmit, isFormValid }
  },
}
