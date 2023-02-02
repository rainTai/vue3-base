<template>
  <div>
    <div v-for="(item, index) in baseStore.mingInfoList" :key="index">
      <div>{{ item.ming }}</div>
      <div v-for="(infoItem, infoIndex) in item.mingInfo" :key="infoIndex">
        <div v-show="infoItem.value">
          <div>{{ infoItem.label }}-{{ infoItem.value }}</div>
          <div>{{ infoItem.info }}</div>
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
<style scoped lang="scss"></style>
