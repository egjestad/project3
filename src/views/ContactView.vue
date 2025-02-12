<template>
  <header>
    <div class="wrapper">Contact Form</div>
  </header>
  <form class="content" id="formContainer" @submit.prevent="handleSubmit()">
    <div class="form" id="name">
      <label for="name" id="nameLabel" required>Name:</label>
      <input type="nameinput" id="name" v-model="contact.name" />
    </div>
    <div class="form" id="email">
      <label for="email" id="emailLabel">Email:</label>
      <input type="emailInput" id="email" v-model="contact.email" />
    </div>
    <div class="form" id="message">
      <label for="message" id="messageLabel">Message:</label>
      <textarea id="messageInput" type="text" v-model="contact.message" />
    </div>
    <div class="form" id="submit">
      <button type="submit" id="submit" :disabled="!isFormValid" @click="handleSubmit()">
        Submit
      </button>
    </div>
    <div class="form" v-if="statusMessage">{{ statusMessage }}</div>
  </form>
</template>

<style src="@/assets/ContactStyle.css"></style>
<script lang="ts" src="@/scripts/ContactFormScript.ts"></script>
