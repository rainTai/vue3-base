<script setup lang="ts">
import Header from './components/Header.vue'
import { useDate } from '@/hooks/useDate'
import { useGong } from '@/hooks/useGong'

useDate()
useGong()
</script>

<template>
  <div class="body">
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.body {
  width: 100vw;
  height: 100vh;
  background: #999;
  font-family: STKaiti;
  padding-top: 0px;
  .header {
    position: fixed;
  }
  .content {
    padding-top: 60px;
    height: calc(100vh - 60px);
    width: 100%;
    overflow: auto;
  }
}
</style>
