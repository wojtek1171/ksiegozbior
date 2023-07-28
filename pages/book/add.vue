<script setup lang="ts">
//const image = 'https://i.imgur.com/rpVYMUX.jpeg';

const menu = false;
let modal = ref(true);
let someDate = ref(new Date().toISOString());
let menu2 = false;
let authorSearch = [];
let publisherSearch = [];
let translatorSearch = [];
let tagsSearch = [];
let kert = '';
let modelMultiple = ref([]);
const options = ['Stanisław Lem', 'Stanisław Tym', 'Lucjan Tym'];
const coverOptions = ['twarda', 'miękka', 'zintegrowana', 'inna'];
const filterOptions = ref(options);

const title = ref('');
const authors = ref();
const publisher = ref();
const publicationDate = ref(2023);
const pages = ref();
const cover = ref('');
const purchasePrice = ref();
const retailPrice = ref();
const read = ref(false);
const purchaseDate = ref(new Date().toISOString());
const translators = ref();
const originalTitle = ref('');
const tags = ref();
const series = ref();
const seriesVol = ref();
const publSeries = ref();
const isbn = ref();
const note = ref('');
const description = ref('');
const image = ref('');

const { parsedData, getLcData } = useLubimyCzytac();

const book = ref({
  title,
  authors,
  publisher,
  publicationDate: 2023,
  pages,
  cover,
  purchasePrice,
  retailPrice,
  read: false,
  purchaseDate: new Date().toISOString(),
  translators,
  originalTitle,
  tags,
  series,
  seriesVol,
  publSeries,
  isbn,
  note,
  description,
  image,
});

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

const sth = ref();

async function onSubmit() {
  console.log('submit');
}

const data = ref();

const lcUrl = ref('');

async function onLoadFromLC() {
  await getLcData(lcUrl.value);

  book.value.title = parsedData.value.title;
  book.value.authors = parsedData.value.authors;
  book.value.publisher = parsedData.value.publisher;
  book.value.description = parsedData.value.description;
}

const onReset = async () => {
  console.log('asdf');
};
</script>

<template>
  <div>{{ parsedData }}</div>
  <div class="q-pa-md" id="form" style="max-width: 800px">
    <h4>Dodaj książkę</h4>
    <q-card class="my-card" flat bordered>
      <q-btn class="q-ma-sm" label="Pobierz z LC">
        <q-popup-proxy>
          <q-card class="q-pa-md" style="width: 500px">
            <q-input dense v-model="lcUrl" label="link lubimy czytać"></q-input>
            <q-btn class="q-mt-lg" label="pobierz" @click="onLoadFromLC()"></q-btn>
          </q-card>
        </q-popup-proxy>
      </q-btn>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            dense
            v-model="book.title"
            label="Tytuł"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Pole wymagane']"
          />

          <q-select
            v-model="book.authors"
            multiple
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Autor"
          />

          <q-select
            v-model="book.publisher"
            multiple
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Wydawca"
          />

          <q-select
            v-model="book.translators"
            multiple
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Tłumacz"
          />

          <q-input dense v-model="book.originalTitle" label="Tytuł oryginalny" />

          <q-select
            v-model="book.series"
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Seria"
          />

          <q-input dense type="number" v-model="book.seriesVol" label="Tom serii" />

          <q-select
            v-model="book.publSeries"
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Cykl"
          />

          <q-input dense type="number" v-model="book.isbn" label="ISBN" />

          <q-input
            dense
            type="number"
            v-model="book.pages"
            label="Liczba stron"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 9999) || 'Please type a real age',
            ]"
          />

          <q-input
            dense
            type="number"
            v-model="book.publicationDate"
            label="Rok publikacji"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 9999) || 'Please type a real age',
            ]"
          />

          <q-select dense v-model="book.cover" label="Rodzaj okładki" :options="coverOptions" />

          <q-input dense type="number" v-model="book.retailPrice" label="Cena okładkowa" />

          <q-input dense type="number" v-model="book.purchasePrice" label="Cena zakupu" />

          <q-input dense v-model="book.image" label="Link do okładki" />

          <q-select
            v-model="book.tags"
            multiple
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Tagi"
          />

          <q-input
            filled
            v-model="book.purchaseDate"
            mask="date"
            :rules="['date']"
            label="Data zakupu"
            style="max-width: 200px"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="book.purchaseDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input dense v-model="book.description" label="Opis" type="textarea" />

          <q-input dense v-model="book.note" label="Notatka" type="textarea" />

          <q-checkbox v-model="book.read" label="Przeczytana" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>

  <div>{{ modal }}</div>
  <div>{{ someDate }}</div>
  <div>{{ modelMultiple }}</div>
  <div>{{ options }}</div>
  <div>{{ filterOptions }}</div>
</template>

<style>
#form {
  margin: auto;
}
</style>
