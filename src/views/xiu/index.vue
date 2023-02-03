<template>
  <div class="page">
    <div class="page-left">
      <div
        v-for="(item, index) in baseData.articles"
        :key="index"
        :class="`${index === baseData.activeIndex ? 'list-item-active' : ''} list-item`"
        @click="handleClick(item, index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="page-right">
      <div v-for="(item, index) in baseData.articles[baseData.activeIndex].content" :key="index">
        {{ item.title }}
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from 'vue'
import { articles } from './articles/data'

const baseData = reactive({
  activeIndex: 0,
  activeChildIndex: 0,
  articles,
})

const handleClick = (_item, index) => {
  baseData.activeIndex = index
}
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.page {
  display: flex;
  height: 100%;
  .page-left {
    width: 300px;
    border-right: 1px solid #777;
    margin-right: 10px;
    padding-right: 10px;
    padding-left: 20px;
    font-size: 20px;
    .list-item {
      padding: 10px 0px 5px;
      border-bottom: 1px solid #777;
      cursor: pointer;
    }
    .list-item-active {
      font-weight: bold;
      font-size: 24px;
    }
  }
  .page-right {
    flex: 1;
    text-align: center;
    font-size: 20px;
    margin-top: 30px;
  }
}
</style>
