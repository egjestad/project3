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
}
#usernameLabel,
#passwordLabel {
  width: 100px;
}
#loginstatusLabel {
  color: rgb(189, 0, 0);
}
</style>
