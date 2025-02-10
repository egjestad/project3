<template>
  <header>
    <div class="wrapper">Contact Form</div>
  </header>
  <div class="content" id="formContainer">
    <div class="form" id="name">
      <label for="name" id="nameLabel">Name:</label>
      <input type="nameinput" id="name" name="name" />
    </div>
    <div class="form" id="email">
      <label for="email" id="emailLabel">Email:</label>
      <input type="emailInput" id="email" name="email" />
      </div>
    <div class="form" id="message">
      <label for="message" id="messageLabel">Message:</label>
      <input id="messageInput" name="message" type="text" />
      </div>
    <div class="form" id="submit">
      <button type="submit" id="submit">Submit</button>
    </div>

  </div>






</template>

<style src="@/assets/ContactStyle.css"></style>
