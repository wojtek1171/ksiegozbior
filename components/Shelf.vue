<script setup lang="ts">
const props = defineProps(['shelf', 'books', 'isAdmin']);
const emit = defineEmits(['shelfChanged']);

const { filteredBooks, filterBooks } = useBookFilter();
const drag = ref(false);
const booksOnShelf = ref(getBooksFromShelfWithOrder());
const addBookModalOpen = ref(false);
const deleteShelfModalOpen = ref(false);
const changeNameModalOpen = ref(false);
const editModeActive = ref(false);
const shelfName = ref(props.shelf?.name);
const isShelfPinned = ref(props.shelf.pinned);
const shelfExpanded = ref(false);

const filterOptions = ref({
  title: '',
  authors: '',
  tag: '',
});

function getBooksFromShelfWithOrder(): any {
  let booksOnShelf = [];
  props.shelf.books.forEach((bookId) => booksOnShelf.push(props.books.find((book) => book._id == bookId)));
  return booksOnShelf;
}

function addToShelf(book) {
  booksOnShelf.value.push(book);
  editModeActive.value = true;
}

function removeFromShelf(bookId: string) {
  for (let i = 0; i < booksOnShelf.value.length; i++) {
    if (booksOnShelf.value[i]._id == bookId) {
      booksOnShelf.value.splice(i, 1);
      break;
    }
  }
}

function changePinnedStatus() {
  editModeActive.value = true;
  isShelfPinned.value = !isShelfPinned.value;
}

function onCancel() {
  editModeActive.value = false;
  isShelfPinned.value = props.shelf.pinned || false;
  shelfName.value = props.shelf.name;
  booksOnShelf.value = getBooksFromShelfWithOrder();
}

async function onDelete() {
  const response = await useFetch(`/api/shelf/delete/${props.shelf._id}`, {
    method: 'DELETE',
  });
  emit('shelfChanged');
}

async function onSave() {
  let booksIds: String[] = [];
  booksOnShelf.value.forEach((book) => {
    booksIds.push(book._id);
  });

  const shelfToSave = {
    name: shelfName.value,
    books: booksIds,
    pinned: isShelfPinned,
  };

  const response = await useFetch(`/api/shelf/edit/${props.shelf._id}`, {
    method: 'PATCH',
    body: shelfToSave,
  });

  editModeActive.value = false;
  emit('shelfChanged');
}

watch(filterOptions.value, () => {
  filterBooks(props.books, filterOptions.value);
});
</script>

<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    v-model="shelfExpanded"
    style="border-radius: 20px; max-width: 1100px; margin: auto"
    :label="shelfName"
    header-class="bg-indigo text-white text-h6"
    expand-icon-class="text-white"
  >
    <template v-slot:header>
      <q-item-section>
        <div class="row items-center">
          <q-icon v-if="isShelfPinned" class="q-mr-sm" name="push_pin"></q-icon>
          <q-icon v-else class="q-mr-sm"></q-icon>
          <div>{{ shelfName }}</div>
          <q-chip class="q-ml-md">{{ shelf.books.length }}</q-chip>
          <q-space></q-space>
          <div v-if="shelfExpanded"></div>
        </div>
      </q-item-section>
    </template>
    <q-card class="q-pa-md shelf-card" bordered>
      <draggable
        class="q-gutter-md row flex"
        v-model="booksOnShelf"
        :disabled="!editModeActive"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <div v-if="!editModeActive" class="drag-item">
            <router-link :to="`/book/${element._id}`">
              <q-img class="img-non-edit" :src="element.image" style="width: 100px; height: 155px; border-radius: 10px" />
              <q-tooltip class="text-body2">
                <div class="text-center">{{ element.title }}</div>
                <div class="text-center">{{ element.authors.slice(0, 40).replaceAll(',', ', ') }}</div>
              </q-tooltip>
            </router-link>
          </div>
          <div v-else class="drag-item-edit">
            <q-img :src="element.image" style="width: 100px; height: 155px; border-radius: 10px">
              <div class="q-pa-md del-badge">
                <q-btn icon="close" size="xs" color="red-9" @click="removeFromShelf(element._id)" />
              </div>
            </q-img>
          </div>
        </template>
      </draggable>

      <div v-if="isAdmin" class="row items-center">
        <q-space />
        <div class="row q-mt-sm">
          <div v-if="editModeActive" class="q-g">
            <q-btn flat color="negative" @click="onCancel()">Anuluj</q-btn>
            <q-btn flat color="positive" @click="onSave()">Zapisz</q-btn>
          </div>
          <q-btn flat color="grey-9" icon="menu">
            <q-menu anchor="bottom left" self="bottom left">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="addBookModalOpen = true">Dodaj książki</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="editModeActive = true">Edytuj zawartość</q-item-section>
                </q-item>
                <q-item v-if="isShelfPinned" clickable v-close-popup>
                  <q-item-section @click="changePinnedStatus()">Odepnij półkę</q-item-section>
                </q-item>
                <q-item v-if="!isShelfPinned" clickable v-close-popup>
                  <q-item-section @click="changePinnedStatus()">Przypnij półkę</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="changeNameModalOpen = true">Zmień nazwę</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="deleteShelfModalOpen = true">Usuń półkę</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-expansion-item>

  <q-dialog v-model="addBookModalOpen">
    <q-card style="width: 550px; height: 800px">
      <q-card-section class="text-center items-center q-gutter-xs">
        <q-input filled v-model="filterOptions.title" dense clearable label="Tytuł" debounce="500" />
        <q-input filled v-model="filterOptions.authors" dense clearable label="Autor" debounce="500" />
        <q-input filled v-model="filterOptions.tag" dense clearable label="Tag" debounce="500" />
      </q-card-section>

      <div class="q-pl-md">Znaleziono: {{ filteredBooks.length }}</div>

      <q-card-section>
        <q-scroll-area style="height: 535px; max-width: 550px">
          <div v-for="book in filteredBooks">
            <div class="row items-center">
              <div class="col">
                <div class="text-body text-bold">{{ book.title }}</div>
                <div>{{ book.authors.replaceAll(',', ', ') }}</div>
              </div>
              <q-btn class="col-1 q-mr-sm" flat icon="add" color="grey-8" size="md" @click="addToShelf(book)"></q-btn>
            </div>
            <q-separator class="q-my-xs" />
          </div>
        </q-scroll-area>

        <q-card-actions align="right">
          <q-btn outline label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="changeNameModalOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-input dense v-model="shelfName" label="Wpisz nową nazwę półki" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="shelfName = shelf.name" flat label="Wróć" color="primary" v-close-popup />
        <q-btn @click="onSave()" flat label="Zapisz" color="positive" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="deleteShelfModalOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="primary" text-color="white" />
        <span class="q-ml-sm">Na pewno? Usuniętej półki nie można przywrócić.</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Wróć" color="primary" v-close-popup />
        <q-btn @click="onDelete()" flat label="Usuń" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.shelf-card {
  margin: auto;
  max-width: 1100px;
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 20px;
}

.drag-item-edit {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;
  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
  cursor: move;
}

.del-badge {
  border-radius: 5px;
  padding: 0 !important;
  position: absolute;
  top: 5px;
  right: 5px;
}

.img-non-edit {
  border-radius: 10px;
  transition: transform 0.4s;
}

.img-non-edit:hover {
  transform: scale(1.05);
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
