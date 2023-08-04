<script setup lang="ts">
useMeta({
  title: 'Wyszukaj cytat',
});
const { data: quotes } = await useFetch('/api/quotes/by_creation_desc');
const displayedQuotes = ref(quotes.value);

const isBanner = ref(false);

const filterOptions = ref({
  bookTitle: '',
  authors: '',
  tags: [],
});

const { filteredQuotes, filterQuotes } = useQuoteFilter();

const componentKey = ref(0);

const onFilterChange = (param) => {
  componentKey.value += 1;
  filterOptions.value = param;
  filterQuotes(quotes.value, filterOptions.value);
  displayedQuotes.value = filteredQuotes.value;
};

const onQuoteDeleted = (param) => {
  quotes.value = quotes.value?.filter((q) => q._id !== param);
  filterQuotes(quotes.value, filterOptions.value);
  displayedQuotes.value = filteredQuotes.value;
  componentKey.value += 1;
  isBanner.value = true;
};

const sharedState = useState('quoteAlert');

function dismissBanner() {
  isBanner.value = false;
  clearNuxtState('quoteAlert');
}

onMounted(() => {
  isBanner.value = sharedState.value?.isVisible;
});

onUnmounted(() => {
  //clearNuxtState('quoteAlert');
});
</script>

<template>
  <q-banner v-if="isBanner" class="bg-green-4 text-white">
    {{ sharedState.message }}
    <template v-slot:action>
      <q-btn @click="dismissBanner" flat color="white" label="OK" />
    </template>
  </q-banner>

  <QuoteListFilter @filterOptionsChanged="onFilterChange"></QuoteListFilter>

  <q-separator class="q-mt-md"></q-separator>
  <div class="row items-center" style="max-width: 1000px; margin: auto">
    <div class="q-ma-md col text-center">Wynik wyszukiwania: {{ displayedQuotes?.length }}</div>
  </div>
  <q-separator></q-separator>

  <QuoteListTiles :quotes="displayedQuotes" :key="componentKey" @quoteDeleted="onQuoteDeleted"></QuoteListTiles>
</template>
