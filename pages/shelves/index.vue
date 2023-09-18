<script setup lang="ts">
const { data: shelves } = await useFetch('/api/shelves');
const { data: fetchedSettings } = await useFetch('/api/settings/admin');
const { data: books } = useFetch('/api/books/for_shelves');

const { isAdmin, authorize } = useAuth();
authorize();

const displayedShelfs = ref(getSortedShelves(shelves.value));
const newShelfName = ref('');
const drag = ref(false);
const editModeActive = ref(false);

//const isBanner = ref(false);
//const sharedState = useState('settingsAlert');

function getSortedShelves(shelves) {
  if (fetchedSettings.value?.shelvesOrder.length) {
    return shelves.sort((a, b) => compare(a, b));
  } else {
    return shelves;
  }
}

function compare(a, b) {
  if (fetchedSettings.value?.shelvesOrder.indexOf(a._id) < 0) {
    return 0;
  } else if (fetchedSettings.value?.shelvesOrder.indexOf(b._id) < 0) {
    return -1;
  }
  return fetchedSettings.value?.shelvesOrder.indexOf(a._id) - fetchedSettings.value?.shelvesOrder.indexOf(b._id);
}

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

async function saveOrder() {
  const shelvesOrder: string[] = [];
  displayedShelfs.value?.forEach((shelf) => {
    shelvesOrder.push(shelf._id);
  });

  const settingsToSave = { ...fetchedSettings.value, shelvesOrder: shelvesOrder };

  const response = await useFetch('/api/settings/edit/admin', {
    method: 'PATCH',
    body: settingsToSave,
  });

  editModeActive.value = false;
}

function cancelSwap() {
  displayedShelfs.value = getSortedShelves(shelves.value);
  editModeActive.value = false;
}

const onChange = () => {
  refetchShelves();
};

async function refetchShelves() {
  const { data: fetchedShelves } = await useFetch('/api/shelves');
  displayedShelfs.value = getSortedShelves(fetchedShelves.value);
}

onMounted(() => {
  useMeta({
    title: 'Półki',
  });
});
</script>

<template>
  <q-page class="q-px-xs">
    <div class="row items-center" style="max-width: 1100px; margin: auto">
      <div class="col"></div>
      <div class="row items-center">
        <div class="q-ma-md col text-h3 text-center">Półki</div>
        <q-chip size="lg">{{ shelves?.length || 0 }}</q-chip>
      </div>
      <div v-if="isAdmin" class="col q-mr-sm" align="right">
        <q-btn v-if="!editModeActive" flat round icon="add">
          <q-tooltip>Dodaj półkę</q-tooltip>
          <q-popup-proxy :offset="[377, 0]">
            <q-card class="q-pa-md" style="width: 500px">
              <q-input dense v-model="newShelfName" label="Wpisz nazwę nowej półki" />
              <div class="text-right">
                <q-btn class="q-mt-lg" outline color="grey-8" label="Dodaj" @click="addNewShelf()"> </q-btn>
              </div>
            </q-card>
          </q-popup-proxy>
        </q-btn>
        <q-btn v-if="!editModeActive" flat round icon="swap_vert" @click="editModeActive = true">
          <q-tooltip>Ustaw kolejność</q-tooltip>
        </q-btn>
        <q-btn v-if="editModeActive" flat round icon="done" color="positive" @click="saveOrder()">
          <q-tooltip>Zapisz</q-tooltip>
        </q-btn>
        <q-btn v-if="editModeActive" flat round icon="close" color="negative" @click="cancelSwap()">
          <q-tooltip>Anuluj</q-tooltip>
        </q-btn>
      </div>
      <div v-else class="col"></div>
    </div>
    <div v-if="shelves?.length == 0" class="text-h6 text-center">Nie utworzono jeszcze żadnych półek.</div>
    <div v-else>
      <draggable
        class="q-mb-md q-gutter-sm"
        v-model="displayedShelfs"
        :disabled="!editModeActive"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <div>
            <Shelf
              v-if="books"
              :key="element._id"
              :shelf="element"
              :books="books"
              :isAdmin="isAdmin"
              :orderModeActive="editModeActive"
              @shelfChanged="onChange"
            />
            <q-skeleton v-else class="q-pa-md q-mx-lg bg-indigo shelf-skeleton" square />
          </div>
        </template>
      </draggable>
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
  </q-page>
</template>

<style lang="scss">
.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}

.shelf-skeleton {
  border-radius: 20px;
  max-width: 1100px;
  margin: auto;
}
</style>
