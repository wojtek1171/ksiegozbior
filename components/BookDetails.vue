<script setup lang="ts">
const route = useRoute();
const bookid = ref(route.params.bookid);
console.log(bookid);
const { data: book } = await useFetch(`/api/book/${bookid.value}`);
const tags = 'filozofia,pytania,popularnonaukowa';
const desc =
  'W 2016 roku Ian Olasov wraz z kilkoma profesorami i studentami filozofii rozstawił stolik /n w centrum Nowego Jorku i wywiesił karteczkę "Zapytaj filozofa". Przez następne kilka godzin rozmawiał z przechodniami o Bogu, wyborach prezydenckich, hodowaniu rybek w akwarium i wolnej woli. Dzięki tej książce z pewnością nie zabraknie wam już tematów na small talki w windzie lub u fryzjera. Z tej książki dowiesz się: skoro Superman czerpie energię ze Słońca, to dlaczego nie jest opalony? Dlaczego istnieje raczej coś niż nic? Czy ketchup to smoothie? Jaki jest sens życia? ';

let changed = ref(1);
const count = ref(0);

const div = ref(null);

const isHorizontal = ref(true);

onMounted(() => {
  console.log('Hej');
  console.log(div.value);
  console.log(div.value.clientWidth);

  if (div.value.clientWidth < 800) {
    isHorizontal.value = false;
  }
});
</script>

<template>
  <div ref="div">Book Details</div>

  <div>{{ book }}</div>

  <q-card id="base-card" flat bordered>
    <div ref="div">
      <q-card-section :horizontal="isHorizontal">
        <q-card-section class="col-5 flex flex-center">
          <div>asd</div>
          <q-img id="img" class="rounded-borders" src="https://s.lubimyczytac.pl/upload/books/5005000/5005794/965853-352x500.jpg" />
        </q-card-section>

        <q-card-section>
          <q-card-section class="q-pa-xs">
            <div class="text-h5 q-mt-sm">Zapytaj FilozofaŻZ LŁ ąaęe</div>
            <div class="text-h6">Ian Olslav</div>
            <div>Wydawnictwo: Text</div>
            <div>Seria: Text</div>
            <div>Cykl: Text</div>
            <div>230 str</div>
            <div>Ocena LC: 6.45</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-3" id="tag-icon">Tytuł oryginału:</div>
              <div class="col">Ask a Philosopher: Answers to Your Most Important (and Most Unexpected) Questions</div>
            </div>
            <div class="row items-center">
              <div class="col-3" id="tag-icon">Rok wydania:</div>
              <div class="col">2020</div>
            </div>
            <div class="row items-center">
              <div class="col-3" id="tag-icon">ISBN:</div>
              <div class="col">225469871235</div>
            </div>
            <div class="row items-center">
              <div class="col-3" id="tag-icon">Tłumacz:</div>
              <div class="col">Maciej Miłkowski</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-xs">
            <div class="row">
              <div class="col-3">Okładka:</div>
              <div class="col">miękka</div>
            </div>
            <div class="row">
              <div class="col-3">Cena zakupu:</div>
              <div class="col">15.15</div>
            </div>
            <div class="row">
              <div class="col-3">Cena detaliczna:</div>
              <div class="col">20.20</div>
            </div>
            <div class="row">
              <div class="col-3">Data zakupu:</div>
              <div class="col">2022-07-05</div>
            </div>
            <div class="row">
              <div class="col-3">Przeczytana:</div>
              <div class="col">Tak</div>
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

      <q-card-section>
        {{ desc }}
      </q-card-section>

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat> 7:30PM </q-btn>
        <q-btn flat color="primary"> Reserve </q-btn>
      </q-card-actions>
    </div>
  </q-card>
</template>

<style>
#img {
  max-width: 400px;
  border: 10px solid rgb(48, 52, 54);
}

#base-card {
  margin: auto;
  max-width: 900px;
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
