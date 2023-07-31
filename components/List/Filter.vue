<script setup lang="ts">
const emit = defineEmits(['filterOptionsChanged']);

const filterOptions = ref({
  title: '',
  authors: [],
  publisher: '',
  tags: [],
  read: true,
  notRead: true,
});

const hints = ['Jedn', 'Dwa Dwr', 'Trzy'];

const searchHints = ref(hints);

function filterFn(val, update) {
  update(() => {
    if (val === '') {
      searchHints.value = hints;
    } else {
      const needle = val.toLowerCase();
      searchHints.value = hints.filter((v) => v.toLowerCase().indexOf(needle) > -1);
    }
  });
}

watch(filterOptions.value, () => {
  emit('filterOptionsChanged', filterOptions.value);
});
</script>

<template>
  <div class="text-h3">Filter</div>

  <div>{{ filterOptions }}</div>

  <div>
    <q-input v-model="filterOptions.title" label="Tytuł" />
    <q-input v-model="filterOptions.publisher" label="Wydawca" />
    <q-select
      v-model="filterOptions.authors"
      multiple
      dense
      :options="searchHints"
      use-input
      use-chips
      stack-label
      @filter="filterFn"
      new-value-mode="add-unique"
      label="Autor"
    />

    <q-select
      v-model="filterOptions.tags"
      multiple
      dense
      :options="searchHints"
      use-input
      use-chips
      stack-label
      @filter="filterFn"
      new-value-mode="add-unique"
      label="Tagi"
    />

    <q-checkbox v-model="filterOptions.read" label="Przeczytana" />
    <q-checkbox v-model="filterOptions.notRead" label="Nieprzeczytane" />
  </div>
</template>
