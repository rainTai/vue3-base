<template>
  <div class="list">
    <div
      :class="`item ${baseData.activeIndex === index ? 'item-active' : ''}`"
      v-for="(item, index) in baseStore.hourList"
      :key="index"
      @click.stop="setHourLocal(item, index)"
    >
      <div><span class="ganzhi-hour"></span> {{ item.format('cH') }} {{ item.format('HH') }}时</div>
      <div :class="`${validData('wuTuTaiYangShi', item) ? 'good' : ''}`">
        {{ validData('wuTuTaiYangShi', item) ? '乌兔时' : '' }}
      </div>
      <div :class="`${validData('wuBuYuShi', item) ? 'bad' : ''}`">
        {{ validData('wuBuYuShi', item) ? '五不遇时' : '' }}
      </div>
      <div :class="`${validData('luoWenJiaoGui', item) ? 'good' : ''}`">
        {{ validData('luoWenJiaoGui', item) ? '罗纹交贵' : '' }}
      </div>
      <div :class="`${validData('guiRenDengTianMen', item) ? 'good' : ''}`">
        {{ validData('guiRenDengTianMen', item) ? '贵人登天门' : '' }}
      </div>
      <div :class="`${validData('jieLuKongWang', item) ? 'bad' : ''}`">
        {{ validData('jieLuKongWang', item) ? '截路空亡' : '' }}
      </div>
      <div :class="`${validData('sanShaShi', item) ? 'bad' : ''}`">
        {{ validData('sanShaShi', item) ? '坐山三煞时' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, watchEffect, reactive } from 'vue'
import { useBaseStore } from '@/store'
import { useDate } from '@/hooks/useDate'
import { useMing } from '@/hooks/useMing'

const baseStore = useBaseStore()
const { initMingList } = useMing()
const { setData } = useDate()

const baseData = reactive({
  activeIndex: 0,
})

const validData = (property, item) => {
  return baseStore.currentTime[property].includes(item.format('cH')[1])
}

const setHourLocal = (item, index) => {
  baseData.activeIndex = index
  const hour = item.format('HH')
  baseStore.hour = hour
  initMingList()
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
