<script setup lang="ts">
const sharedState = useState('alert');

const isBanner = ref(false);

function dismissBanner() {
  isBanner.value = false;
  clearNuxtState('alert');
}

onMounted(() => {
  isBanner.value = sharedState?.value?.isVisible;
});
</script>

<template>
  <BookDetails />
  <q-banner v-if="isBanner" class="bg-green-4 banner-bd">
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
.banner-bd {
  position: absolute;
  border-radius: 20px;
  top: 55px;
  right: 5px;
}
</style>
