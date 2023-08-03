<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});
useMeta({
  title: 'Dodaj książkę',
});

const router = useRouter();
const coverOptions = ['twarda', 'miękka', 'zintegrowana', 'inna'];
const { parsedData, getLcData } = useLubimyCzytac();
const lcUrl = ref('');

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
  seriesVol: null,
  publSeries: null,
  lcNote: 0,
  lcUrl: '',
  isbn: '',
  notes: '',
  description: '',
  image: '',
});

async function onSubmit() {
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
    lcUrl: book.value.lcUrl,
    isbn: book.value.isbn,
    notes: book.value.notes,
    description: book.value.description,
    image: book.value.image,
  };

  const response = await useFetch('/api/book/add', {
    method: 'POST',
    body: bookToSave,
  });

  const sharedState = useState('alert', () => ({
    isVisible: true,
    message: `Książka '${book.value.title}' została dodana`,
  }));

  router.push({
    path: '/books',
  });
}

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
  book.value.seriesVol = parsedData.value.series ? +parsedData.value.series?.split(' (tom ')[1].slice(0, -1) : null;
  book.value.publSeries = parsedData.value.publSeries;
  book.value.isbn = parsedData.value.isbn;
  book.value.lcNote = +parsedData.value.note;
  book.value.lcUrl = lcUrl.value;
  book.value.isbn = parsedData.value.isbn;
  book.value.image = parsedData.value.image;
}

const { searchHintsBundle, prepareSearchHints } = await useBookSearchHints();
prepareSearchHints();
const searchHints = ref([]);

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

const onReset = async () => {
  console.log('asdf');
};
</script>

<template>
  <div class="q-pa-md" id="add-form" style="max-width: 800px">
    <q-card class="card-form" flat bordered>
      <div class="q-mx-md row no-wrap items-center">
        <div class="card-title">Dodaj książkę</div>

        <q-space />

        <q-btn class="q-ma-sm" color="orange-10" outline label="Pobierz z LC">
          <q-popup-proxy>
            <q-card class="q-pa-md" style="width: 500px">
              <q-input dense v-model="lcUrl" label="link lubimy czytać"></q-input>
              <q-btn class="q-mt-lg" label="pobierz" @click="onLoadFromLC()"></q-btn>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </div>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
          <q-input
            class="q-py-none"
            dense
            v-model="book.title"
            label="Tytuł"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Pole wymagane']"
          />

          <q-select
            class="q-py-none"
            v-model="book.authors"
            multiple
            dense
            :options="searchHints"
            use-input
            use-chips
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.authors)"
            new-value-mode="add-unique"
            label="Autor"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Pole wymagane']"
          />

          <q-select
            class="q-mt-sm"
            v-model="book.publisher"
            dense
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.publishers)"
            new-value-mode="add-unique"
            label="Wydawnictwo"
          />

          <q-select
            v-model="book.translators"
            multiple
            dense
            :options="searchHints"
            use-input
            use-chips
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.translators)"
            new-value-mode="add-unique"
            label="Tłumacz"
          />

          <q-input dense v-model="book.originalTitle" label="Tytuł oryginalny" />

          <div class="row">
            <div class="col-8">
              <q-select
                v-model="book.series"
                dense
                :options="searchHints"
                use-input
                @filter="(val, update) => filterFn(val, update, searchHintsBundle.series)"
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
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.publSeries)"
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
              <q-input dense v-model="book.lcNote" label="Ocena LC" mask="#.##" reverse-fill-mask fill-mask="0" />
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

          <div>
            <q-input dense type="url" v-model="book.lcUrl" label="Link do LubimyCzytac.pl" />
          </div>

          <q-select
            v-model="book.tags"
            multiple
            dense
            :options="searchHints"
            use-input
            use-chips
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.tags)"
            new-value-mode="add-unique"
            label="Tagi"
          />

          <div class="row">
            <div>
              <q-input filled dense v-model="book.purchaseDate" mask="date" :rules="['date']" label="Data zakupu" style="max-width: 800px">
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
            <q-space />
            <div>
              <q-checkbox v-model="book.read" label="Przeczytana" />
            </div>
          </div>

          <q-input dense v-model="book.description" label="Opis" type="textarea" />

          <q-input dense v-model="book.notes" label="Notatka" type="textarea" />

          <div align="right">
            <q-btn label="Submit" type="submit" color="positive" outline />
            <q-btn label="Reset" type="reset" color="primary" outline class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style>
#add-form {
  margin: auto;
}

.card-form {
  background-color: rgb(255, 255, 255, 0.5);
}

.card-title {
  font-size: x-large;
}
</style>
