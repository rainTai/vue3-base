<template>
  <div class="list">
    <div class="item" v-for="(item, index) in getGongFilter(baseStore.gongList)" :key="index">
      {{ item.name }} - {{ item.inside }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, watchEffect } from 'vue'
import { useBaseStore } from '@/store'

const baseStore = useBaseStore()

const getGongFilter = list => {
  return [list[3], list[8], list[1], list[2], list[4], list[6], list[7], list[0], list[5]]
}

onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-template-rows: repeat(3, minmax(100px, 1fr));
  margin: 10px;
  border: 1px dashed #555;
  .item {
    border: 1px dashed #555;
  }
}
</style>
