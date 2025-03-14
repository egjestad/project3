<template>
  <div id="username">
    <label for="usernameInput" id="usernameLabel">Username</label>
    <input id="usernameInput" v-model="username" />
  </div>
  <div id="password">
    <label for="passwordInput" id="passwordLabel">Password</label>
    <input id="passwordInput" v-model="password" />
  </div>
  <div id="loginButtonDiv">
    <button id="loginButton" @click="handleLoginClick(username, password)">Login</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { handleLoginClick } from '@/scripts/LoginScript'

const username = ref('')
const password = ref('')
</script>

<style>
#loginButton {
  text-decoration: none;
  color: var(--color-text);
  transition: 0.4s;
  padding: 5px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-btn);
  font-size: 15px;
  margin: 10px;
  width: 100px;
}

#loginButtonDiv {
  display: flex;
  justify-content: center;
}

#loginButton:hover {
  background-color: var(--color-background-btn-hover);
}
#loginButton:active {
  background-color: var(--color-background-btn-active);
}
</style>
