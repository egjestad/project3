<template>
  <div id="logContainer">
    <div id="logTitle">
      <label>Log</label>
    </div>
    <div class="calculationLog">
      <div class="calculation" v-for="calc in log" :key="calc.expression">
        {{ calc.expression }} = {{ calc.result }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLoginUserStore } from '@/store/loginUserStore'

const loginUserStores = useLoginUserStore()

const log = computed(() => loginUserStores.calculations)
</script>
