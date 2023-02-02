<template>
  <div class="page">
    <div class="main">
      <div class="top">
        <div class="left">
          <TimeComp />
        </div>
        <div class="right">
          <SelectComp />
        </div>
      </div>
      <HourComp />
      <DayListComp />
    </div>
    <div class="side">
      <GongComp />
      <MingListComp />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue'
import TimeComp from '@/components/Time.vue'
import HourComp from './components/HourList.vue'
import DayListComp from './components/DayList.vue'
import SelectComp from './components/Select.vue'
import GongComp from './components/Gong.vue'
import MingListComp from './components/MingList.vue'

const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
})
</script>
<style scoped lang="scss">
.page {
  display: flex;
  .main {
    flex: 1;
    .top {
      display: flex;
      .left {
        width: 260px;
      }
      .right {
        flex: 1;
      }
    }
  }
  .side {
    width: 350px;
  }
}
</style>
