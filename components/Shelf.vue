<script setup lang="ts">
const props = defineProps(['shelf', 'books']);
//const emit = defineEmits(['quoteDeleted']);
const router = useRouter();
//const { isAdmin, authorize } = useAuth();
//authorize();

const { filteredBooks, filterBooks } = useBookFilter();
const drag = ref(false);
const booksOnShelf = ref(getBooksFromShelfWithOrder());
const addBookModalOpen = ref(false);
const deleteShelfModalOpen = ref(false);
const changeNameModalOpen = ref(false);
const editModeActive = ref(false);
const shelfName = ref(props.shelf?.name);

const filterOptions = ref({
  title: '',
  authors: '',
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

async function onDelete() {
  const response = await useFetch(`/api/shelf/delete/${props.shelf._id}`, {
    method: 'DELETE',
  });
  // const sharedState = useState('alert', () => ({
  //   isVisible: true,
  //   message: `Książka ${book.value.title} została usunięta`,
  // }));
  //router.push('/books');
}

function removeFromShelf(bookId: string) {
  for (let i = 0; i < booksOnShelf.value.length; i++) {
    if (booksOnShelf.value[i]._id == bookId) {
      booksOnShelf.value.splice(i, 1);
      break;
    }
  }
}

async function onSave() {
  let booksIds: String[] = [];
  booksOnShelf.value.forEach((book) => {
    booksIds.push(book._id);
  });

  const shelfToSave = {
    name: shelfName.value,
    books: booksIds,
  };

  const response = await useFetch(`/api/shelf/edit/${props.shelf._id}`, {
    method: 'PATCH',
    body: shelfToSave,
  });

  editModeActive.value = false;
}

watch(filterOptions.value, () => {
  filterBooks(props.books, filterOptions.value);
});
</script>

<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden"
    style="border-radius: 25px; max-width: 1100px; margin: auto"
    :label="shelfName"
    header-class="bg-indigo text-white text-h6"
    expand-icon-class="text-white"
  >
    <template v-slot:header>
      <q-item-section>
        <div class="row">
          <div>• {{ shelfName }}</div>
          <q-chip class="q-ml-md">{{ shelf.books.length }}</q-chip>
        </div>
      </q-item-section>
    </template>
    <q-card class="q-pa-md shelf-card" bordered>
      <div class="row items-center q-pb-sm" style="margin: auto">
        <!-- <div class="text-h5">{{ shelfName }}</div> -->
        <!-- <q-chip>{{ shelf.books.length }}</q-chip> -->
        <q-space />
        <div>
          <q-btn outline color="grey-9" size="sm" icon="menu">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section @click="addBookModalOpen = true">Dodaj książki</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="editModeActive = true">Edytuj zawartość</q-item-section>
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
                <div class="text-center">{{ element.authors.slice(0, 30) }}</div>
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

      <div v-if="editModeActive" class="q-gutter-sm" align="right">
        <q-btn outline color="negative" @click="editModeActive = false">Anuluj</q-btn>
        <q-btn outline color="positive" @click="onSave()">Zapisz</q-btn>
      </div>
    </q-card>
  </q-expansion-item>

  <q-dialog v-model="addBookModalOpen">
    <q-card>
      <q-card-section class="text-center items-center">
        <q-input v-model="filterOptions.title" dense clearable label="Tytuł" debounce="500" />
        <q-input v-model="filterOptions.authors" dense clearable label="Autor" debounce="500" />
      </q-card-section>

      <q-card-section>
        <div v-for="book in filteredBooks.slice(0, 10)">
          <div>{{ book.title }}</div>
          <div>{{ book.authors }}</div>
          <q-btn icon="add" size="xs" @click="addToShelf(book)"></q-btn>
          <q-separator></q-separator>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn outline label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="changeNameModalOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-input dense v-model="shelfName" label="Wpisz nową nazwę półki" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Wróć" color="primary" v-close-popup />
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
  border-radius: 25px;
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
