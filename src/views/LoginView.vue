<script setup lang="ts">
import LoginComponent from '@/components/LoginComponent.vue'
</script>

<template>
  <header>
    <div class="wrapper">Login</div>
  </header>
  <div class="content" id="loginContainer">
    <LoginComponent />
  </div>
</template>

<style>
#loginContainer {
  display: grid;
  justify-content: center;
  margin: 40px;
}
#username,
#password {
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 20px;
  margin: 10px;
}
#usernameLabel,
#passwordLabel {
  width: 100px;
}

#usernameInput:focus,
#passwordInput:focus {
  border: 2px solid #3f4c34;
  outline: none;
}

#usernameInput,
#passwordInput {
  height: 30px;
  font-size: 15px;
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;
  border: 2px solid var(--color-border);
  color: var(--color-text);
  width: 100%;
  resize: none;
}
#loginstatusLabel {
  color: rgb(189, 0, 0);
}
</style>
