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
      <div class="child-flex">
        <div
          v-for="(item, index) in baseData.articles[baseData.activeIndex].content"
          :key="index"
          :class="`${index === baseData.activeChildIndex ? 'child-active' : ''} child`"
          @click="handleChildClick(item, index)"
        >
          {{ item.title }}
        </div>
      </div>

      <div class="article-content">
        <v-md-preview
          style="margin: 20px"
          :text="baseData.articles[baseData.activeIndex].content[baseData.activeChildIndex].content"
        />
      </div>
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
  baseData.activeChildIndex = 0
  baseData.activeIndex = index
}

const handleChildClick = (_item, index) => {
  baseData.activeChildIndex = index
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
    width: 0px;
    // text-align: center;
    font-size: 20px;
    margin-top: 10px;
    .child-flex {
      display: flex;
      flex-wrap: wrap;
      .child {
        padding: 2px 10px;
        cursor: pointer;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: 5px;
          bottom: 20%;
          width: 3px;
          height: 55%;
          background: #555;
        }
      }
      .child-active {
        font-weight: bold;
        border: 1px dashed #111;
      }
    }
    .article-content {
      // padding: 20px;
      // width: 100%;
    }
  }
}
</style>
