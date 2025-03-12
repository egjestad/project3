import LoginComponent from '@/components/LoginComponent.vue'
import router from '@/router'
import { useLoginUserStore } from '@/store/loginUserStore'
import { ref } from 'vue'

export default {
  name: 'LoginScript',
  component: { LoginComponent },
  setup() {
    const username = ref('')
    const password = ref('')

    const userStore = useLoginUserStore()

    function handleLoginClick() {
      if (username.value.length > 1 && password.value.length > 7) {
        userStore.login(username.value)
        router.push('/Home')
      } else {
        alert('Invalid username or password')
      }
    }
    return { username, password, handleLoginClick, LoginComponent }
  },
}
