<template>
  <div class="page">
    <div class="page-left"><ListComp /></div>
    <div class="page-right"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue'
import ListComp from '@/components/List/Index.vue'
// import DataList from './data'

const data = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
defineExpose({
  ...toRefs(data),
})
</script>
<style scoped lang="scss"></style>
