<script setup lang="ts">
const props = defineProps(['book']);

const book = props.book;

// onUnmounted(() => {
//   window.removeEventListener('resize', changeOnResize);
// });
</script>

<template>
  <q-card class="q-pl-xs" id="base-card" bordered>
    <div v-if="book.read" class="badge"><q-icon name="check_circle" size="xs" color="positive" /></div>
    <div class="q-my-md">
      <div class="row flex justify-center">
        <div class="q-ma-md">
          <router-link :to="`/book/${book._id}`">
            <q-img class="rounded-borders" id="img-book-tile" :src="book.image" />
          </router-link>
        </div>

        <div class="q-mx-md book-tile-data-container">
          <q-card-section class="q-pa-xs">
            <router-link class="title-link-book" :to="`/book/${book._id}`"
              ><div class="text-h5">{{ book.title }}</div></router-link
            >
            <div class="chip-col-right">
              <span v-for="author in book.authors.split(',')" :key="author">
                <router-link class="link" :to="`/books/aut=${author}`">
                  <q-chip dense clickable size="lg">
                    {{ author }}
                  </q-chip>
                </router-link>
              </span>
            </div>
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
                <span>Tom {{ book.seriesVol }}</span>
              </div>
            </div>

            <div v-if="book.originalTitle" class="row items-center">
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
              <div class="col flex items-center text-bold">
                {{ book.lcNote }}
                <q-icon class="q-ml-xs" name="star" />
              </div>
            </div>
            <div class="row items-center">
              <div class="col-4" id="tag-icon">Stron:</div>
              <div class="col text-bold">{{ book.pages }}</div>
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
              <router-link class="link" :to="`/books/tag=${tag}`">
                <q-chip dense clickable size="md">
                  {{ tag }}
                </q-chip>
              </router-link>
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
  /* border: 6px solid rgb(31, 60, 75); */
  border-radius: 12px;
  transition: transform 0.4s;
  margin: auto;
}

#img-book-tile:hover {
  transform: scale(1.05);
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 25px;
}

.book-tile-data-container {
  width: max(400px, calc(100% - 300px));
}

.title-link-book {
  text-decoration: none;
  color: black;
}

.title-link-book:hover {
  color: #0e68c9;
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
