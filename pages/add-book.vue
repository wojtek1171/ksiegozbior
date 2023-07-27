<script setup lang="ts">
let book = {
  title: 'TestTitle',
  authors: 'Lem Stan',
  publisher: '',
  publicationDate: '',
  pages: '',
  cover: '',
  purchasePrice: '',
  retailPrice: '',
  read: ref(true),
  purchaseDate: new Date().toISOString().substr(0, 10),
  translators: '',
  originalTitle: '',
  tags: '',
  image: 'https://i.imgur.com/rpVYMUX.jpeg',
};
const image = 'https://i.imgur.com/rpVYMUX.jpeg';
const menu = false;
let modal = ref(true);
let someDate = ref(new Date());
let menu2 = false;
let authorSearch = [];
let publisherSearch = [];
let translatorSearch = [];
let tagsSearch = [];
let kert = '';
let modelMultiple = ref([]);
const options = ['Stanisław Lem', 'Stanisław Tym', 'Lucjan Tym'];
const filterOptions = ref(options);

function submitForm() {
  console.log('sdf');
}

function filterFn(val, update) {
  update(() => {
    if (val === '') {
      filterOptions.value = options;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = options.filter((v) => v.toLowerCase().indexOf(needle) > -1);
    }
  });
}
</script>

<template>
  <div>Dodaj książke</div>
  <div class="q-pa-md">
    <q-checkbox v-model="modal" label="przeczytana" />
  </div>

  <q-date v-model="someDate" minimal />

  <q-select
    v-model="modelMultiple"
    multiple
    :options="filterOptions"
    use-input
    use-chips
    stack-label
    @filter="filterFn"
    new-value-mode="add-unique"
    label="Multiple selection"
  />

  <div>{{ modal }}</div>
  <div>{{ someDate }}</div>
  <div>{{ modelMultiple }}</div>
  <div>{{ options }}</div>
  <div>{{ filterOptions }}</div>
</template>
