<script setup lang="ts">
const props = defineProps(['book']);

const book = props.book;

const tags = 'filozofia,pytania,popularnonaukowa';

onMounted(() => {
  console.log('Hej1');
});

// onUnmounted(() => {
//   console.log('Unmounted');
//   window.removeEventListener('resize', changeOnResize);
// });

function urlToBook(bookId: String) {
  return `/book/${bookId}`;
}
</script>

<template>
  <q-card class="q-pl-xs" id="base-card" bordered>
    <q-badge v-if="book.read" color="green" floating align="middle"><q-icon name="check"></q-icon></q-badge>
    <div class="q-my-md">
      <div class="row flex justify-center">
        <div class="q-ma-md">
          <q-img class="rounded-borders" id="img-book-tile" :src="book.image" />
        </div>

        <div class="q-mx-md book-tile-data-container">
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
              <div class="col text-bold">{{ book.publisher }}</div>
            </div>
            <div v-if="book.publSeries" class="row items-center">
              <div class="col-4" id="tag-icon">Seria:</div>
              <div class="col text-bold">{{ book.publSeries }}</div>
            </div>
            <div v-if="book.series" class="row items-center">
              <div class="col-4" id="tag-icon">Cykl:</div>
              <div class="col text-bold">{{ book.series }}</div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Ocena LC:</div>
              <div class="col text-bold">{{ book.lcNote }}</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-xs">
            <div v-if="book.originalTitle" class="row items-center">
              <div class="col-4" id="tag-icon">Tytuł oryginału:</div>
              <div class="col text-bold">{{ book.originalTitle }}</div>
            </div>
            <div v-if="book.translators" class="row items-center">
              <div class="col-4" id="tag-icon">Tłumacz:</div>
              <div class="col text-bold">{{ book.translators }}</div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Stron:</div>
              <div class="col text-bold">{{ book.pages }}</div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Rok wydania:</div>
              <div class="col text-bold">{{ book.publicationDate }}</div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">ISBN:</div>
              <div class="col text-bold">{{ book.isbn }}</div>
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
  border: 6px solid rgb(31, 60, 75);
  margin: auto;
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}

.book-tile-data-container {
  width: max(400px, calc(100% - 300px));
}

.title-link {
  text-decoration: none;
  color: black;
}

.title-link:hover {
  color: #0e68c9;
}
</style>
