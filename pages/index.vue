<template>
  <Test :title="title" :description="description" />
</template>
<script setup lang="ts">
const count = ref(0)
const title = computed(() => `タイトル${count.value}`)
const description = computed(() => `記述${count.value}`)
setInterval(() => {
  count.value++
}, 1000)
</script>
