<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>sss Edit <code>components/HelloWorld.vue</code> to22222 test HMR</p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
    official Vue + Vite starter
  </p>
  <p>
    sss Install
    <a href="https://github.com/johnsoncodehk/vossslar" target="_blank">Volar</a>
    in your
  </p>
  ssss!! ssss 1234asdfs
  <p class="read-the-docs">Click on the Vite and Vue logos to lear12341n more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
