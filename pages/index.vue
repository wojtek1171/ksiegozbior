<script setup lang="ts">
// useMeta({
//   title: 'Księgozbiór - Strona główna',
// });

const { homePageData, getHomePageData } = useHomePageData();
await getHomePageData();

const { declineBook, declineAuthor, declinePage, declineQuote } = useDeclination();

const scrollAreaRef = ref(null);
const position = ref(0);
let once = false;
const curPosPercentage = ref(0);
const totalWidth = ref(0);

function scroll(sc) {
  curPosPercentage.value = sc.horizontalPercentage;
  position.value = sc.horizontalPosition;
  if (!once) {
    totalWidth.value = sc.horizontalSize;
    once = true;
  }
}

function animateScroll(dir: string) {
  if (dir === 'right') {
    curPosPercentage.value < 1 && (position.value = position.value + totalWidth.value / 6);
  } else {
    curPosPercentage.value > 0 && (position.value = position.value - totalWidth.value / 6);
  }
  scrollAreaRef.value.setScrollPosition('horizontal', position.value, 300);
}
const { isAdmin, authorize } = useAuth();
authorize();
</script>

<template>
  <q-page class="text-center" style="max-width: 1100px; margin: auto">
    <div class="q-py-lg text-h3 text-center">Ostatnio dodane</div>

    <div class="row items-center no-wrap">
      <div class="col-1">
        <q-btn icon="chevron_left" flat round @click="animateScroll('left')"></q-btn>
      </div>

      <q-scroll-area ref="scrollAreaRef" class="col-10" style="height: 350px; max-width: 1100px" @scroll="scroll">
        <div class="row no-wrap">
          <div v-for="book in homePageData.recentBooks" :key="book" class="q-pa-sm">
            <router-link :to="`/book/${book._id}`">
              <q-img id="scroll-img" style="height: 300px; width: 200px" :src="book.image" />
            </router-link>
          </div>
        </div>
      </q-scroll-area>

      <div class="col-1">
        <q-btn icon="chevron_right" flat round @click="animateScroll('right')"></q-btn>
      </div>
    </div>

    <q-separator></q-separator>

    <div class="q-pt-lg text-h3 text-center">Księgozbiór zawiera</div>

    <div class="q-pa-lg row flex flex-center text-center q-gutter-lg">
      <q-card bordered class="column text-center my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h3">
            {{ homePageData.bookCount }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">{{ declineBook(homePageData.bookCount) }}</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="column text-center my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h3">
            {{ homePageData.authorsCount }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">{{ declineAuthor(homePageData.authorsCount) }}</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="column text-center my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h3">
            {{ homePageData.pagesCount }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">{{ declinePage(homePageData.pagesCount) }}</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="column my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text">
            {{ homePageData.meters }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">metrów bieżących</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="column my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text">
            {{ homePageData.bookCount }}
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">{{ declineQuote(homePageData.bookCount) }}</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="column my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text">{{ Math.round(homePageData.purchasePriceSum) }} zł</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">suma cen zakupu</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="column my-card">
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text">{{ Math.round(homePageData.retailPriceSum) }} zł</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="col text-h3 flex items-center text-center section">
          <div class="text-h6">suma cen detal.</div>
        </q-card-section>
      </q-card>
    </div>
    <q-separator></q-separator>
  </q-page>
</template>

<style lang="scss">
.section {
  margin: auto;
}

.my-card {
  width: 215px;
  height: 215px;
  background-color: rgb(235, 235, 235, 0.5);
  border-radius: 25px;
  transition: transform 0.7s;
}

.my-card:hover {
  transform: scale(1.1);
}

#scroll-img {
  border-radius: 10px;
  transition: transform 0.4s;
}

#scroll-img:hover {
  transform: scale(1.05);
}
</style>
