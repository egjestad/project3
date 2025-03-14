<script setup lang="ts">
import { useLoginUserStore } from '@/store/loginUserStore'

const loginUserStores = useLoginUserStore()
</script>

<template>
  <nav>
    <div id="loginStatus">
      <p v-if="loginUserStores.loginStatus">Logged in as {{ loginUserStores.username }}</p>
      <p v-else>Not logged in</p>
    </div>
    <router-link to="/Home">Home</router-link>
    <router-link to="/calculator">Calculator</router-link>
    <router-link to="/contact">Contact</router-link>
    <router-link v-if="!loginUserStores.loginStatus" to="/">Login</router-link>
    <a v-if="loginUserStores.loginStatus" @click.prevent="loginUserStores.logout" href="#"
      >Logout</a
    >
  </nav>
  <router-view />
</template>

<style>
#loginStatus {
  display: flex;
  justify-content: right;
  margin: 0 20px 0 0;
}
</style>
