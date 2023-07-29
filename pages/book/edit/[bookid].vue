<script setup lang="ts">
//const image = 'https://i.imgur.com/rpVYMUX.jpeg';

const route = useRoute();
const bookid = ref(route.params.bookid);
const { data: fetchedBook } = await useFetch(`/api/book/${bookid.value}`);

const menu = false;
let modal = ref(true);
let someDate = ref(new Date().toISOString());
let menu2 = false;
let authorSearch = [];
let publisherSearch = [];
let translatorSearch = [];
let tagsSearch = [];
let kert = 'sdfsdf';
let modelMultiple = ref([]);
const options = ['Stanisław Lem', 'Stanisław Tym', 'Lucjan Tym'];
const coverOptions = ['twarda', 'miękka', 'zintegrowana', 'inna'];
const filterOptions = ref(options);

const { parsedData, getLcData } = useLubimyCzytac();

const book = ref({
  title: fetchedBook.value.title,
  authors: fetchedBook.value.authors.split(','),
  publisher: fetchedBook.value.publisher,
  publicationDate: fetchedBook.value.publicationDate,
  pages: fetchedBook.value.pages,
  cover: fetchedBook.value.cover,
  purchasePrice: fetchedBook.value.purchasePrice.toFixed(2),
  retailPrice: fetchedBook.value.retailPrice.toFixed(2),
  read: fetchedBook.value.read,
  purchaseDate: new Date(fetchedBook.value.purchaseDate).toISOString().slice(0, 10).replaceAll('-', '/'),
  translators: fetchedBook.value.translators.split(','),
  originalTitle: fetchedBook.value.originalTitle,
  tags: fetchedBook.value.tags.split(','),
  series: fetchedBook.value.series,
  seriesVol: fetchedBook.value.seriesVol,
  publSeries: fetchedBook.value.publSeries,
  lcNote: fetchedBook.value.lcNote?.toFixed(2),
  isbn: fetchedBook.value.isbn,
  notes: fetchedBook.value.notes,
  description: fetchedBook.value.description,
  image: fetchedBook.value.image,
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

  console.log(bookToSave);
  console.log(book.value);

  const response = await useFetch(`/api/book/edit/${bookid.value}`, {
    method: 'PATCH',
    body: bookToSave,
  });
}

const data = ref();

const lcUrl = ref('');

const lcBookData = ref({
  title: '',
  authors: [],
  publisher: null,
  publicationDate: 2023,
  pages: 0,
  translators: [],
  originalTitle: '',
  tags: [],
  series: null,
  seriesVol: '',
  publSeries: null,
  lcNote: 0,
  isbn: '',
  description: '',
  image: '',
});

let isLcFormVisible = ref(false);

async function onLoadFromLC() {
  await getLcData(lcUrl.value);

  lcBookData.value.title = parsedData.value.title;
  lcBookData.value.authors = parsedData.value.authors;
  lcBookData.value.publisher = parsedData.value.publisher;
  lcBookData.value.publicationDate = +parsedData.value.datePublished?.slice(0, 4);
  lcBookData.value.pages = +parsedData.value.pages;
  lcBookData.value.translators = parsedData.value.translators;
  lcBookData.value.originalTitle = parsedData.value.originalTitle;
  lcBookData.value.description = parsedData.value.description;
  lcBookData.value.tags = parsedData.value.category.concat(parsedData.value.tags);
  lcBookData.value.series = parsedData.value.series?.split(' (tom ')[0];
  lcBookData.value.seriesVol = +parsedData.value.series?.split(' (tom ')[1].slice(0, -1);
  lcBookData.value.publSeries = parsedData.value.publSeries;
  lcBookData.value.isbn = parsedData.value.isbn;
  lcBookData.value.lcNote = parsedData.value.note;
  lcBookData.value.isbn = parsedData.value.isbn;
  lcBookData.value.image = parsedData.value.image;

  isLcFormVisible.value = true;
}

function overrideField(fieldName: String) {
  // @ts-ignore
  book.value[fieldName] = lcBookData.value[fieldName];
}
const onReset = async () => {
  console.log('asdf');
  isLcFormVisible.value = !isLcFormVisible.value;
};
</script>

<template>
  <div class="q-pa-md" id="form" style="max-width: 800px">
    <h4>Edytuj książkę</h4>

    <div>{{ fetchedBook }}</div>

    <q-card class="my-card" flat bordered>
      <q-btn class="q-ma-sm" label="Pobierz z LC">
        <q-popup-proxy>
          <q-card class="q-pa-md" style="width: 500px">
            <q-input dense v-model="lcUrl" label="link lubimy czytać"></q-input>
            <q-btn class="q-mt-lg" label="pobierz" @click="onLoadFromLC()"></q-btn>
          </q-card>
        </q-popup-proxy>
      </q-btn>

      <q-card-section v-if="isLcFormVisible" class="q-gutter-sm">
        <q-field filled label="Tytuł" stack-label dense>
          <template v-slot:control>
            <div>{{ lcBookData.title }}</div>
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="overrideField('title')">
              <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
            </q-btn>
          </template>
        </q-field>

        <q-field filled label="Autor" stack-label dense>
          <template v-slot:control>
            <!-- <div>{{ lcBookData.authors }}</div> -->
            <q-chip v-for="author in lcBookData.authors">{{ author }}</q-chip>
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="overrideField('authors')">
              <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
            </q-btn>
          </template>
        </q-field>

        <q-field filled label="Wydawca" stack-label dense>
          <template v-slot:control>
            <div>{{ lcBookData.publisher }}</div>
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send">
              <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
            </q-btn>
          </template>
        </q-field>

        <q-field filled label="Opis" stack-label dense>
          <template v-slot:control>
            <div>{{ lcBookData.description }}</div>
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="overrideTitle()">
              <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
            </q-btn>
          </template>
        </q-field>
      </q-card-section>

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
              <q-input dense v-model="book.retailPrice" label="Cena okładkowa" reverse-fill-mask mask="#.##" fill-mask="0" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-input dense v-model="book.purchasePrice" label="Cena zakupu" reverse-fill-mask mask="#.##" fill-mask="0" />
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
