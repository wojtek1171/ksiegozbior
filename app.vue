<script setup lang="ts">
//import { ref } from 'vue';

const leftDrawerOpen = ref(true);

const { isAdmin, authorize } = useAuth();
authorize();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" id="layout">
    <q-header elevated>
      <q-toolbar class="bg-grey-6">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="bg-grey- toolbar-title"> App </q-toolbar-title>
        <div><q-btn round size="sm" color="grey-9" to="/login"></q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-grey-5" id="drawer" v-model="leftDrawerOpen" :width="230" show-if-above>
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

        <q-item to="/book/add" clickable>
          <q-item-section avatar>
            <q-icon name="library_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj książkę</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/" clickable>
          <q-item-section avatar>
            <q-icon name="format_quote" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cytaty </q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/" clickable>
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj cytat</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="isAdmin" to="/admin" clickable>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Admin panel</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/book/60bf1b381a34c8191ddf50c1" clickable>
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
</style>
