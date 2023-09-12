<script setup lang="ts">
const props = defineProps(['loans']);

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
  { name: 'title', required: true, label: 'Tytuł', align: 'left', field: (row) => row.bookTitle, sortable: true },
  { name: 'authors', align: 'left', label: 'Autor', field: (row) => row.bookAuthors, sortable: true },
  { name: 'borrower', align: 'left', label: 'Pożyczający', field: (row) => row.borrower, sortable: true },
  { name: 'lendingDate', align: 'left', label: 'Data wyp.', field: (row) => row.lendingDate, sortable: true },
  { name: 'returnDate', align: 'left', label: 'Data oddania', field: (row) => row.returnDate, sortable: true },
  { name: 'onLoanDays', align: 'left', label: 'Dni wyp.', field: (row) => row.onLoanDays, sortable: true },
  { name: 'notes', align: 'left', label: 'Uwagi', field: (row) => row.notes, sortable: true },
];
</script>

<template>
  <div class="q-py-lg q-px-md">
    <q-table
      class="my-sticky-header-table table"
      flat
      bordered
      dense
      :rows="props.loans"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="title"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            ><router-link class="router-link" :to="getBookLink(props.row.bookId)"
              >{{ trimTitle(props.row.bookTitle) }}<q-tooltip class="text-body2">{{ props.row.bookTitle }}</q-tooltip></router-link
            ></q-td
          >
          <q-td
            >{{ formatAuthors(props.row.bookAuthors) }}<q-tooltip class="text-body2">{{ props.row.bookAuthors }}</q-tooltip></q-td
          >
          <q-td>{{ props.row.borrower }}</q-td>
          <q-td>{{ props.row.lendingDate.slice(0, 10) }}</q-td>
          <q-td>{{ props.row.returnDate?.slice(0, 10) }}</q-td>
          <q-td>{{ props.row.onLoanDays }}</q-td>
          <q-td>
            <q-icon v-if="props.row.notes" name="text_snippet" color="grey-8">
              <q-tooltip class="text-body1">{{ props.row.notes }}</q-tooltip>
            </q-icon>
            <q-icon v-else name="check_box_outline_blank" color="grey-8"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style lang="scss">
.router-link {
  color: #000000;
}

.table {
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
