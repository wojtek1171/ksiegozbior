<script setup lang="ts">
const { data: books } = await useFetch('/api/books/by_creation_desc');
const displayedBooks = ref(books.value);

const tileOrTab = ref(true);
const changeView = () => (tileOrTab.value = !tileOrTab.value);
const filterOptions = ref({
  title: '',
  publisher: '',
});

const { filteredBooks, filterBooks } = await useBookFilter();

const componentKey = ref(0);

const onChange = (param) => {
  console.log('change');
  componentKey.value += 1;
  filterOptions.value = param;
  filterBooks(books.value, filterOptions.value);
  displayedBooks.value = filteredBooks.value;
};
</script>

<template>
  <h6>Szukaj</h6>

  <div>{{ filterOptions }}</div>

  <ListFilter @filterOptionsChanged="onChange"></ListFilter>

  <q-separator></q-separator>
  <div class="row items-center">
    <div class="q-ma-md">Wynik wyszukiwania: {{ displayedBooks?.length }}</div>
    <q-space />
    <div>
      <q-btn class="q-ma-md" @click="changeView">Tile or tab</q-btn>
    </div>
  </div>
  <q-separator></q-separator>

  <ListTiles v-if="tileOrTab" :books="displayedBooks" :key="componentKey"></ListTiles>
  <ListTable v-else :books="displayedBooks"></ListTable>
</template>
