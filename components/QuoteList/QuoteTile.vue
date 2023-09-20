<script setup lang="ts">
const props = defineProps(['quote', 'textSearchPhrase']);
const emit = defineEmits(['quoteDeleted']);
const router = useRouter();
const quote = props.quote;
const deleteModalOpen = ref(false);
const { isAdmin, authorize } = useAuth();
authorize();

function prepareQuoteText(text: String) {
  let convertedText = text;
  convertedText = convertNewLines(text);
  convertedText = props.textSearchPhrase ? highlightSearchePhrase(convertedText) : convertedText;
  return convertedText;
}

function convertNewLines(text: String) {
  return text?.replaceAll('\r\n', '<br />').replaceAll('\n', '<br />');
}

function highlightSearchePhrase(text: String) {
  if (props.textSearchPhrase) {
    const index = text.toLowerCase().indexOf(props.textSearchPhrase.toLowerCase());

    const textWithHighlight =
      String(text).substring(0, index) +
      '<mark>' +
      String(text).substring(index, index + props.textSearchPhrase.length) +
      '</mark>' +
      String(text).substring(index + props.textSearchPhrase.length);

    return textWithHighlight;
  }
  return text;
}

async function handleDelete() {
  const response = await useFetch(`/api/quote/delete/${quote._id}`, {
    method: 'DELETE',
  });
  const sharedState = useState('quoteAlert', () => ({
    isVisible: true,
    message: 'Cytat został usunięty',
  }));
  emit('quoteDeleted', quote._id);
  router.push('/quotes');
}

function copyToClipboard() {
  navigator.clipboard.writeText(quote.text);
}
</script>

<template>
  <q-card id="quote-card" bordered>
    <div class="q-my-sms">
      <div class="row flex no-wrap">
        <div class="col row flex">
          <div class="q-mx-md q-mt-sm">
            <q-card-section class="q-pa-xs">
              <router-link class="title-link" :to="`/quotes/source=${quote.bookTitle}`"
                ><div class="text-body1">{{ quote.bookTitle }}</div></router-link
              >
              <div class="chip-col-right">
                <span v-for="author in quote.authors.split(',')" :key="author">
                  <router-link class="link" :to="`/quotes/author=${author}`">
                    <q-chip dense clickable size="md">
                      {{ author }}
                    </q-chip>
                  </router-link>
                </span>
              </div>
            </q-card-section>
          </div>
        </div>

        <div class="col-auto"><q-icon name="format_quote" size="xl" color="grey-6" /></div>
      </div>

      <q-card-section class="text-area">
        <div class="text" v-html="prepareQuoteText(quote.text)"></div>
      </q-card-section>

      <q-card-section class="q-py-xs">
        <div class="row items-center text-bold">
          <div class="col-auto" id="tag-icon">
            <q-icon name="tag" size="sm"></q-icon>
          </div>
          <div class="col">
            <span v-for="tag in quote.tags.split(',')" :key="tag">
              <router-link class="link" :to="`/quotes/tag=${tag}`">
                <q-chip dense clickable size="md">
                  {{ tag }}
                </q-chip>
              </router-link>
            </span>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <div class="row no-wrap"></div>
        <div v-if="isAdmin">
          <q-btn icon="delete" flat round color="negative" @click="deleteModalOpen = !deleteModalOpen"></q-btn>
          <q-btn icon="edit" flat round color="positive" :to="`/quote/edit/${quote._id}`"></q-btn>
        </div>
        <div>
          <q-btn icon="content_copy" flat round color="grey-7" @click="copyToClipboard">
            <q-tooltip>Kopiuj do schowka</q-tooltip>
          </q-btn>
          <q-btn v-if="quote.bookId" icon="menu_book" flat round color="grey-7" :to="`/book/${quote.bookId}`">
            <q-tooltip>Przejdź do źródła</q-tooltip>
          </q-btn>
        </div>
      </q-card-actions>
    </div>
  </q-card>

  <q-dialog v-model="deleteModalOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="primary" text-color="white" />
        <span class="q-ml-sm">Na pewno? Usuniętego cytatu nie można przywrócić.</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Wróć" color="primary" v-close-popup />
        <q-btn @click="handleDelete" flat label="Usuń" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
#quote-card {
  margin: auto;
  max-width: 750px;
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 25px;
}

.title-link {
  text-decoration: none;
  color: rgb(43, 42, 42);
}

.title-link:hover {
  color: #0e68c9;
}

.chip-col-right {
  margin-left: -7px;
}

.text-area {
  font-size: large;
}
</style>
