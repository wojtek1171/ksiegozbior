<script setup lang="ts">
const { data: quotes } = await useFetch('/api/quotes/by_creation_desc');
const { declineQuote } = useDeclination();
const { filteredQuotes, filterQuotes } = useQuoteFilter();
const componentKey = ref(0);
const isBanner = ref(false);
const filterOptions = ref({
  bookTitle: '',
  authors: '',
  tags: [],
  text: '',
});
filterQuotes(quotes.value, filterOptions.value);
const displayedQuotes = ref(filteredQuotes.value);
console.log('render');

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

function rollTheDice() {
  const randomQuoteNo = Math.floor(Math.random() * filteredQuotes.value.length);
  displayedQuotes.value = [filteredQuotes.value[randomQuoteNo]];
  componentKey.value += 1;
}

onMounted(() => {
  useMeta({
    title: 'Znajdź cytat',
  });
  isBanner.value = sharedState.value?.isVisible;
});
</script>

<template>
  <QuoteListFilter @filterOptionsChanged="onFilterChange" />

  <q-separator class="q-mt-md" />
  <div class="row items-center" style="max-width: 750px; margin: auto">
    <div class="col"></div>
    <div class="q-ma-md col text-center">Znaleziono {{ displayedQuotes?.length }} {{ declineQuote(displayedQuotes?.length) }}</div>
    <div class="col" align="right">
      <q-btn class="q-ma-md text-black" flat icon="casino" color="grey-8" @click="rollTheDice()" />
    </div>
  </div>
  <q-separator />

  <QuoteListTiles :quotes="displayedQuotes" :key="componentKey" :textSearchPhrase="filterOptions.text" @quoteDeleted="onQuoteDeleted" />

  <q-banner v-if="isBanner" class="bg-green-4 banner">
    <div class="row no-wrap q-gutter-md">
      <div>
        {{ sharedState?.message }}
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
</style>
