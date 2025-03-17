<template>
  <div id="logContainer">
    <div id="logTitle">
      <label>Log</label>
    </div>
    <div class="calculationLog">
      <div class="calculation" v-for="(calc, index) in calculations" :key="index">
        {{ calc.expression }} = {{ calc.result }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCalculationStore } from '@/store/calculationStore'
import { computed, onMounted } from 'vue'

const calculationStores = useCalculationStore()

const calculations = computed(() => calculationStores.calculations)

onMounted(() => {
  calculationStores.getCalculations()
})
</script>
