<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const bookid = ref(route.params.bookid);
const { data: fetchedBook } = await useFetch(`/api/book/${bookid.value}`);
const coverOptions = ['twarda', 'miękka', 'zintegrowana', 'inna'];
const formatOptions = ['książka papierowa', 'ebook', 'audiobook', 'inny'];
const { parsedData, getLcData } = useLubimyCzytac();
const isUploadVisible = ref(false);
const imageFile = ref(null);
const imgurResponse = ref('');

const book = ref({
  title: fetchedBook.value.title,
  authors: fetchedBook.value.authors?.split(','),
  publisher: fetchedBook.value.publisher,
  publicationDate: fetchedBook.value.publicationDate,
  pages: fetchedBook.value.pages,
  cover: fetchedBook.value.cover,
  purchasePrice: fetchedBook.value.purchasePrice?.toFixed(2),
  retailPrice: fetchedBook.value.retailPrice?.toFixed(2),
  read: fetchedBook.value.read,
  purchaseDate: new Date(fetchedBook.value.purchaseDate)?.toISOString().slice(0, 10).replaceAll('-', '/'),
  translators: fetchedBook.value.translators?.split(','),
  originalTitle: fetchedBook.value.originalTitle,
  tags: fetchedBook.value.tags?.split(','),
  series: fetchedBook.value.series,
  seriesVol: fetchedBook.value.seriesVol,
  publSeries: fetchedBook.value.publSeries,
  lcNote: fetchedBook.value.lcNote?.toFixed(2),
  lcUrl: fetchedBook.value.lcUrl,
  isbn: fetchedBook.value.isbn,
  notes: fetchedBook.value.notes,
  description: fetchedBook.value.description,
  format: fetchedBook.value.format,
  language: fetchedBook.value.language,
  image: fetchedBook.value.image,
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

  const response = await useFetch(`/api/book/edit/${bookid.value}`, {
    method: 'PATCH',
    body: bookToSave,
  });

  const sharedState = useState('alert', () => ({
    isVisible: true,
    message: `Książka '${book.value.title}' została edytowana`,
  }));
  router.push(`/book/${bookid.value}`);
}

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
  lcUrl: '',
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
  lcBookData.value.publicationDate = +parsedData.value.publicationDate?.slice(0, 4);
  lcBookData.value.pages = +parsedData.value.pages;
  lcBookData.value.translators = parsedData.value.translators;
  lcBookData.value.originalTitle = parsedData.value.originalTitle;
  lcBookData.value.description = parsedData.value.description;
  lcBookData.value.tags = !!parsedData.value.tags ? parsedData.value.category.concat(parsedData.value.tags) : parsedData.value.category;
  lcBookData.value.series = parsedData.value.series?.split(' (tom ')[0];
  lcBookData.value.seriesVol = parsedData.value.series ? +parsedData.value.series?.split(' (tom ')[1].slice(0, -1) : null;
  lcBookData.value.publSeries = parsedData.value.publSeries;
  lcBookData.value.isbn = parsedData.value.isbn;
  lcBookData.value.lcNote = (+parsedData.value.note).toFixed(2);
  lcBookData.value.lcUrl = lcUrl.value;
  lcBookData.value.isbn = parsedData.value.isbn;
  lcBookData.value.image = parsedData.value.image;

  isLcFormVisible.value = true;
}

function overrideField(fieldName: String) {
  // @ts-ignore
  book.value[fieldName] = lcBookData.value[fieldName];
}

function overrideSeries() {
  book.value.series = lcBookData.value.series;
  book.value.seriesVol = lcBookData.value.seriesVol;
}

function addTagsToForm() {
  book.value.tags = book.value.tags.concat(lcBookData.value.tags);
}

const onReset = async () => {
  console.log('reset');
  isLcFormVisible.value = !isLcFormVisible.value;
};

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
    title: `Edytuj - ${book.value.title.slice(0, 20)}...`,
  });
});
</script>

<template>
  <div class="q-pa-md" id="form" style="max-width: 800px">
    <q-card class="card-form" flat bordered>
      <div class="q-mx-md row no-wrap items-center">
        <div class="card-title">Edytuj książkę</div>

        <q-space />

        <!-- <q-btn class="q-ma-sm" color="orange-7" outline flat label="Pobierz z LC"> -->
        <q-btn class="q-ma-sm" color="orange-10" outline label="Pobierz z LC">
          <q-popup-proxy :offset="[377, 0]">
            <q-card class="q-pa-md" style="width: 500px">
              <q-input dense v-model="lcUrl" label="link do pozycji w LubimyCzytac.pl" />
              <div class="text-right">
                <q-btn class="q-mt-lg" outline color="gray-8" label="pobierz" @click="onLoadFromLC()"></q-btn>
              </div>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </div>

      <q-slide-transition>
        <q-card-section v-show="isLcFormVisible" class="q-gutter-sm">
          <q-field filled label="Tytuł" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.title }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('title')">
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
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('authors')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Wydawca" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.publisher }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('publisher')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field v-if="lcBookData.translators" filled label="Tłumacz" stack-label dense>
            <template v-slot:control>
              <!-- <div>{{ lcBookData.authors }}</div> -->
              <q-chip v-for="translator in lcBookData.translators">{{ translator }}</q-chip>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('translators')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field v-if="lcBookData.originalTitle" filled label="Tytuł oryginalny" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.originalTitle }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('originalTitle')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field v-if="lcBookData.series" filled label="Cykl" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.series }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideSeries()">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field v-if="lcBookData.publSeries" filled label="Seria" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.publSeries }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('publSeries')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="ISBN" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.isbn }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('isbn')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Liczba stron" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.pages }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('pages')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Rok publikacji" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.publicationDate }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('publicationDate')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Ocena LC" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.lcNote }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('lcNote')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Link do okładki" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.image }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('image')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Link do LubimyCzytac.pl" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.lcUrl }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('lcUrl')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Tagi" stack-label dense>
            <template v-slot:control>
              <q-chip v-for="tag in lcBookData.tags">{{ tag }}</q-chip>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="addTagsToForm()">
                <q-tooltip class="text-body2"> Dodaj do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <q-field filled label="Opis" stack-label dense>
            <template v-slot:control>
              <div>{{ lcBookData.description }}</div>
            </template>
            <template v-slot:after>
              <q-btn round dense flat icon="assignment_returned" @click="overrideField('description')">
                <q-tooltip class="text-body2"> Przenieś do formularza </q-tooltip>
              </q-btn>
            </template>
          </q-field>

          <div align="right">
            <q-btn class="fd" outline color="grey-8">
              <div>Przenieś wszystko</div>
              <q-space />
              <q-icon name="assignment_returned" />
            </q-btn>
          </div>
        </q-card-section>
      </q-slide-transition>

      <q-separator></q-separator>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
            stack-label
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
            use-chips
            stack-label
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.publishers)"
            new-value-mode="add-unique"
            label="Wydawca"
          />

          <q-select
            v-model="book.translators"
            multiple
            dense
            :options="searchHints"
            use-input
            use-chips
            stack-label
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
                use-chips
                stack-label
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
            use-chips
            stack-label
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
              <q-input dense v-model="book.lcNote" label="Ocena LC" mask="#.##" fill-mask="0" />
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
            stack-label
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.tags)"
            new-value-mode="add-unique"
            label="Tagi"
          />

          <div class="row no-wrap">
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
            <q-btn label="Potwierdź" type="submit" color="positive" outline />
            <q-btn label="Wyczyść" type="reset" color="primary" outline class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss">
#form {
  margin: auto;
}

.card-form {
  background-color: rgb(255, 255, 255, 0.5);
}

.card-title {
  font-size: x-large;
}

.q-field__bottom {
  // display: none;
  height: 1px;
  // background-color: red;
}
</style>
