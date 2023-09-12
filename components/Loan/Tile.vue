<script setup lang="ts">
const props = defineProps(['loan']);
const emit = defineEmits(['loanArchived']);
const archiveModalOpen = ref(false);
const returnDate = ref(new Date().toISOString().slice(0, 10).replaceAll('-', '/'));
const loanNote = ref(props.loan.notes);

function trimAuthors(authors: String) {
  const authorsArry = authors.split(',');
  if (authorsArry.length > 1) {
    return `${authorsArry[0]} i inni`;
  } else {
    return authorsArry[0];
  }
}

function getDiffInDays(startDate, endDate) {
  return Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
}

async function archive() {
  const loanToSave = {
    bookId: props.loan.bookId,
    bookTitle: props.loan.bookTitle,
    bookAuthors: props.loan.bookAuthors,
    borrower: props.loan.borrower,
    returned: true,
    lendingDate: props.loan.lendingDate,
    returnDate: Date.UTC(+returnDate.value.slice(0, 4), +returnDate.value.slice(5, 7) - 1, +returnDate.value.slice(8, 10)),
    notes: loanNote.value,
    onLoanDays: getDiffInDays(props.loan.lendingDate, returnDate.value),
  };

  const response = await useFetch(`/api/loan/edit/${props.loan._id}`, {
    method: 'PATCH',
    body: loanToSave,
  });

  emit('loanArchived');
}
</script>

<template>
  <q-card class="q-mb-xs card-loan" flat bordered>
    <q-card-section class="row wrap q-gutter-sm items-center">
      <div class="col-12 col-sm-3">
        <div class="text-bold">{{ loan.bookTitle }}</div>
        <div>{{ trimAuthors(loan.bookAuthors) }}</div>
      </div>
      <div class="col-5 col-sm-2">{{ loan.borrower }}</div>
      <div class="col-5 col-sm-2">{{ loan.lendingDate.slice(0, 10) }}</div>
      <div class="col-12 col-sm-3">{{ loan.notes }}</div>
      <div class="col-12 col-sm-auto" align="right">
        <q-btn outline icon="archive" color="grey-8" size="sm" @click="archiveModalOpen = true">
          <q-tooltip>Archiwizuj</q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>

  <q-dialog v-model="archiveModalOpen">
    <q-card class="loan-modal">
      <q-card-section class="q-pb-none">
        <div class="text-h5 text-center">Archiwizuj</div>
        <q-separator />
        <div class="q-my-sm text-body1 text-bold">{{ loan.bookTitle }}</div>
        <div class="row">
          <div>Pożyczający:</div>
          <q-space />
          <div class="text-bold">{{ loan.borrower }}</div>
        </div>
        <div class="row">
          <div class="text">Data wypożyczenia:</div>
          <q-space />
          <div class="text-bold">{{ loan.lendingDate.slice(0, 10) }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input filled v-model="loanNote" type="textarea" label="Uwagi" />
        <q-input class="q-mt-md" filled dense v-model="returnDate" mask="date" :rules="['date']" label="Data oddania">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="returnDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="text">Oddana po {{ getDiffInDays(loan.lendingDate, returnDate) }} dniach.</div>
      </q-card-section>
      <q-card-section align="right">
        <q-btn outline color="primary" @click="archive()">Archiwizuj</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss">
.card-loan {
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: 15px;
}

.loan-modal {
  max-width: 300px;
}

.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}
</style>
