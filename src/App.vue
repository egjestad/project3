<script setup lang="ts">
import { useLoginUserStore } from '@/store/loginUserStore'
import { handleLogoutClick } from './scripts/LoginScript'

const loginUserStores = useLoginUserStore()
loginUserStores.loadUserFromSession()
loginUserStores.startSessionExpirationCheck()
</script>

<template>
  <div id="loginBar">
    <div id="loginStatus">
      <a v-if="loginUserStores.loginStatus" href="#"
        >Logged in as: {{ loginUserStores.username }}</a
      >
      <a v-else href="#">Not logged in</a>
    </div>
    <div id="loginStatus">
      <router-link
        id="logoutBtn"
        v-if="loginUserStores.loginStatus"
        @click="handleLogoutClick"
        to="/"
        >Logout</router-link
      >
      <router-link id="logoutBtn" v-else to="/">Login</router-link>
    </div>
  </div>
  <nav>
    <router-link to="/Home">Home</router-link>
    <router-link to="/calculator">Calculator</router-link>
    <router-link to="/contact">Contact</router-link>
  </nav>
  <router-view />
</template>

<style>
#loginStatus {
  display: flex;
  justify-content: right;
  padding: 0 10px;
}

#loginStatus a {
  border: 2px solid var(--color-border);
  background-color: var(--color-background-btn);
  color: var(--color-text);
  display: flex;
  justify-content: right;
  padding: 0 1rem;
  text-decoration: none;
  font-size: 12px;
}

#loginBar {
  grid-area: login;
  width: 100%;
  background-color: #d8e0d1;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0;
  padding-right: 10px;
  padding-top: 10px;
  margin-bottom: 0;
  font-size: 12px;
  text-align: center;
}
</style>
