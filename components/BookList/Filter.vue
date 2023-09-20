<script setup lang="ts">
const props = defineProps(['books']);
const emit = defineEmits(['filterOptionsChanged']);
const route = useRoute();
const searchParam = route.params.param as String;
const formatOptions = ['książka papierowa', 'ebook', 'audiobook', 'inny'];

const filterOptions = ref({
  title: '',
  authors: '',
  translators: '',
  publisher: '',
  series: null,
  publSeries: null,
  isbn: '',
  format: '',
  language: '',
  purchaseDateFrom: null,
  purchaseDateTo: null,
  publicationYearFrom: null,
  publicationYearTo: null,
  tags: [],
  readStatus: {
    read: true,
    notRead: true,
  },
});

const filterByPurchaseDate = ref(false);
const filterByPublicationYear = ref(false);
const advFilterVisible = ref(false);

const { searchHintsBundle, prepareSearchHints } = useBookSearchHints();
prepareSearchHints(props.books);

const searchHints = ref([]);

function filterFn(val, update, hints) {
  update(() => {
    if (val === '') {
      searchHints.value = hints;
    } else {
      const needle = val.toLowerCase();
      searchHints.value = hints.filter((hint) => hint?.value.toLowerCase().indexOf(needle) > -1);
    }
  });
}

onMounted(() => {
  const splittedParam = searchParam.split('=');
  switch (splittedParam[0]) {
    case 'aut':
      filterOptions.value.authors = splittedParam[1];
      break;
    case 'tra':
      filterOptions.value.translators = splittedParam[1];
      break;
    case 'tag':
      filterOptions.value.tags = new Array(splittedParam[1]);
      break;
    case 'series':
      filterOptions.value.series = splittedParam[1];
      break;
    case 'publSeries':
      filterOptions.value.publSeries = splittedParam[1];
      break;
    default:
      filterOptions.value.title = splittedParam[0];
  }
});

watch(filterByPublicationYear, () => {
  filterOptions.value.publicationYearFrom = null;
  filterOptions.value.publicationYearTo = null;
});

watch(filterByPurchaseDate, () => {
  filterOptions.value.purchaseDateFrom = null;
  filterOptions.value.purchaseDateTo = null;
});

watch(filterOptions.value, () => {
  emit('filterOptionsChanged', filterOptions.value);
});
</script>

<template>
  <q-card class="q-pa-none" id="filter-base-card">
    <q-card-section class="q-pb-none row justify-center q-gutter-x-sm">
      <q-input class="col-12 col-sm" dense v-model="filterOptions.title" debounce="500" label="Tytuł" />
      <q-select
        class="col-12 col-sm"
        v-model="filterOptions.authors"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.authors)"
        label="Autor"
        emit-value
      />
      <q-select
        class="col-12 col-sm"
        v-model="filterOptions.publisher"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.publishers)"
        label="Wydawca"
        emit-value
      />
    </q-card-section>

    <q-slide-transition>
      <div v-if="advFilterVisible">
        <q-card-section class="q-py-none row justify-center q-gutter-x-sm">
          <q-select
            class="col-12 col-sm"
            v-model="filterOptions.translators"
            dense
            clearable
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.translators)"
            label="Tłumacz"
            emit-value
          />
          <q-select
            class="col-12 col-sm"
            v-model="filterOptions.series"
            dense
            clearable
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.series)"
            new-value-mode="add-unique"
            label="Cykl"
            emit-value
          />

          <q-select
            class="col-12 col-sm"
            v-model="filterOptions.publSeries"
            dense
            clearable
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.publSeries)"
            new-value-mode="add-unique"
            label="Seria"
            emit-value
          />
        </q-card-section>

        <q-card-section class="q-py-none row justify-center q-gutter-x-sm">
          <q-input class="col-12 col-sm" dense debounce="500" v-model="filterOptions.isbn" type="number" label="ISBN" />
          <q-select
            class="col-12 col-sm"
            v-model="filterOptions.format"
            dense
            clearable
            :options="formatOptions"
            use-input
            @filter="(val, update) => filterFn(val, update, formatOptions)"
            label="Format"
          />
          <q-select
            class="col-12 col-sm"
            v-model="filterOptions.language"
            dense
            clearable
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.languages)"
            new-value-mode="add-unique"
            label="Język"
          />
        </q-card-section>
      </div>
    </q-slide-transition>

    <q-card-section class="q-py-none row justify-center q-gutter-x-sm">
      <q-select
        class="col-12 col-sm"
        v-model="filterOptions.tags"
        multiple
        dense
        :options="searchHints"
        use-input
        use-chips
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.tags)"
        new-value-mode="add-unique"
        label="Tagi"
        emit-value
      />
    </q-card-section>

    <q-slide-transition>
      <div v-if="advFilterVisible">
        <q-card-section class="q-py-sm row q-gutter-x-sm">
          <div>
            <q-checkbox v-model="filterByPublicationYear" label="Filtruj po roku publikacji" />
          </div>

          <div class="row">
            <q-input
              class="col q-mx-md"
              filled
              dense
              type="number"
              debounce="500"
              :disable="!filterByPublicationYear"
              v-model="filterOptions.publicationYearFrom"
              label="Od"
              style="max-width: 233px"
            >
            </q-input>
            <q-input
              class="col"
              filled
              dense
              type="number"
              debounce="500"
              :disable="!filterByPublicationYear"
              v-model="filterOptions.publicationYearTo"
              label="Do"
              style="max-width: 233px"
            >
            </q-input>
          </div>
        </q-card-section>

        <q-card-section class="q-py-none row q-gutter-x-sm">
          <div>
            <q-checkbox v-model="filterByPurchaseDate" label="Filtruj po dacie zakupu" />
          </div>

          <div class="row">
            <q-input
              class="col q-mx-md q-pb-none"
              filled
              dense
              :disable="!filterByPurchaseDate"
              v-model="filterOptions.purchaseDateFrom"
              mask="date"
              :rules="['date']"
              label="Od"
              style="max-width: 233px"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filterOptions.purchaseDateFrom">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              class="col"
              filled
              dense
              :disable="!filterByPurchaseDate"
              v-model="filterOptions.purchaseDateTo"
              mask="date"
              :rules="['date']"
              label="Do"
              style="max-width: 233px"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="filterOptions.purchaseDateTo">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>

    <q-card-section class="q-py-sm row q-gutter-x-sm">
      <q-checkbox v-model="filterOptions.readStatus.read" label="Przeczytana" />
      <q-checkbox v-model="filterOptions.readStatus.notRead" label="Nieprzeczytane" />
    </q-card-section>

    <div class="q-pb-sm text-center">
      <q-btn v-if="!advFilterVisible" flat round icon="expand_more" @click="advFilterVisible = true"></q-btn>
      <q-btn v-else flat round icon="expand_less" @click="advFilterVisible = false"></q-btn>
    </div>
  </q-card>
</template>

<style lang="scss">
#filter-base-card {
  margin: auto;
  max-width: 1000px;
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 25px;
}
</style>
