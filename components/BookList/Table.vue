<script setup lang="ts">
const props = defineProps(['books']);

//let visBooks = props.books?.slice(0, 10);

const pagination = ref({
  page: 1,
  rowsPerPage: 25,
});

function trimTitle(title: String) {
  return title.length > 25 ? title.slice(0, 25) + '...' : title;
}

function formatAuthors(string: String) {
  const replaced = string.replaceAll(',', ', ');
  return replaced.length > 30 ? replaced.slice(0, 30) + '...' : replaced;
}

function getBookLink(id: string) {
  return `/book/${id}`;
}

const columns = [
  { name: 'title', required: true, label: 'Tytuł', align: 'left', field: (row) => row.title, sortable: true },
  { name: 'authors', align: 'left', label: 'Autor', field: (row) => row.authors, sortable: true },
  { name: 'publisher', align: 'left', label: 'Wydawca', field: (row) => row.publisher, sortable: true },
  { name: 'pages', align: 'left', label: 'Strony', field: (row) => row.pages, sortable: true },
  { name: 'note', align: 'left', label: 'Ocena', field: (row) => row.lcNote, sortable: true },
  { name: 'retailPrice', align: 'left', label: 'Cena detal.', field: (row) => row.retailPrice, sortable: true },
  { name: 'purchasePrice', align: 'left', label: 'Cena zakupu', field: (row) => row.purchasePrice, sortable: true },
  { name: 'read', align: 'left', label: 'Przeczytana', field: (row) => row.read, sortable: true },
];
</script>

<template>
  <div class="q-pb-lg q-px-md">
    <q-table
      class="my-sticky-header-table table"
      flat
      bordered
      dense
      title="Tytuł tabeli"
      :rows="props.books"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="title"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            ><router-link class="router-link" :to="getBookLink(props.row._id)"
              >{{ trimTitle(props.row.title) }}<q-tooltip class="text-body2">{{ props.row.title }}</q-tooltip></router-link
            ></q-td
          >
          <q-td
            >{{ formatAuthors(props.row.authors) }}<q-tooltip class="text-body2">{{ props.row.authors }}</q-tooltip></q-td
          >
          <q-td>{{ props.row.publisher }}</q-td>
          <q-td>{{ props.row.pages }}</q-td>
          <q-td>{{ props.row.lcNote }}</q-td>
          <q-td>{{ props.row.retailPrice }}</q-td>
          <q-td>{{ props.row.purchasePrice }}</q-td>
          <q-td>
            <q-icon v-if="props.row.read" name="check_box" color="grey-8"></q-icon>
            <q-icon v-else name="check_box_outline_blank" color="grey-8"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss">
.router-link {
  //all: unset;
  color: #000000;
}

.table {
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
