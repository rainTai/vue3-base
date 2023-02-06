<template>
  <div class="time">
    <div class="time-lunar">{{ baseStore.currentTime.format('lY年 lM(lL)lD lH時') }}</div>
    <div class="time-ganzhi">
      {{ baseStore.currentTime.format('cY cM cD cH') }}
    </div>
    <div class="time-dizhi">
      <span v-for="(item, index) in getHideDiZhi()" :key="index" class="cang-gan"> {{ item }}</span>
    </div>
    <div class="time-now">{{ baseStore.currentTime.format('YYYY年MM月DD日 HH时') }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import { useBaseStore } from '@/store/index'

const baseStore = useBaseStore()

const getHideDiZhi = () => {
  let returnArr: string[] = []
  const timeStr = baseStore.currentTime.format('cY cM cD cH')
  timeStr.split(' ').forEach(x => {
    const zhi = x[1]
    // console.log(zhi, 'zhi')
    diZhiHideList().forEach(y => {
      if (y.label === zhi) {
        returnArr.push(y.value)
      }
    })
  })
  return returnArr
}

const diZhiHideList = () => [
  { label: '子', value: '癸' },
  { label: '卯', value: '乙' },
  { label: '酉', value: '辛' },
  { label: '午', value: '丁巳' },
  { label: '亥', value: '壬甲' },
  { label: '寅', value: '甲丙戊' },
  { label: '巳', value: '丙庚戊' },
  { label: '申', value: '庚壬戊' },
  { label: '辰', value: '戊乙癸' },
  { label: '戌', value: '戊辛丁' },
  { label: '丑', value: '己癸辛' },
  { label: '未', value: '己丁乙' },
]

onBeforeMount(() => {})
onMounted(() => {})
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
    margin-bottom: 4px;
    font-weight: bold;
  }
  .time-dizhi {
    margin-bottom: 10px;
    .cang-gan {
      width: 50px;
      margin-right: 10px;
      display: inline-block;
      text-align: center;
    }
  }
  .time-now {
  }
}
</style>
