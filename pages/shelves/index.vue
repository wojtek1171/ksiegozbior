<script setup lang="ts">
const { data: shelves } = await useFetch('/api/shelves/by_name_asc_pinned_first');
const { data: books } = await useFetch('/api/books');

const { isAdmin, authorize } = useAuth();
authorize();

let displayedShelfs = ref(shelves);
const newShelfName = ref('');

//const isBanner = ref(false);
//const sharedState = useState('settingsAlert');

async function addNewShelf() {
  const shelfName = newShelfName.value;
  const shelfToSave = {
    name: shelfName,
    books: [],
  };

  const response = await useFetch('/api/shelf/add', {
    method: 'POST',
    body: shelfToSave,
  });

  refetchShelves();
}

const onChange = () => {
  refetchShelves();
};

async function refetchShelves() {
  const { data: fetchedShelves } = await useFetch('/api/shelves/by_name_asc_pinned_first');
  displayedShelfs.value = fetchedShelves.value;
}

onMounted(() => {
  useMeta({
    title: 'Półki',
  });
});
</script>

<template>
  <div class="row items-center" style="max-width: 1100px; margin: auto">
    <div class="col"></div>
    <div class="row items-center">
      <div class="q-ma-md col text-h3 text-center">Półki</div>
      <q-chip size="lg">{{ shelves?.length || 0 }}</q-chip>
    </div>
    <div v-if="isAdmin" class="col q-mr-sm" align="right">
      <q-btn flat round icon="add">
        <q-popup-proxy :offset="[377, 0]">
          <q-card class="q-pa-md" style="width: 500px">
            <q-input dense v-model="newShelfName" label="Wpisz nazwę nowej półki" />
            <div class="text-right">
              <q-btn class="q-mt-lg" outline color="grey-8" label="Dodaj" @click="addNewShelf()"></q-btn>
            </div>
          </q-card>
        </q-popup-proxy>
      </q-btn>
    </div>
    <div v-else class="col"></div>
  </div>
  <div v-if="shelves?.length == 0" class="text-h6 text-center">Nie utworzono jeszcze żadnych półek.</div>
  <div v-else class="q-my-sm" v-for="shelf in displayedShelfs">
    <Shelf :key="shelf._id" :shelf="shelf" :books="books" :isAdmin="isAdmin" @shelfChanged="onChange"></Shelf>
  </div>

  <!-- <q-banner v-if="isBanner" class="bg-green-4 banner">
    <div class="row no-wrap q-gutter-md">
      <div>
        {{ sharedState?.message }}
      </div>
      <div>
        <q-btn @click="dismissBanner" outline color="black" icon="close" size="sm" round />
      </div>
    </div>
  </q-banner> -->
</template>

<style lang="scss">
.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}
</style>
