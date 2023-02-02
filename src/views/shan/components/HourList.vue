<template>
  <div class="list">
    <div
      :class="`item ${baseData.activeIndex === index ? 'item-active' : ''}`"
      v-for="(item, index) in baseStore.hourList"
      :key="index"
      @click.stop="setHourLocal(item, index)"
    >
      <div><span class="ganzhi-hour"></span> {{ item.format('cH') }} {{ item.format('HH') }}时</div>
      <div
        :class="`${baseStore.currentTime.wuTuTaiYangShi === item.format('cH')[1] ? 'good' : ''}`"
      >
        {{ baseStore.currentTime.wuTuTaiYangShi === item.format('cH')[1] ? '乌兔时' : '' }}
      </div>
      <div :class="`${baseStore.currentTime.wuBuYuShi === item.format('cH')[1] ? 'bad' : ''}`">
        {{ baseStore.currentTime.wuBuYuShi === item.format('cH')[1] ? '五不遇时' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, watchEffect, reactive } from 'vue'
import { useBaseStore } from '@/store'
import { useDate } from '@/hooks/useDate'

const baseStore = useBaseStore()
const { setData } = useDate()

const baseData = reactive({
  activeIndex: 0,
})

const setHourLocal = (item, index) => {
  baseData.activeIndex = index
  const hour = item.format('HH')
  baseStore.hour = hour
  setData(baseStore.year, baseStore.month, baseStore.date, baseStore.hour)
}

onBeforeMount(() => {})
watchEffect(() => {
  baseData.activeIndex = Number(baseStore.hour)
})
</script>
<style scoped lang="scss">
.list {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  .item {
    padding: 10px;
    border: 1px dashed #555555;
    cursor: pointer;
  }
  .item-active {
    border: 1px solid #555;
    box-shadow: inset 0px 0px 10px #555;
  }
}
</style>
