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

<style scoped>
#logTitle {
  font-size: x-large;
  font-weight: bold;
  font-family: Copperplate, times, serif;
  color: #313a28;
  margin: 3% 10%;
}

#logContainer {
  display: flex;
  height: 100%;
  max-height: inherit;
  margin: 0;
  flex-direction: column;
  overflow-y: auto;
  background-color: rgb(130, 155, 109);
  border: 2px solid rgba(88, 109, 60, 0.56);
}

.calculation {
  color: #313a28;
  font-family: Copperplate, times, serif;
  display: flex;
  justify-content: left;
  margin: 0 10%;
}
</style>
