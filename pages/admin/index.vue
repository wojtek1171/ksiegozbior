<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});

onMounted(() => {
  console.log('fsdf');
});
</script>

<template>
  <div class="text-h3">Admin page</div>
</template>

<style lang="scss"></style>
