<script setup lang="ts">
const leftDrawerOpen = ref(true);
const { isAdmin, authorize } = useAuth();
authorize();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" id="layout">
    <VitePwaManifest />
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="toolbar-title"> App </q-toolbar-title>
        <div><q-btn icon="logout" round size="sm" color="blue-10" to="/login"></q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer id="drawer" bordered v-model="leftDrawerOpen" :width="230" show-if-above elevated>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <q-item to="/" clickable>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/books" clickable>
          <q-item-section avatar>
            <q-icon name="import_contacts" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Książki</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="isAdmin" to="/book/add" clickable>
          <q-item-section avatar>
            <q-icon name="library_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj książkę</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/quotes" clickable>
          <q-item-section avatar>
            <q-icon name="format_quote" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cytaty </q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="isAdmin" to="/quote/add" clickable>
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj cytat</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/" clickable>
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Statystyki</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="isAdmin" to="/admin" clickable>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Panel admina</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/info" clickable>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Info</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
@use '~/layouts/global.scss';
#layout {
  // background-image: linear-gradient(to bottom right, rgb(68, 64, 64), rgb(238, 238, 238));
}

#drawer {
  background-color: rgb(215, 231, 231);
  border-color: black;
}
</style>
