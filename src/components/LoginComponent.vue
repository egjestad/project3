<template>
  <div id="username">
    <label for="usernameInput" id="usernameLabel">Username</label>
    <textarea id="usernameInput" v-model="username"></textarea>
  </div>
  <div id="password">
    <label for="passwordInput" id="passwordLabel">Password</label>
    <textarea id="passwordInput" v-model="password"></textarea>
  </div>
  <div id="loginstatus">
    <button id="loginButton" @click="handleLoginClick(username, password)">Login</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { handleLoginClick } from '@/scripts/LoginScript'

const username = ref('')
const password = ref('')
</script>
