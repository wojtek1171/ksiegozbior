<script setup lang="ts">
const props = defineProps(['book']);
//const emit = defineEmits(['quoteDeleted']);
const router = useRouter();

const loan = ref({
  bookId: props.book._id,
  bookTitle: props.book.title,
  bookAuthors: props.book.authors,
  borrower: '',
  lendingDate: new Date().toISOString().slice(0, 10).replaceAll('-', '/'),
  notes: '',
});

async function onSubmit() {
  const loanToSave = {
    bookId: loan.value.bookId,
    bookTitle: props.book.title,
    bookAuthors: props.book.authors,
    borrower: loan.value.borrower,
    returned: false,
    lendingDate: Date.UTC(+loan.value.lendingDate.slice(0, 4), +loan.value.lendingDate.slice(5, 7) - 1, +loan.value.lendingDate.slice(8, 10)),
    notes: loan.value.notes,
  };

  const response = await useFetch('/api/loan/add', {
    method: 'POST',
    body: loanToSave,
  });

  router.push({
    path: '/lending',
  });
}
</script>

<template>
  <q-card class="loan-card">
    <q-card-section class="q-pb-none">
      <div class="text-h5 text-center">Wypożyczasz książkę:</div>
      <div class="text-h6">{{ book.title }}</div>
      <div class="text-body1">{{ book.authors.replaceAll(',', ', ') }}</div>
    </q-card-section>
    <q-card-section>
      <q-input
        class="q-mb-none"
        dense
        v-model="loan.borrower"
        label="Pożyczający"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Pole wymagane']"
      />
      <q-input dense v-model="loan.lendingDate" mask="date" :rules="['date']" label="Data wypożyczenia">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="loan.lendingDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="loan.notes" dense label="Uwagi" type="textarea" />
    </q-card-section>
    <q-card-section align="right">
      <q-btn outline color="primary" @click="onSubmit()">Zatwierdź</q-btn>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.loan-card {
  background-color: rgb(239, 249, 252);
  margin: auto;
  width: 450px;
  height: 500px;
  border-radius: 25px;
}
</style>
