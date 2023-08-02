<script setup lang="ts">
const props = defineProps(['book']);

const book = props.book;

const tags = 'filozofia,pytania,popularnonaukowa';

const div = ref(null);

const isHorizontal = ref(true);

let width = ref(null);

function changeOnResize() {
  console.log('222');

  if (div.value) {
    div.value.clientWidth < 800 ? (isHorizontal.value = false) : (isHorizontal.value = true);
  }
}

onMounted(() => {
  console.log('Hej1');

  if (div.value) {
    div.value.clientWidth < 800 ? (isHorizontal.value = false) : (isHorizontal.value = true);
  }

  window.addEventListener('resize', changeOnResize);
});

onUnmounted(() => {
  console.log('Unmounted');
  window.removeEventListener('resize', changeOnResize);
});

function urlToBook(bookId: String) {
  return `/book/${bookId}`;
}
</script>

<template>
  <q-card class="q-pl-xs" id="base-card" bordered>
    <div class="q-my-md">
      <div class="row flex items-center justify-center">
        <div class="q-ma-md">
          <q-img class="rounded-borders" id="img-book-tile" :src="book.image" />
        </div>

        <div class="q-mx-md data-container">
          <q-card-section class="q-pa-xs">
            <router-link class="title-link" :to="urlToBook(book._id)"
              ><div class="text-h5">{{ book.title }}</div></router-link
            >
            <!-- <div class="text-h6">{{ book.authors }}</div> -->
            <div class="qxs">
              <span v-for="author in book.authors.split(',')" :key="author">
                <!-- <router-link class="link" :to="`/search/${tag}`">
                                <q-chip dense clickable size="md">
                                    {{ tag }}
                                </q-chip>
                            </router-link> -->
                <q-chip dense clickable size="lg">
                  {{ author }}
                </q-chip>
              </span>
            </div>
            <div class="row">
              <div class="col-4" id="tag-icon">Wydawnictwo:</div>
              <div class="col-auto">{{ book.publisher }}</div>
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
              <div class="col">{{ book.lcNote }}</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-xs">
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Rok wydania:</div>
              <div class="col">{{ book.publicationDate }}</div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Tytuł oryginału:</div>
              <div class="col">{{ book.originalTitle }}</div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Tłumacz:</div>
              <div class="col">{{ book.translators }}</div>
            </div>
          </q-card-section>
        </div>
      </div>

      <q-separator class="q-mt-xs"></q-separator>

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
    </div>
  </q-card>
</template>

<style>
#img-book-tile {
  width: 200px;
  max-height: 270px;
  border: 10px solid rgb(48, 52, 54);
  margin: auto;
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}

.data-container {
  width: max(400px, calc(100% - 300px));
}

.title-link {
  text-decoration: none;
  color: black;
}

.title-link:hover {
  color: rgb(75, 78, 228);
}
</style>
