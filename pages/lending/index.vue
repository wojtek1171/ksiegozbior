<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});

const { data: loans } = await useFetch('/api/loans/by_lending_date_desc');
const displayedLoans = ref(loans.value);
const currentLoans = ref(loans.value?.filter((loan) => !loan.returned));
const archivedLoans = ref(loans.value?.filter((loan) => loan.returned));

async function refetchAndFilter() {
  const { data: fetchedLoans } = await useFetch('/api/loans/by_lending_date_desc');
  displayedLoans.value = fetchedLoans.value;
  currentLoans.value = displayedLoans.value?.filter((loan) => !loan.returned);
  archivedLoans.value = displayedLoans.value?.filter((loan) => loan.returned);
}

onMounted(() => {
  useMeta({
    title: 'Wypożyczenia',
  });
});
</script>

<template>
  <div class="q-ma-md text-h3 text-center">Wypożyczenia</div>

  <div class="q-pa-md" style="max-width: 800px; margin: auto">
    <div class="text-h5 text-center q-mb-sm">Aktualne</div>
    <q-card class="q-my-xs card-loan-head" flat bordered>
      <q-card-section class="row q-py-xs q-gutter-sm items-center">
        <div class="text-bold col-12 col-sm-3">Pozycja</div>
        <div class="text-bold col-5 col-sm-2">Pożyczający</div>
        <div class="text-bold col-5 col-sm-2">Data pożyczenia</div>
        <div class="text-bold col-12 col-sm-3">Uwagi</div>
        <div class="col-auto"></div>
      </q-card-section>
    </q-card>
    <div v-if="currentLoans.length > 0" v-for="loan in currentLoans" :key="loan._id">
      <LoanTile :loan="loan" @loan-archived="refetchAndFilter()" />
    </div>
    <div v-else class="q-mt-md text-center">Aktualnie nie wypożyczasz żadnej książki.</div>

    <q-separator class="q-my-md" />
  </div>
  <div style="max-width: 950px; margin: auto">
    <div class="text-h5 text-center">Archiwum</div>
    <LoanTable v-if="archivedLoans.length > 0" :loans="archivedLoans" />
    <div v-else class="q-mt-md text-center">Archiwum wypożyczeń jest puste</div>
  </div>
</template>

<style lang="scss">
.card-loan-head {
  background-color: rgb(255, 255, 255, 0.2);
  border-radius: 15px;
}

.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}
</style>
