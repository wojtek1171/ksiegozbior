<script setup lang="ts">
const { data: books } = useFetch('/api/books/for_search');
const displayedBooks = ref();
const { declineBook } = useDeclination();

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
    title: 'Znajdź książkę',
  });
  isBanner.value = sharedState.value?.isVisible;
});

onUnmounted(() => {
  clearNuxtState('alert');
});

watch(books, () => {
  displayedBooks.value = books.value;
});
</script>

<template>
  <div class="q-ma-md text-h3 text-center">Księgozbiór</div>

  <BookListFilter v-if="displayedBooks" @filterOptionsChanged="onChange" :books="books" />
  <q-skeleton v-else class="filter-skeleton"></q-skeleton>

  <q-separator class="q-mt-md" />

  <div class="row items-center" style="max-width: 1000px; margin: auto">
    <div class="col"></div>
    <div class="q-ma-md col text-center">Znaleziono {{ displayedBooks?.length }} {{ declineBook(displayedBooks?.length) }}</div>
    <div class="col" align="right">
      <q-btn v-if="tileOrTab" class="q-ma-md text-black" icon="view_list" color="blue-grey-2" @click="changeView" />
      <q-btn v-else class="q-ma-md text-black" icon="grid_view" color="blue-grey-2" @click="changeView" />
    </div>
  </div>

  <q-separator />

  <div v-if="displayedBooks">
    <BookListTiles v-if="tileOrTab" :books="displayedBooks" :key="componentKey" />
    <BookListTable v-else :books="displayedBooks" />
  </div>
  <div v-else class="q-mt-xl q-gutter-md">
    <div v-for="index in 3" :key="index">
      <q-skeleton class="tile-skeleton"></q-skeleton>
    </div>
  </div>

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
    <q-btn icon="keyboard_arrow_up" color="indigo" size="md" round />
  </q-page-scroller>
</template>

<style lang="scss">
.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}

.tile-skeleton {
  margin-top: 1em;
  border-radius: 25px;
  height: 380px;
  max-width: 900px;
  margin: auto;
}

.filter-skeleton {
  margin-top: 1em;
  border-radius: 25px;
  height: 380px;
  max-width: 1000px;
  margin: auto;
}
</style>
