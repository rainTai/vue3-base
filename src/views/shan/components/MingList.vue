<template>
  <div class="wrap">
    <div v-for="(item, index) in baseStore.mingInfoList" :key="index" class="ming">
      <div>{{ item.ming }}</div>
      <div v-for="(infoItem, infoIndex) in item.mingInfo" :key="infoIndex" class="item">
        <div v-show="infoItem.value">
          <div class="label">{{ infoItem.label }}-{{ infoItem.value }}</div>
          <div class="info">{{ infoItem.info }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useBaseStore } from '@/store/index'

const baseStore = useBaseStore()
</script>
<style scoped lang="scss">
.item {
  margin: 10px;
  .label {
  }
  .info {
    font-family: 微软雅黑;
    font-size: 12px;
  }
}
</style>
