<template>
  <div class="list">
    <div class="item" v-for="(item, index) in dataList" :key="index">{{ item.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect, PropType } from 'vue'

interface DataList {
  title: string
  content: string
}

const props = defineProps({
  dataList: {
    type: Array as PropType<DataList[]>,
    default: () => [],
  },
})

console.log(props, 'props')

const data = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
defineExpose({
  ...toRefs(data),
})
</script>
<style scoped lang="scss"></style>
