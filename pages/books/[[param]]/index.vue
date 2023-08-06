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
  useMeta({
    title: 'Wyszukaj książkę',
  });
  isBanner.value = sharedState.value?.isVisible;
});

onUnmounted(() => {
  clearNuxtState('alert');
});
</script>

<template>
  <BookListFilter @filterOptionsChanged="onChange" />

  <q-separator class="q-mt-md" />

  <div class="row items-center" style="max-width: 1000px; margin: auto">
    <div class="col"></div>
    <div class="q-ma-md col text-center">Wynik wyszukiwania: {{ displayedBooks?.length }}</div>
    <!-- <q-space /> -->
    <div class="col" align="right">
      <q-btn v-if="tileOrTab" class="q-ma-md" icon="view_list" @click="changeView" />
      <q-btn v-else class="q-ma-md" icon="grid_view" @click="changeView" />
    </div>
  </div>

  <q-separator />

  <BookListTiles v-if="tileOrTab" :books="displayedBooks" :key="componentKey" />
  <BookListTable v-else :books="displayedBooks" />

  <q-banner v-if="isBanner" class="bg-green-4 banner">
    <div class="row no-wrap q-gutter-md">
      <div>
        {{ sharedState.message }}
      </div>
      <div>
        <q-btn @click="dismissBanner" outline color="black" icon="close" size="sm" round />
      </div>
    </div>
  </q-banner>
  <q-page-scroller position="bottom-left" :scroll-offset="150" :offset="[10, 10]">
    <q-btn fab icon="keyboard_arrow_up" color="indigo" />
  </q-page-scroller>
</template>

<style lang="scss">
.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}
</style>
