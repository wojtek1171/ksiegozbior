<script setup lang="ts">
const { data: books } = await useFetch('/api/books/by_creation_desc');
const displayedBooks = ref(books.value);

const isBanner = ref(false);

const tileOrTab = ref(true);
const changeView = () => (tileOrTab.value = !tileOrTab.value);
const filterOptions = ref({
  title: '',
  publisher: '',
});

const { filteredBooks, filterBooks } = useBookFilter();

const componentKey = ref(0);

const onChange = (param) => {
  console.log('change');
  componentKey.value += 1;
  filterOptions.value = param;
  filterBooks(books.value, filterOptions.value);
  displayedBooks.value = filteredBooks.value;
};

const sharedState = useState('alert');

function dismissBanner() {
  isBanner.value = false;
  clearNuxtState('alert');
}

onMounted(() => {
  isBanner.value = sharedState.value?.isVisible;
});

onUnmounted(() => {
  clearNuxtState('alert');
});
</script>

<template>
  <q-banner v-if="isBanner" class="bg-primary text-white">
    {{ sharedState.message }}
    <template v-slot:action>
      <q-btn @click="dismissBanner" flat color="white" label="OK" />
    </template>
  </q-banner>

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
