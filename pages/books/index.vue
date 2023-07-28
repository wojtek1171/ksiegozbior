<script setup lang="ts">
const { data: books } = await useFetch('/api/books');

const visBooks = books.value?.slice(0, 9);
</script>

<template>
  <h6>Szukaj</h6>
  <q-separator />
  <BookTile v-for="book in visBooks" :key="book._id" :book="book"></BookTile>
</template>
