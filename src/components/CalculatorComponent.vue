<template>
  <div id="calculator">
    <div id="calculatorContainer">
      <input id="input" type="text" v-model="displayValue" placeholder="0" readonly />

      <button class="option" id="clear" @click="handleClear()">C</button>
      <button class="number" id="1" @click="handleNumberClick('1')">1</button>
      <button class="number" id="2" @click="handleNumberClick('2')">2</button>
      <button class="number" id="3" @click="handleNumberClick('3')">3</button>
      <button class="option" id="plus" @click="handleOperatorClick('+')">+</button>
      <button class="number" id="4" @click="handleNumberClick('4')">4</button>
      <button class="number" id="5" @click="handleNumberClick('5')">5</button>
      <button class="number" id="6" @click="handleNumberClick('6')">6</button>
      <button class="option" id="minus" @click="handleOperatorClick('-')">-</button>
      <button class="number" id="7" @click="handleNumberClick('7')">7</button>
      <button class="number" id="8" @click="handleNumberClick('8')">8</button>
      <button class="number" id="9" @click="handleNumberClick('9')">9</button>
      <button class="option" id="times" @click="handleOperatorClick('*')">x</button>
      <button class="option" id="point" @click="handleClick('.')">.</button>
      <button class="number" id="0" @click="handleNumberClick('0')">0</button>
      <button class="option" id="equals" @click="handleClick('=')">=</button>
      <button class="option" id="divide" @click="handleOperatorClick('/')">/</button>
    </div>
  </div>
  <div id="log">
    <LogComponent :log="log" />
  </div>
</template>

<script lang="ts" src="@/scripts/CalculatorScript.ts"></script>
