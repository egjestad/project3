import { computed, defineComponent, ref, watch } from 'vue'
import { useUserStore } from '@/store/userStore'
import axios from 'axios'

export default defineComponent({
  name: 'ContactForm',
  setup() {
    const store = useUserStore()

    const contact = ref({
      name: store.name,
      email: store.email,
      message: '',
    })

    watch(
      () => contact.value.name,
      (newName) => {
        store.updateName(newName)
      },
    )

    watch(
      () => contact.value.email,
      (newEmail) => {
        store.updateEmail(newEmail)
      },
    )

    const statusMessage = ref('')

    const isFormValid = computed(() => {
      return ValidateNameInput() && ValidateEmailInput() && ValidateMessageInput()
    })

    const ValidateNameInput = () => {
      const nameRegex = /^[a-zA-Z\s]+$/
      return contact.value.name.trim().length > 0 && nameRegex.test(contact.value.name)
    }

    const ValidateEmailInput = () => {
      const emailRegex = /^[a-zA-Z0-9._-]+[@][a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
      return emailRegex.test(contact.value.email)
    }
    const ValidateMessageInput = () => {
      return contact.value.message.trim().length > 0
    }

    const handleSubmit = async () => {
      if (!isFormValid.value) {
        alert('Invalid form input!')
        return
      }
      
      try {
        // Mock backend API call
        const response = await axios.post('http://localhost:5001/messages', {
          name: contact.value.name,
          email: contact.value.email,
          message: contact.value.message,
        })

        if (response.status === 201) {
          statusMessage.value = 'Success: Form submitted successfully!'
        } else {
          statusMessage.value = 'Error: Something went wrong!'
        }

        setTimeout(() => {
          statusMessage.value = ''
        }, 2500)

        contact.value = { name: '', email: '', message: '' }
        store.resetContact()
      } catch (error) {
        statusMessage.value = 'Error: Could not reach the backend!'
        console.error(error)
      }
    }

    return { contact, handleSubmit, isFormValid, statusMessage }
  },
})
