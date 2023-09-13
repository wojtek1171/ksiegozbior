<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});

const { data: fetchedSettings } = await useFetch('/api/settings/admin');
const isBanner = ref(false);
const sharedState = useState('settingsAlert');

const settings = ref({
  user: fetchedSettings.value.user || 'admin',
  toolbarTitle: fetchedSettings.value.toolbarTitle || 'Księgozbiór',
  meters: fetchedSettings.value.meters || 10,
  statisticsInitialYear: fetchedSettings.value.statisticsInitialYear || new Date().getFullYear(),
  expensesVisibleToGuests: fetchedSettings.value.expensesVisibleToGuests || false,
});

async function onSubmit() {
  const settingsToSave = {
    user: settings.value.user,
    toolbarTitle: settings.value.toolbarTitle,
    meters: +settings.value.meters,
    statisticsInitialYear: +settings.value.statisticsInitialYear,
    expensesVisibleToGuests: settings.value.expensesVisibleToGuests,
  };

  const response = await useFetch('/api/settings/edit/admin', {
    method: 'PATCH',
    body: settingsToSave,
  });

  useState('settingsAlert', () => ({
    isVisible: true,
    message: response.data.value?.message || 'Coś poszło nie tak',
  }));
  isBanner.value = true;
  //router.push('/quotes');
}

function dismissBanner() {
  isBanner.value = false;
  clearNuxtState('settingsAlert');
}

onMounted(() => {
  useMeta({
    title: 'Ustawienia',
  });
});
</script>

<template>
  <div class="q-pa-md" id="form" style="max-width: 800px">
    <q-card class="q-mb-md card-form" flat bordered>
      <div class="q-mx-md row no-wrap items-center">
        <div class="card-title">Ustawienia</div>
      </div>

      <q-separator></q-separator>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input dense v-model="settings.toolbarTitle" label="Tytuł na pasku" />
          <q-input dense v-model="settings.meters" label="Metry bieżące na stronie startowej" reverse-fill-mask mask="#.#" fill-mask="0" />
          <q-input dense v-model="settings.statisticsInitialYear" label="Wyświetlaj roczne statystyki od:" type="number" />
          <q-checkbox v-model="settings.expensesVisibleToGuests" label="Pokaż wydatki na stronie głównej niezalogowanym użytkownikom" />

          <div align="right">
            <q-btn label="Zapisz" type="submit" color="positive" outline />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>

  <q-banner v-if="isBanner" class="bg-green-4 banner">
    <div class="row no-wrap q-gutter-md">
      <div>
        {{ sharedState?.message }}
      </div>
      <div>
        <q-btn @click="dismissBanner" outline color="black" icon="close" size="sm" round />
      </div>
    </div>
  </q-banner>
</template>

<style lang="scss">
#form {
  margin: auto;
}

.card-form {
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: 25px;
}

.card-title {
  font-size: x-large;
}

.banner {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}
</style>
