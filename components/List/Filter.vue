<script setup lang="ts">
const emit = defineEmits(['filterOptionsChanged']);

const filterOptions = ref({
  title: '',
  authors: null,
  translators: '',
  publisher: '',
  series: null,
  publSeries: null,
  isbn: '',
  purchaseDateFrom: '',
  purchaseDateTo: '',
  publicationYearFrom: '',
  publicationYearTo: '',
  tags: [],
  read: true,
  notRead: true,
});

const filterByPurchaseDate = ref(false);
const filterByPublicationYear = ref(false);

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

watch(filterOptions.value, () => {
  emit('filterOptionsChanged', filterOptions.value);
});
</script>

<template>
  <div>{{ typeof filterOptions.isbn }}</div>
  <div class="q-ma-md text-h3 text-center">Księgozbiór</div>

  <q-card class="q-pa-sm" id="filter-base-card">
    <div class="row flex justify-between q-gutter-md" id="filter-row">
      <q-input dense v-model="filterOptions.title" debounce="500" label="Tytuł" />
      <q-select
        v-model="filterOptions.authors"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.authors)"
        label="Autor"
      />
      <q-select
        v-model="filterOptions.publisher"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.publishers)"
        label="Wydawca"
      />
      <q-select
        v-model="filterOptions.translators"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.translators)"
        label="Tłumacz"
      />
      <!-- <q-input dense v-model="filterOptions.authors" label="Autor" /> -->
      <!-- <q-input dense v-model="filterOptions.publisher" label="Wydawca" /> -->
      <!-- <q-input dense v-model="filterOptions.translators" label="Tłumacz" /> -->
    </div>

    <div class="row flex justify-start q-gutter-md">
      <q-select
        v-model="filterOptions.series"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.series)"
        new-value-mode="add-unique"
        label="Cykl"
      />

      <q-select
        v-model="filterOptions.publSeries"
        dense
        clearable
        :options="searchHints"
        use-input
        @filter="(val, update) => filterFn(val, update, searchHintsBundle.publSeries)"
        new-value-mode="add-unique"
        label="Seria"
      />
      <q-input dense v-model="filterOptions.isbn" type="number" label="ISBN" />
    </div>

    <q-select
      v-model="filterOptions.tags"
      multiple
      dense
      :options="searchHints"
      use-input
      use-chips
      @filter="(val, update) => filterFn(val, update, searchHintsBundle.tags)"
      new-value-mode="add-unique"
      label="Tagi"
    />

    <div class="q-mt-xs row flex justify-start q-gutter-md">
      <q-checkbox v-model="filterByPublicationYear" label="Filtruj po roku publikacji" />
      <q-input
        filled
        dense
        :disable="!filterByPublicationYear"
        v-model="filterOptions.publicationYearFrom"
        mask="date"
        :rules="['date']"
        label="Od"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="filterOptions.publicationYearFrom">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        dense
        :disable="!filterByPublicationYear"
        v-model="filterOptions.publicationYearTo"
        mask="date"
        :rules="['date']"
        label="Do"
        class="float-right"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="filterOptions.publicationYearTo">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="row flex justify-start q-gutter-md">
      <q-checkbox v-model="filterByPurchaseDate" label="Filtruj po dacie zakupu" />
      <q-input
        filled
        dense
        :disable="!filterByPurchaseDate"
        v-model="filterOptions.purchaseDateFrom"
        mask="date"
        :rules="['date']"
        label="Od"
        style="max-width: 800px"
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
        filled
        dense
        :disable="!filterByPurchaseDate"
        v-model="filterOptions.purchaseDateTo"
        mask="date"
        :rules="['date']"
        label="Do"
        style="max-width: 800px"
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

    <q-checkbox v-model="filterOptions.read" label="Przeczytana" />
    <q-checkbox v-model="filterOptions.notRead" label="Nieprzeczytane" />
  </q-card>
</template>

<style lang="scss">
#filter-base-card {
  margin: auto;
  max-width: 1000px;
  background-color: rgb(255, 255, 255, 0.2);
}

#filter-row > * {
  // width: max(400px, calc(100% - 400px));
  //width: calc(900/ 4);
}
</style>
