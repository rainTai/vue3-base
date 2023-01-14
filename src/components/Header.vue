<template>
  <div class="header">
    <div class="title">Metaverse</div>
    <div class="page-list">
      <div
        :class="`list-item ${baseData.activeIndex === index ? 'list-item-active' : ''}`"
        v-for="(item, index) in baseData.pageList"
        :key="index"
        @click="jumpTo(item.path)"
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

const jumpTo = url => {
  router.push(url)
}

const baseData = reactive({
  activeIndex: 0,
  pageList: [
    {
      label: 'Shan',
      path: '/shan',
    },
    {
      label: 'Yi',
      path: '/yi',
    },
    {
      label: 'Ming',
      path: '/ming',
    },
    {
      label: 'Xiang',
      path: '/xiang',
    },
    {
      label: 'Bu',
      path: '/bu',
    },
    {
      label: 'Xiu',
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
  padding: 10px;
  width: calc(100% - 20px);
  height: 40px;
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
  }
}
</style>
