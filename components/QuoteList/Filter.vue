<script setup lang="ts">
const emit = defineEmits(['filterOptionsChanged']);

const route = useRoute();

const searchParam = route.params.param as String;

const filterOptions = ref({
  bookTitle: '',
  authors: '',
  tags: [],
  text: '',
});

const { searchHintsBundle, prepareSearchHints } = await useQuoteSearchHints();
prepareSearchHints();

const searchHints = ref([]);

function onReset() {
  filterOptions.value.bookTitle = '';
  filterOptions.value.authors = '';
  filterOptions.value.tags = [];
  filterOptions.value.text = '';
}

function filterFn(val, update, hints) {
  update(() => {
    if (val === '') {
      searchHints.value = hints;
    } else {
      const needle = val.toLowerCase();
      searchHints.value = hints.filter((v) => v.toLowerCase().indexOf(needle) > -1);
    }
  });
}

onMounted(() => {
  const splittedParam = searchParam.split('=');

  switch (splittedParam[0]) {
    case 'author':
      filterOptions.value.authors = splittedParam[1];
      break;
    case 'source':
      filterOptions.value.bookTitle = splittedParam[1];
      break;
    case 'tag':
      filterOptions.value.tags = new Array(splittedParam[1]);
      break;
    default:
      filterOptions.value.bookTitle = splittedParam[0];
  }
});

watch(filterOptions.value, () => {
  emit('filterOptionsChanged', filterOptions.value);
});
</script>

<template>
  <div class="q-ma-md text-h3 text-center">Cytaty</div>

  <q-card class="q-pa-md" id="filter-base-card-quote">
    <q-select
      v-model="filterOptions.bookTitle"
      dense
      clearable
      :options="searchHints"
      use-input
      @filter="(val, update) => filterFn(val, update, searchHintsBundle.bookTitles)"
      label="Źródło"
    />
    <q-select
      v-model="filterOptions.authors"
      dense
      clearable
      :options="searchHints"
      use-input
      @filter="(val, update) => filterFn(val, update, searchHintsBundle.authors)"
      label="Autor"
    />
    <q-select
      v-model="filterOptions.tags"
      multiple
      dense
      :options="searchHints"
      use-input
      use-chips
      @filter="(val, update) => filterFn(val, update, searchHintsBundle.tags)"
      new-value-mode="add-unique"
      label="Tagi"
    />
    <q-input v-model="filterOptions.text" dense clearable label="Treść" debounce="500" />
    <div class="q-mt-sm" align="right">
      <q-btn flat round icon="restart_alt" color="" @click="onReset()" />
    </div>
  </q-card>
</template>

<style lang="scss">
#filter-base-card-quote {
  margin: auto;
  max-width: 600px;
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 25px;
}
</style>
