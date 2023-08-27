<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});

const router = useRouter();
const config = useRuntimeConfig();
const { parsedData, getLcData } = useLubimyCzytac();
const { searchHintsBundle, prepareSearchHints } = await useBookSearchHints();
prepareSearchHints();
const coverOptions = ['twarda', 'miękka', 'zintegrowana', 'inna'];
const formatOptions = ['książka papierowa', 'ebook', 'audiobook', 'inny'];
const lcUrl = ref('');
const isUploadVisible = ref(false);
const imageFile = ref(null);
const imgurResponse = ref('');
const lcError = ref(false);
const searchHints = ref([]);

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
  format: '',
  language: '',
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
    format: book.value.format,
    language: book.value.language,
    image: book.value.image || 'https://i.imgur.com/rpVYMUX.jpeg',
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
  const response = await getLcData(lcUrl.value);
  if (response?.message) {
    lcError.value = true;
  }

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
  book.value.lcNote = (+parsedData.value.note).toFixed(2);
  book.value.lcUrl = lcUrl.value;
  book.value.isbn = parsedData.value.isbn;
  book.value.image = parsedData.value.image;
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

const onReset = async () => {
  console.log('reset');
};

async function uploadFile() {
  const clientId = config.public.imgurId;
  const response = await $fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${clientId}`,
    },
    body: imageFile.value,
  });
  imgurResponse.value = response.data.link;
  book.value.image = response.data.link;
}

onMounted(() => {
  useMeta({
    title: 'Dodaj książkę',
  });
});
</script>

<template>
  <div class="q-pa-md" id="add-form" style="max-width: 800px">
    <q-card class="add-card-form" flat bordered>
      <div class="q-mx-md row no-wrap items-center">
        <div class="card-title">Dodaj książkę</div>

        <q-space />

        <q-btn class="q-ma-sm" color="orange-10" outline label="Pobierz z LC">
          <q-popup-proxy :offset="[377, 0]">
            <q-card class="q-pa-md" style="width: 500px">
              <q-input dense v-model="lcUrl" label="link do pozycji w LubimyCzytac.pl" />
              <div class="text-right">
                <q-btn class="q-mt-lg" outline color="grey-8" label="pobierz" @click="onLoadFromLC()"></q-btn>
              </div>
              <div v-if="lcError" class="dsad text-red">Dane mogą być niekompletne</div>
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

          <div class="q-pt-xs row">
            <div class="col">
              <q-select dense v-model="book.format" label="Format" :options="formatOptions" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-select dense v-model="book.cover" label="Rodzaj okładki" :options="coverOptions" />
            </div>

            <div class="col-1"></div>
            <div class="col">
              <q-input
                dense
                type="number"
                v-model="book.pages"
                label="Liczba stron"
                lazy-rules
                :rules="[(val) => (val > 0 && val < 9999) || 'Wprowadź prawidłową liczbę']"
              />
            </div>
          </div>

          <div class="q-mt-none row">
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

          <div class="q-mt-md row">
            <div class="col">
              <q-input dense type="number" v-model="book.isbn" label="ISBN" />
            </div>
            <div class="col-1"></div>
            <div class="col">
              <q-select
                v-model="book.language"
                dense
                :options="searchHints"
                use-input
                @filter="(val, update) => filterFn(val, update, searchHintsBundle.languages)"
                new-value-mode="add-unique"
                label="Język"
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

          <div class="q-mt-none row items-center text-center">
            <div class="col">
              <q-input dense type="url" v-model="book.image" label="Link do okładki" />
            </div>
            <div class="col-1">
              <q-btn outline color="grey-8" padding="xs" icon="add" @click="isUploadVisible = !isUploadVisible">
                <q-tooltip>Dodaj własną okładkę</q-tooltip>
              </q-btn>
            </div>
          </div>

          <q-slide-transition>
            <q-card-section class="row flex upload-section" v-show="isUploadVisible">
              <div class="q-gutter-sm" style="min-width: 300px">
                <div class="q-gutter-y-md column">
                  <q-file color="text-black" v-model="imageFile" label="Wybierz plik">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                  <q-btn @click="uploadFile" :disabled="!imageFile">Upload </q-btn>
                </div>
                <!-- <q-field filled label="Link do okładki" stack-label dense>
                  <template v-slot:control>
                    <div>{{ imgurResponse }}</div>
                  </template>
                  <template v-slot:after>
                    <q-btn round dense flat icon="assignment_returned" :disabled="!imageFile" @click="book.image = imgurResponse">
                      <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
                    </q-btn>
                  </template>
                </q-field> -->
              </div>
              <q-img v-if="imgurResponse" class="q-mx-lg" :src="imgurResponse" width="150px" />
            </q-card-section>
          </q-slide-transition>

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

          <div class="q-gutter-sm" align="right">
            <q-btn label="potwierdź" type="submit" color="positive" outline />
            <q-btn label="wyczyść" type="reset" color="primary" outline class="q-ml-sm" />
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

.add-card-form {
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: 25px;
}

.upload-section {
  background-color: rgba(168, 170, 172, 0.226);
  border-radius: 5px;
}

.card-title {
  font-size: x-large;
}
</style>
