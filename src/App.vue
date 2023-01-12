<script setup lang="ts">
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const jumpTo = () => {
  router.push('/shan')
}
</script>

<template>
  <div class="body">
    <Header />
    <el-button @click="jumpTo">跳转</el-button>
    <RouterView />
  </div>
</template>

<style scoped>
.body {
  width: 100vw;
  height: 100vh;
  background: #555555;
}
</style>
