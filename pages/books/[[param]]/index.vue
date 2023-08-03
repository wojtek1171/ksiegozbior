<script setup lang="ts">
useMeta({
  title: 'Wyszukaj książkę',
});
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
  <q-banner v-if="isBanner" class="bg-green-4 text-white">
    {{ sharedState.message }}
    <template v-slot:action>
      <q-btn @click="dismissBanner" flat color="white" label="OK" />
    </template>
  </q-banner>

  <ListFilter @filterOptionsChanged="onChange"></ListFilter>

  <q-separator class="q-mt-md"></q-separator>
  <div class="row items-center" style="max-width: 1000px; margin: auto">
    <div class="col"></div>
    <div class="q-ma-md col text-center">Wynik wyszukiwania: {{ displayedBooks?.length }}</div>
    <!-- <q-space /> -->
    <div class="col" align="right">
      <q-btn v-if="tileOrTab" class="q-ma-md" icon="view_list" @click="changeView" />
      <q-btn v-else class="q-ma-md" icon="grid_view" @click="changeView" />
    </div>
  </div>
  <q-separator></q-separator>

  <ListTiles v-if="tileOrTab" :books="displayedBooks" :key="componentKey"></ListTiles>
  <ListTable v-else :books="displayedBooks"></ListTable>
</template>
