<template>
  <div class="list">
    <div
      :class="`item ${baseData.activeIndex === index ? 'item-active' : ''}`"
      v-for="(item, index) in baseStore.dayList.filter(filterData)"
      :key="index"
      @click.stop="setDateLocal(item, index)"
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
import { onBeforeMount, watchEffect, reactive } from 'vue'
import { useBaseStore } from '@/store/index'
import { useDate } from '@/hooks/useDate'
import { useGong } from '@/hooks/useGong'

const baseStore = useBaseStore()
const { setData } = useDate()
const { initGongList } = useGong()

const baseData = reactive({
  activeIndex: 0,
})

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

const setDateLocal = (item, index) => {
  baseData.activeIndex = index
  const date = item.format('DD')
  baseStore.date = date
  setData(baseStore.year, baseStore.month, baseStore.date)
  initGongList()
  baseStore.$patch(state => {
    state.hour = '0'
  })
}

onBeforeMount(() => {})
watchEffect(() => {
  baseData.activeIndex = Number(baseStore.date) - 1
})
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
.item-active {
  border: 1px solid #555;
  box-shadow: inset 0px 0px 10px #555;
}
</style>
