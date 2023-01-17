<template>
  <div class="header">
    <div class="title">Metaverse</div>
    <div class="page-list">
      <div
        :class="`list-item ${baseData.activeIndex === index ? 'list-item-active' : ''}`"
        v-for="(item, index) in baseData.pageList"
        :key="index"
        @click="jumpTo(item.path, index)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jumpTo = (url, index) => {
  baseData.activeIndex = index
  router.push(url)
}

const baseData = reactive({
  activeIndex: 0,
  pageList: [
    {
      label: '山',
      path: '/shan',
    },
    {
      label: '医',
      path: '/yi',
    },
    {
      label: '命',
      path: '/ming',
    },
    {
      label: '相',
      path: '/xiang',
    },
    {
      label: '卜',
      path: '/bu',
    },
    {
      label: '修',
      path: '/xiu',
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
  justify-content: space-between;
  align-items: center;
  background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  border-bottom: 1px solid #555;
  padding: 0px 10px;
  width: calc(100% - 20px);
  height: 8vh;
  max-height: 50px;
  color: #111;
  font-weight: bold;
  .title {
    font-size: 25px;
  }
  .page-list {
    display: flex;
    font-size: 20px;
    gap: 20px;
    .list-item {
      color: white;
      cursor: pointer;
      &:hover {
        color: #111111;
      }
    }
    .list-item-active {
      color: #111111;
    }
  }
}
</style>
