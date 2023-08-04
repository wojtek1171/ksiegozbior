<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const quoteid = ref(route.params.quoteid);
const { data: fetchedQuote } = await useFetch(`/api/quote/${quoteid.value}`);

const quote = ref({
  bookTitle: fetchedQuote.value.bookTitle,
  authors: fetchedQuote.value.authors?.split(','),
  text: fetchedQuote.value.text,
  tags: fetchedQuote.value.tags?.split(','),
});

async function onSubmit() {
  const quoteToSave = {
    bookTitle: quote.value.bookTitle,
    authors: quote.value.authors.join(','),
    text: quote.value.text,
    tags: quote.value.tags?.join(','),
  };

  const response = await useFetch(`/api/quote/edit/${quoteid.value}`, {
    method: 'PATCH',
    body: quoteToSave,
  });

  const sharedState = useState('quoteAlert', () => ({
    isVisible: true,
    message: 'Cytat został edytowany',
  }));
  router.push('/quotes');
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
    title: 'Edytuj cytat',
  });
});
</script>

<template>
  <div class="q-pa-md" id="form" style="max-width: 800px">
    <q-card class="card-form" flat bordered>
      <div class="q-mx-md row no-wrap items-center">
        <div class="card-title">Edytuj cytat</div>
      </div>

      <q-separator></q-separator>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-select
            class="q-py-none"
            v-model="quote.bookTitle"
            multiple
            dense
            :options="searchHints"
            use-input
            use-chips
            stack-label
            @filter="(val, update) => filterFn(val, update, searchHintsBundle.authors)"
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
            stack-label
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
            stack-label
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
</style>
