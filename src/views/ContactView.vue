<template>
  <header>
    <div class="wrapper">Contact Form</div>
  </header>
  <form class="content" id="formContainer" @submit.prevent="submitForm">
    <div class="form" id="name">
      <label for="name" id="nameLabel" required>Name:</label>
      <input type="nameinput" id="name" v-model="name" />
    </div>
    <div class="form" id="email">
      <label for="email" id="emailLabel">Email:</label>
      <input type="emailInput" id="email" v-model="email" />
    </div>
    <div class="form" id="message">
      <label for="message" id="messageLabel">Message:</label>
      <textarea id="messageInput" type="text" v-model="message" />
    </div>
    <div class="form" id="submit">
      <button type="submit" id="submit" :disabled="!isFormValid" @click="handleSubmit()">
        Submit
      </button>
    </div>
  </form>
</template>

<style src="@/assets/ContactStyle.css"></style>
<script lang="ts" src="@/scripts/ContactFormScript.ts"></script>
