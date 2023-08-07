<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});

const router = useRouter();
const route = useRoute();

const quote = ref({
  bookTitle: route.query.source || '',
  authors: route.query.authors?.split(',') || [],
  text: '',
  tags: [],
});

async function onSubmit() {
  const quoteToSave = {
    bookTitle: quote.value.bookTitle,
    authors: quote.value.authors.join(','),
    text: quote.value.text,
    tags: quote.value.tags?.join(','),
    bookId: route.query.bookid || null,
  };

  const response = await useFetch('/api/quote/add', {
    method: 'POST',
    body: quoteToSave,
  });

  const sharedState = useState('quoteAlert', () => ({
    isVisible: true,
    message: 'Cytat została dodany',
  }));

  router.push({
    path: '/quotes',
  });
}

const onReset = async () => {
  quote.value.bookTitle = '';
  quote.value.authors = [];
  quote.value.text = '';
  quote.value.tags = [];
};

const { searchHintsBundle, prepareSearchHints } = await useQuoteSearchHints();
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

onMounted(() => {
  useMeta({
    title: 'Dodaj cytat',
  });
});
</script>

<template>
  <div class="q-pa-md" id="add-form" style="max-width: 800px">
    <q-card class="card-form" flat bordered>
      <div class="q-mx-md row no-wrap items-center">
        <div class="card-title">Dodaj cytat</div>
      </div>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
          <q-select
            class="q-py-none"
            v-model="quote.bookTitle"
            dense
            :options="searchHints"
            use-input
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.bookTitles)"
            new-value-mode="add-unique"
            label="Źródło"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Pole wymagane']"
          />

          <q-select
            class="q-py-none"
            v-model="quote.authors"
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
            v-model="quote.tags"
            multiple
            dense
            :options="searchHints"
            use-input
            use-chips
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.tags)"
            new-value-mode="add-unique"
            label="Tagi"
          />

          <q-input dense v-model="quote.text" label="Cytat" type="textarea" />

          <div align="right">
            <q-btn label="Dodaj" type="submit" color="positive" outline />
            <q-btn label="Resetuj" type="reset" color="primary" outline class="q-ml-sm" />
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
  border-radius: 25px;
}

.card-title {
  font-size: x-large;
}
</style>
