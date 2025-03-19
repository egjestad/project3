<template>
  <div id="username">
    <label for="usernameInput" id="usernameLabel">Username</label>
    <input id="usernameInput" v-model="username" />
  </div>
  <div id="password">
    <label for="passwordInput" id="passwordLabel">Password</label>
    <input id="passwordInput" v-model="password" type="password" />
  </div>
  <div id="loginButtonDiv">
    <button id="loginButton" @click="handleLoginClick()">Login</button>
    <button id="loginButton" @click="handleRegisterClick()">Register</button>
  </div>
  <p id="loginMessage">{{ loginMessageDisplay }}</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { handleLoginClick } from '@/scripts/LoginScript'
import { handleRegisterClick } from '@/scripts/LoginScript'
import { loginMessage, username, password } from '@/scripts/LoginScript'

const loginMessageDisplay = computed(() => loginMessage.value)
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
