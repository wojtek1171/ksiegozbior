<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const bookid = ref(route.params.bookid);
const { data: book } = await useFetch(`/api/book/${bookid.value}`);
const { data: quotes } = await useFetch(`/api/quotes/by_book_id/${bookid.value}`);

const deleteModalOpen = ref(false);

const { isAdmin, authorize } = useAuth();
authorize();

function onDeleteButton() {
  deleteModalOpen.value = true;
}

function prepareDescription(desc: String) {
  return desc?.replaceAll('\r\n', '<br />').replaceAll('\n', '<br />');
}

async function handleDelete() {
  const response = await useFetch(`/api/book/delete/${book.value._id}`, {
    method: 'DELETE',
  });
  const sharedState = useState('alert', () => ({
    isVisible: true,
    message: `Książka ${book.value.title} została usunięta`,
  }));
  router.push('/books');
}

onMounted(() => {
  useMeta({
    title: `${book.value.title.length > 20 ? book.value.title.slice(0, 20) + '...' : book.value.title} - ${book.value.authors.slice(0, 20)}`,
  });
});
</script>

<template>
  <div class="q-py-lg">
    <q-card class="q-my-xs" id="base-card" bordered>
      <div v-if="book.read" class="q-pa-mds badge"><q-icon name="check_circle" size="xs" color="positive" /></div>
      <div class="q-my-lg" ref="div">
        <div class="row flex justify-center">
          <div class="q-mx-md text-center">
            <q-img id="img-book-details" class="rounded-borders" :src="book.image" />
          </div>

          <div class="q-mx-md book-details-data-container">
            <q-card-section class="q-pa-xs">
              <div class="text-h5">{{ book.title }}</div>
              <div class="chip-col-right">
                <span v-for="author in book.authors.split(',')" :key="author">
                  <router-link class="link" :to="`/books/aut=${author}`">
                    <q-chip dense clickable size="lg">
                      {{ author }}
                    </q-chip>
                  </router-link>
                </span>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4" id="tag-icon">Wydawnictwo:</div>
                <div class="col text-bold">{{ book.publisher }}</div>
              </div>
              <div v-if="book.publSeries" class="row items-center">
                <div class="col-4" id="tag-icon">Seria:</div>
                <div class="col chip-col-right">
                  <router-link class="link" :to="`/books/publSeries=${book.publSeries}`">
                    <q-chip dense clickable size="md">
                      {{ book.publSeries }}
                    </q-chip>
                  </router-link>
                </div>
              </div>
              <div v-if="book.series" class="row items-center">
                <div class="col-4" id="tag-icon">Cykl:</div>
                <div class="col chip-col-right">
                  <router-link class="link" :to="`/books/series=${book.series}`">
                    <q-chip dense clickable size="md">
                      {{ book.series }}
                    </q-chip>
                  </router-link>
                  <span class="items-center">Tom {{ book.seriesVol }}</span>
                </div>
              </div>
              <div v-if="book.originalTitle" class="row">
                <div class="col-4" id="tag-icon">Tytuł oryginału:</div>
                <div class="col text-bold">{{ book.originalTitle }}</div>
              </div>
              <div v-if="book.translators" class="row items-center">
                <div class="col-4" id="tag-icon">Tłumacz:</div>
                <div class="col chip-col-right">
                  <span v-for="translator in book.translators.split(',')" :key="translator">
                    <router-link class="link" :to="`/books/tra=${translator}`">
                      <q-chip dense clickable size="md">
                        {{ translator }}
                      </q-chip>
                    </router-link>
                  </span>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-xs">
              <div v-if="book.lcNote" class="row items-center">
                <div class="col-4" id="tag-icon">Ocena LC:</div>
                <div class="col flex items-center text-bold">{{ book.lcNote }} <q-icon class="q-ml-xs" name="star" /></div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Stron:</div>
                <div class="col text-bold">{{ book.pages }}</div>
              </div>
              <div class="row">
                <div class="col-4">Okładka:</div>
                <div class="col text-bold">{{ book.cover }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Rok wydania:</div>
                <div class="col text-bold">{{ book.publicationDate }}</div>
              </div>
              <div v-if="book.isbn" class="row items-center">
                <div class="col-4" id="tag-icon">ISBN:</div>
                <div class="col text-bold">{{ book.isbn }}</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4">Cena zakupu:</div>
                <div class="col text-bold">{{ book.purchasePrice }} zł</div>
              </div>
              <div class="row">
                <div class="col-4">Cena detaliczna:</div>
                <div class="col text-bold">{{ book.retailPrice }} zł</div>
              </div>
              <div class="row">
                <div class="col-4">Data zakupu:</div>
                <div class="col text-bold">{{ book.purchaseDate.slice(0, 10) }}</div>
              </div>
              <div class="row">
                <div class="col-4">Przeczytana:</div>
                <div class="col text-bold">{{ book.read ? 'Tak' : 'Nie' }}</div>
              </div>
            </q-card-section>
          </div>
        </div>
        <q-separator class="q-mt-md"></q-separator>

        <q-card-section class="q-py-xs">
          <div class="row items-center text-bold">
            <div class="col-auto" id="tag-icon">
              <q-icon name="tag" size="sm"></q-icon>
            </div>
            <div class="col text-bold">
              <span v-for="tag in book.tags.split(',')" :key="tag">
                <router-link class="link" :to="`/books/tag=${tag}`">
                  <q-chip dense clickable size="md">
                    {{ tag }}
                  </q-chip>
                </router-link>
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-section v-if="book.description">
          <div class="text-h6" style="white-space: pre-line">Opis</div>
          <div v-html="prepareDescription(book.description)"></div>
        </q-card-section>

        <q-card-section v-if="book.notes">
          <div class="text-h6" style="white-space: pre-line">Notatki</div>
          <div v-html="prepareDescription(book.notes)"></div>
        </q-card-section>

        <div class="row no-wrap" style="height: 40px">
          <q-btn :href="book.lcUrl" target="_blank" class="q-ml-sm" round flat>
            <q-avatar size="30px">
              <q-tooltip>Przejdź do LubimyCzytac.pl</q-tooltip>
              <img src="../assets/pics/lc-logo.png" />
            </q-avatar>
          </q-btn>
          <q-space></q-space>

          <q-card-actions v-if="isAdmin" align="right">
            <q-btn outline color="red" @click="onDeleteButton"> usuń </q-btn>
            <q-btn outline color="green" :to="`/book/edit/${book._id}`"> edytuj </q-btn>
            <q-btn outline color="primary" :to="`/quote/add?bookid=${book._id}&source=${book.title}&authors=${book.authors}`">
              dodaj cytat
            </q-btn>
          </q-card-actions>
        </div>
      </div>
    </q-card>

    <q-separator class="q-my-md" />

    <div v-if="quotes.length > 0">
      <div class="text-h5 text-center">Cytaty</div>

      <div class="q-mt-md" v-for="quote in quotes">
        <QuoteListQuoteTile :key="quote._id" :quote="quote" />
      </div>
    </div>

    <q-dialog v-model="deleteModalOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Na pewno? Usuniętej książki nie można przywrócić.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Wróć" color="primary" v-close-popup />
          <q-btn @click="handleDelete" flat label="Usuń" color="positive" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss">
#img-book-details {
  width: 300px;
  // border: 7px solid rgb(27, 56, 70);
  border-radius: 12px;
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}

.book-details-data-container {
  width: max(400px, calc(100% - 400px));
}

.chip-col-right {
  margin-left: -7px;
}

.badge {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
