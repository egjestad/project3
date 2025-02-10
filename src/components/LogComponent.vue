<template>
  <div id="logContainer">
    <div id="logTitle">
      <label>Log</label>
    </div>
    <div class="calculationLog">
      <div class="calculation" v-for="(entry, index) in log" :key="index">
        {{ entry }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="@/scripts/LogScript.ts"></script>
