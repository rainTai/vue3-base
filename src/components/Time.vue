<template>
  <div class="time">
    <div class="time-lunar">{{ baseStore.currentTime.format('lY年 lM(lL)lD lH時') }}</div>
    <div class="time-ganzhi">
      {{ baseStore.currentTime.format('cY cM cD cH') }}
    </div>
    <div class="time-now">{{ currentDate + ' ' + currentTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, watchEffect } from 'vue'
import { useBaseStore } from '@/store/index'

const baseStore = useBaseStore()

const currentDate = new Date().toLocaleDateString()
const currentTime = new Date().toLocaleTimeString()

onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.time {
  font-family: '微软雅黑';
  margin: 10px;
  .time-lunar {
    margin-bottom: 10px;
  }
  .time-ganzhi {
    font-size: 26px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .time-now {
  }
}
</style>
