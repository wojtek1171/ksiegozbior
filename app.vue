<script setup lang="ts">
//import { ref } from 'vue';

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<template>
  <q-layout class="bg-grey-3" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-grey-6">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="toolbar-title"> App </q-toolbar-title>
        <div><q-btn round size="sm" color="grey-9" to="/"></q-btn></div>
      </q-toolbar>
    </q-header>

    <q-drawer class="bg-grey-7 text-white" id="drawer" v-model="leftDrawerOpen" :width="230" show-if-above>
      <q-list>
        <q-item-label class="text-white" header> Menu </q-item-label>

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

        <q-item to="/add-book" clickable>
          <q-item-section avatar>
            <q-icon name="library_add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj książkę</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/favourites" clickable>
          <q-item-section avatar>
            <q-icon name="format_quote" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cytaty </q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/random" clickable>
          <q-item-section avatar>
            <q-icon name="add" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dodaj cytat</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/options" clickable>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Admin panel</q-item-label>
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

    <q-page-container class="bg-grey-3">
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>
