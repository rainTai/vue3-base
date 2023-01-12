<template>
  <div class="header">
    <div class="title">朱大六艺</div>
    <div class="page-list">
      <div class="list-item" v-for="(item, index) in baseData.pageList" :key="index">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from 'vue'

const baseData = reactive({
  pageList: [
    {
      label: '山',
    },
    {
      label: '医',
    },
    {
      label: '命',
    },
    {
      label: '相',
    },
    {
      label: '卜',
    },
    {
      label: '修',
    },
  ],
})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.header {
  display: flex;
  color: white;
}
</style>
