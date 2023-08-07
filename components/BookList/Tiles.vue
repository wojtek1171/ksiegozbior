<script setup lang="ts">
const props = defineProps(['books']);

let visBooks = props.books?.slice(0, 10);

const currentPage = ref(1);
const maxPage = ref(Math.ceil(props.books.length / 10));

watch(currentPage, () => {
  window.scrollTo(0, 400);
  const startPosition = (currentPage.value - 1) * 10;
  visBooks = props.books.slice(startPosition, startPosition + 10);
});
</script>

<template>
  <div class="flex flex-center">
    <q-pagination v-model="currentPage" :max="maxPage" input />
  </div>

  <div class="q-my-md" v-for="book in visBooks">
    <BookTile :key="book._id" :book="book"></BookTile>
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
