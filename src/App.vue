<script setup lang="ts"></script>

<template>
  <div class="menu">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/calculator">Calculator</router-link>
      </li>
    </ul>
  </div>
  <router-view />
</template>

<style></style>

<style scoped>
header {
  line-height: 1.5;
}

.menu {
  font-size: small;
}

.menu ul {
  list-style-type: none;
  padding: 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
