<script setup lang="ts">
const props = defineProps(['book']);

const book = props.book;
//console.log(props.book);

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
</script>

<template>
  <q-card id="base-card" bordered>
    <div ref="div">
      <q-card-section :horizontal="isHorizontal">
        <q-card-section class="col-3 flex">
          <q-img id="img" :src="book.image" />
        </q-card-section>

        <q-card-section class="col">
          <q-card-section class="q-pa-xs">
            <div class="text-h5">{{ book.title }}</div>
            <div class="text-h6">{{ book.authors }}</div>
            <div>Wydawnictwo: Text</div>
            <div>Seria: Text</div>
            <div>Cykl: Text</div>
            <div>Ocena LC: 6.45</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-3" id="tag-icon">Tytuł oryginału:</div>
              <div class="col">Ask a Philosopher</div>
            </div>
            <div class="row items-center">
              <div class="col-3" id="tag-icon">Rok wydania:</div>
              <div class="col">2020</div>
            </div>
            <div class="row items-center">
              <div class="col-3" id="tag-icon">Tłumacz:</div>
              <div class="col">Maciej Miłkowski</div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-py-xs">
        <div class="row items-center text-bold">
          <div class="col-auto" id="tag-icon">
            <q-icon name="tag" size="sm"></q-icon>
          </div>
          <div class="col">
            <span v-for="tag in tags.split(',')" :key="tag">
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
#img {
  max-width: 200px;
  border: 10px solid rgb(48, 52, 54);
  margin: auto;
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
