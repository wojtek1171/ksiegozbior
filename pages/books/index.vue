<script setup lang="ts">
const { data: books } = await useFetch('/api/books');

const tileOrTab = ref(true);
const changeView = () => (tileOrTab.value = !tileOrTab.value);
</script>

<template>
  <h6>Szukaj</h6>

  <div>{{ tileOrTab }}</div>

  <q-btn @click="changeView">Tile or tab</q-btn>

  <ListTiles v-if="tileOrTab" :books="books"></ListTiles>
  <ListTable v-else :books="books"></ListTable>
</template>
