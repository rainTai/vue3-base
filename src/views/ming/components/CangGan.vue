<template>
  <div>地支藏干</div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue'

const data = reactive({})
onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})

defineExpose({
  ...toRefs(data),
})
</script>
<style scoped lang="scss"></style>
