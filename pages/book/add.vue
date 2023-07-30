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

// const title = ref('');
// const authors = ref();
// const publisher = ref();
// const publicationDate = ref(2023);
// const pages = ref();
// const cover = ref('');
// const purchasePrice = ref();
// const retailPrice = ref();
// const read = ref(false);
// const purchaseDate = ref(new Date().toISOString());
// const translators = ref();
// const originalTitle = ref('');
// const tags = ref();
// const series = ref();
// const seriesVol = ref();
// const publSeries = ref();
// const isbn = ref();
// const note = ref('');
// const description = ref('');
// const image = ref('');

const { parsedData, getLcData } = useLubimyCzytac();

const book = ref({
  title: '',
  authors: [],
  publisher: null,
  publicationDate: 2023,
  pages: 0,
  cover: '',
  purchasePrice: 0,
  retailPrice: 0,
  read: false,
  purchaseDate: new Date().toISOString().slice(0, 10).replaceAll('-', '/'),
  translators: [],
  originalTitle: '',
  tags: [],
  series: null,
  seriesVol: '',
  publSeries: null,
  lcNote: 0,
  isbn: '',
  notes: '',
  description: '',
  image: '',
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

  //const formData = new FormData();

  //formData.append('title', book.value.title)

  // formData.append('title', book.value.title)
  // formData.append('authors', book.value.authors)
  // formData.append('publisher', book.value.publisher)
  // formData.append('publicationDate', book.value.publicationDate)
  // formData.append('pages', book.value.pages)
  // formData.append('cover', book.value.cover)
  // formData.append('purchasePrice', book.value.purchasePrice)
  // formData.append('retailPrice', book.value.retailPrice)
  // formData.append('read', book.value.read)
  // formData.append('purchaseDate', book.value.purchaseDate)
  // formData.append('translators', book.value.translators)
  // formData.append('originalTitle', book.value.originalTitle)
  // formData.append('tags', book.value.tags)
  // formData.append('series', book.value.series)
  // formData.append('seriesVol', book.value.seriesVol)
  // formData.append('publSeries', book.value.publSeries)
  // formData.append('isbn', book.value.isbn)
  // formData.append('lcNote', book.value.lcNote)
  // formData.append('description', book.value.description)
  // formData.append('notes', book.value.notes)
  // formData.append('image', book.value.image)

  // const bookToSave = structuredClone({...book.value});
  const bookToSave = {
    title: book.value.title,
    authors: book.value.authors.join(','),
    publisher: book.value.publisher,
    publicationDate: +book.value.publicationDate,
    pages: +book.value.pages,
    cover: book.value.cover,
    purchasePrice: +book.value.purchasePrice,
    retailPrice: +book.value.retailPrice,
    read: book.value.read,
    purchaseDate: new Date(book.value.purchaseDate),
    translators: book.value.translators?.join(','),
    originalTitle: book.value.originalTitle,
    tags: book.value.tags?.join(','),
    series: book.value.series,
    seriesVol: book.value.seriesVol,
    publSeries: book.value.publSeries,
    lcNote: +book.value.lcNote,
    isbn: book.value.isbn,
    notes: book.value.notes,
    description: book.value.description,
    image: book.value.image,
  };
  //bookToSave.authors = bookToSave.authors.join(',');
  //bookToSave.translators = bookToSave.translators.join(',');

  console.log(bookToSave);
  console.log(book.value);

  const response = await useFetch('/api/book/add', {
    method: 'POST',
    body: bookToSave,
  });

  //console.log(response)
}

const data = ref();

const lcUrl = ref('');

async function onLoadFromLC() {
  await getLcData(lcUrl.value);

  book.value.title = parsedData.value.title;
  book.value.authors = parsedData.value.authors;
  book.value.publisher = parsedData.value.publisher;
  book.value.publicationDate = +parsedData.value.publicationDate?.slice(0, 4);
  book.value.pages = +parsedData.value.pages;
  book.value.translators = parsedData.value.translators;
  book.value.originalTitle = parsedData.value.originalTitle;
  book.value.description = parsedData.value.description;
  book.value.tags = !!parsedData.value.tags ? parsedData.value.category.concat(parsedData.value.tags) : parsedData.value.category;
  book.value.series = parsedData.value.series?.split(' (tom ')[0];
  book.value.seriesVol = +parsedData.value.series?.split(' (tom ')[1].slice(0, -1);
  book.value.publSeries = parsedData.value.publSeries;
  book.value.isbn = parsedData.value.isbn;
  book.value.lcNote = parsedData.value.note;
  book.value.isbn = parsedData.value.isbn;
  book.value.image = parsedData.value.image;
}

const onReset = async () => {
  console.log('asdf');
};
</script>

<template>
  <div class="q-pa-md" id="form" style="max-width: 800px">
    <div>{{ parsedData }}</div>
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
            class="q-py-xs"
            dense
            v-model="book.title"
            label="Tytuł"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Pole wymagane']"
          />

          <q-select
            class="q-my-xs"
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

          <div class="row">
            <div class="col-8">
              <q-select
                v-model="book.series"
                dense
                :options="filterOptions"
                use-input
                use-chips
                stack-label
                @filter="filterFn"
                new-value-mode="add-unique"
                label="Cykl"
              />
            </div>
            <div class="col-1"></div>
            <div class="col-3">
              <q-input dense v-model="book.seriesVol" label="Tom cyklu" />
            </div>
          </div>

          <q-select
            v-model="book.publSeries"
            dense
            :options="filterOptions"
            use-input
            use-chips
            stack-label
            @filter="filterFn"
            new-value-mode="add-unique"
            label="Seria"
          />

          <div class="q-py-xs row">
            <div class="col">
              <q-input dense type="number" v-model="book.isbn" label="ISBN" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-input
                dense
                type="number"
                v-model="book.pages"
                label="Liczba stron"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Wprowadź prawidłową liczbę',
                  (val) => (val > 0 && val < 9999) || 'Wprowadź prawidłową liczbę',
                ]"
              />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-input
                dense
                type="number"
                v-model="book.publicationDate"
                label="Rok publikacji"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Wprowadź prawidłowy rok',
                  (val) => (val > -9999 && val < 9999) || 'Wprowadź prawidłowy rok',
                ]"
              />
            </div>
          </div>

          <div class="q-mt-xs row">
            <div class="col">
              <q-input dense v-model="book.retailPrice" label="Cena okładkowa" mask="#.##" fill-mask="0" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-input dense v-model="book.purchasePrice" label="Cena zakupu" mask="#.##" fill-mask="0" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-input dense v-model="book.lcNote" label="Ocena LC" mask="#.##" fill-mask="0" />
            </div>
          </div>

          <div class="row">
            <div class="col-3">
              <q-select dense v-model="book.cover" label="Rodzaj okładki" :options="coverOptions" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-input dense type="url" v-model="book.image" label="Link do okładki" />
            </div>
          </div>

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

          <div class="row">
            <div class="col">
              <q-input filled v-model="book.purchaseDate" mask="date" :rules="['date']" label="Data zakupu" style="max-width: 800px">
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
            </div>
            <div class="col">
              <q-checkbox v-model="book.read" label="Przeczytana" />
            </div>
            <div class="col"></div>
          </div>

          <q-input dense v-model="book.description" label="Opis" type="textarea" />

          <q-input dense v-model="book.notes" label="Notatka" type="textarea" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>

  <!-- <div>{{ book.purchasePrice }}</div>
  <div>{{ book.retailPrice }}</div>
  <div>{{ book.purchaseDate }}</div>
  <div>{{ typeof book.purchaseDate }}</div>
  <div>{{ options }}</div>
  <div>{{ filterOptions }}</div> -->
</template>

<style>
#form {
  margin: auto;
}
</style>
