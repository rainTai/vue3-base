<template>
  <div class="list">
    <div
      class="item"
      v-for="(item, index) in baseStore.hourList"
      :key="index"
      @click="setHourLocal(item)"
    >
      <div><span class="ganzhi-hour"></span> {{ item.format('cH') }} {{ item.format('HH') }}时</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, watchEffect } from 'vue'
import { useBaseStore } from '@/store'
import { useDate } from '@/hooks/useDate'

const baseStore = useBaseStore()
const { setData } = useDate()

const setHourLocal = item => {
  const hour = item.format('HH')
  baseStore.hour = hour
  setData(baseStore.year, baseStore.month, baseStore.date, baseStore.hour)
}

onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
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
}
</style>
