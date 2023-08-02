<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const bookid = ref(route.params.bookid);
const { data: book } = await useFetch(`/api/book/${bookid.value}`);
const tags = 'filozofia,pytania,popularnonaukowa';

const deleteModalOpen = ref(false);

const editUrl = `/book/edit/${book.value._id}`;

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
</script>

<template>
  <!-- <div>{{ book.seriesVol }}</div> -->
  <div class="q-py-lg">
    <q-card class="q-my-xs" id="base-card" flat bordered>
      <div class="q-my-lg" ref="div">
        <div class="row flex justify-center">
          <div class="q-mx-md text-center">
            <q-img id="img-book-details" class="rounded-borders" :src="book.image" />
          </div>

          <div class="q-mx-md book-details-data-container">
            <q-card-section class="q-pa-xs">
              <div class="text-h5">{{ book.title }}</div>
              <div class="text-h6">{{ book.authors }}</div>
            </q-card-section>

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4" id="tag-icon">Wydawnictwo:</div>
                <div class="col text-bold">{{ book.publisher }}</div>
              </div>
              <div v-if="book.series" class="row items-center">
                <div class="col-4" id="tag-icon">Seria:</div>
                <div class="col text-bold">{{ book.publSeries }}</div>
              </div>
              <div v-if="book.publSeries" class="row items-center">
                <div class="col-4" id="tag-icon">Cykl:</div>
                <div class="col text-bold">{{ book.series }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Ocena LC:</div>
                <div class="col text-bold">{{ book.lcNote }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Stron:</div>
                <div class="col text-bold">{{ book.pages }}</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4" id="tag-icon">Tytuł oryginału:</div>
                <div class="col text-bold">{{ book.originalTitle }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Rok wydania:</div>
                <div class="col text-bold">{{ book.publicationDate }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">ISBN:</div>
                <div class="col text-bold">{{ book.isbn }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Tłumacz:</div>
                <div class="col text-bold">{{ book.translators }}</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4">Okładka:</div>
                <div class="col text-bold">{{ book.cover }}</div>
              </div>
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
                <!-- <router-link class="link" :to="`/search/${tag}`">
                                <q-chip dense clickable size="md">
                                    {{ tag }}
                                </q-chip>
                            </router-link> -->
                <q-chip dense clickable size="md">
                  {{ tag }}
                </q-chip>
              </span>
            </div>
          </div>
        </q-card-section>

        <q-card-section v-if="book.description">
          <div class="text-h6" style="white-space: pre-line">Opis</div>
          <div v-html="prepareDescription(book.description)"></div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="red" @click="onDeleteButton"> usuń </q-btn>
          <q-btn flat color="green" :to="editUrl"> edytuj </q-btn>
          <q-btn flat color="primary"> dodaj cytat </q-btn>
        </q-card-actions>
      </div>
    </q-card>
    <q-dialog v-model="deleteModalOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Na pewno? Usuniętej książki nie można przywrócić.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Wróć" color="primary" v-close-popup />
          <q-btn @click="handleDelete" flat label="Usuń" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss">
#img-book-details {
  width: 300px;
  border: 10px solid rgb(48, 52, 54);
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}

.book-details-data-container {
  width: max(400px, calc(100% - 400px));
}

$primary: red;
</style>
