<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const bookid = ref(route.params.bookid);
const { data: book } = await useFetch(`/api/book/${bookid.value}`);
const tags = 'filozofia,pytania,popularnonaukowa';

let changed = ref(1);
const count = ref(0);

const div = ref(null);

const isHorizontal = ref(true);

onMounted(() => {
  if (div.value.clientWidth < 800) {
    isHorizontal.value = false;
  }
});

function testAlert2() {
  const sharedState = useState('alert', () => ({
    isVisible: true,
    message: 'Test message hejdd',
  }));
  router.push('/books');
}
</script>

<template>
  <!-- <div>{{ book }}</div> -->
  <div class="q-py-lg">
    <q-card class="q-my-xs" id="base-card" flat bordered>
      <div class="q-my-lg" ref="div">
        <div class="row flex flex-center items-center">
          <div class="q-mx-md text-center">
            <q-img id="img-book-details" class="rounded-borders" :src="book.image" />
          </div>

          <div class="q-mx-md" style="min-width: 350px; max-width: 500px">
            <q-card-section class="q-pa-xs">
              <div class="text-h5 q-mt-sm">{{ book.title }}</div>
              <div class="text-h6">{{ book.authors }}</div>
            </q-card-section>

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4" id="tag-icon">Wydawnictwo:</div>
                <div class="col">{{ book.publisher }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Seria:</div>
                <div class="col">{{ book.publSeries }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Cykl:</div>
                <div class="col">{{ book.series }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Ocena LC:</div>
                <div class="col">{{ book.note }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Stron:</div>
                <div class="col">{{ book.pages }}</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4" id="tag-icon">Tytuł oryginału:</div>
                <div class="col">Krzyzstof alterbenr wszystko pominięcie z wyjątkiem tego że nie nir tego</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Rok wydania:</div>
                <div class="col">{{ book.publicationDate }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">ISBN:</div>
                <div class="col">{{ book.isbn }}</div>
              </div>
              <div class="row items-center">
                <div class="col-4" id="tag-icon">Tłumacz:</div>
                <div class="col">{{ book.translators }}</div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-xs">
              <div class="row">
                <div class="col-4">Okładka:</div>
                <div class="col">{{ book.cover }}</div>
              </div>
              <div class="row">
                <div class="col-4">Cena zakupu:</div>
                <div class="col">{{ book.purchasePrice }}</div>
              </div>
              <div class="row">
                <div class="col-4">Cena detaliczna:</div>
                <div class="col">{{ book.retailPrice }}</div>
              </div>
              <div class="row">
                <div class="col-4">Data zakupu:</div>
                <div class="col">{{ book.purchaseDate.slice(0, 10) }}</div>
              </div>
              <div class="row">
                <div class="col-4">Przeczytana:</div>
                <div class="col">{{ book.read }}</div>
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
            <div class="col">
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

        <q-card-section>
          {{ book.description }}
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="red"> usuń </q-btn>
          <q-btn flat color="green"> edytuj </q-btn>
          <q-btn flat color="primary"> dodaj cytat </q-btn>
        </q-card-actions>
      </div>
      <q-btn @click="testAlert2">Test2</q-btn>
    </q-card>
  </div>
</template>

<style>
#img-book-details {
  width: 300px;
  border: 10px solid rgb(48, 52, 54);
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
