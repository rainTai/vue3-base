<template>
  <div class="list">
    <div
      class="item"
      v-for="(item, index) in baseStore.dayList.filter(filterData)"
      :key="index"
      @click="setDateLocal(item)"
    >
      <div class="day">
        <span class="ganzhi-day">{{ item.format('cD') }} </span>{{ item.format('DD') }}日
      </div>
      <div class="lunar-day">
        {{ item.format('lM(lL)lD') }} <span class="jieqi">({{ item.jieqi.split(',')[0] }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, watchEffect } from 'vue'
import { useBaseStore } from '@/store/index'
import { useDate } from '@/hooks/useDate'

const baseStore = useBaseStore()
const { setData } = useDate()

const filterData = item => {
  const dayGanZhi = item.format('cD')
  const dayGan = dayGanZhi[0]
  const dayZhi = dayGanZhi[1]
  if (baseStore.filterGan.includes(dayGan) || baseStore.filterZhi.includes(dayZhi)) {
    return null
  } else {
    return item
  }
}

const setDateLocal = item => {
  const date = item.format('DD')
  baseStore.date = date
  setData(baseStore.year, baseStore.month, baseStore.date)
}

onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: auto;
  gap: 10px;
  padding: 15px;
  align-content: space-around;
  justify-content: space-around;
}
.item {
  border: 1px dashed #666666;
  padding: 6px 10px;
  cursor: pointer;
  .day {
    font-weight: bold;
    color: #333;
    .ganzhi-day {
      font-size: 20px;
      margin-right: 6px;
    }
  }
  .lunar-day {
    font-size: 14px;
  }

  .jieqi {
  }
}
</style>
