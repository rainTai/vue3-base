<template>
  <div class="time">
    <div class="time-lunar">农历腊月十二</div>
    <div class="time-ganzhi">
      <div
        class="main-time-item"
        v-for="(_item, index) in baseData.GanZhiKeylist"
        :key="index"
      ></div>
    </div>
    <div class="time-now">2023年1月13日11时</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from 'vue'
const baseData = reactive({
  GanZhiKeylist: ['GanZhiYear', 'GanZhiMonth', 'GanZhiDay', 'GanZhiHour'],
})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss"></style>
