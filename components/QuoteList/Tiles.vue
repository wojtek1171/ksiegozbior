<script setup lang="ts">
const props = defineProps(['quotes', 'textSearchPhrase']);
const emit = defineEmits(['quoteDeleted']);

let visQuotes = props.quotes?.slice(0, 10);

const currentPage = ref(1);
const maxPage = ref(Math.ceil(props.quotes.length / 10));

const onQuoteDeleted = (param) => {
  emit('quoteDeleted', param);
};

watch(currentPage, () => {
  window.scrollTo(0, 250);
  const startPosition = (currentPage.value - 1) * 10;
  visQuotes = props.quotes.slice(startPosition, startPosition + 10);
});
</script>

<template>
  <div class="flex flex-center">
    <q-pagination v-model="currentPage" :max="maxPage" input />
  </div>

  <div class="q-my-md" v-for="quote in visQuotes">
    <QuoteListQuoteTile
      :key="quote._id"
      :quote="quote"
      :textSearchPhrase="props.textSearchPhrase"
      @quoteDeleted="onQuoteDeleted"
    ></QuoteListQuoteTile>
  </div>

  <div class="flex flex-center">
    <q-pagination v-model="currentPage" :max="maxPage" input />
  </div>
</template>

<style lang="scss">
.pagination {
  margin: auto;
}
</style>
