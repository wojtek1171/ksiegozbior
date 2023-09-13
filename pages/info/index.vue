<script setup>
onMounted(() => {
  useMeta({
    title: 'Info',
  });
});
</script>

<template>
  <q-page class="q-py-xl q-px-xs for-page">
    <q-card class="info-card">
      <q-card-section>
        <div class="text-h5 text-center">Info</div>
        <div class="text-center text-body1">
          Aplikacja powstała z myślą o umożliwieniu każdemu katalogowanie i zarządzanie własnym księgozbiorem oraz bazą cytatów.
        </div>
        <div class="q-mt-sm text-center text-body1">
          Instalacja aplikacji na własnym serwerze pozwala na łatwy dostęp do swojej bazy przez przeglądarkę, a technologia PWA ułatwia
          korzystanie z niej także na urządzeniach mobilnych.
        </div>

        <div class="q-mt-lg text-h5 text-center">Kod i zgłaszanie problemów:</div>
        <div class="text-center text-body1"><a class="link" href="https://github.com/wojtek1171/ksiegozbior" target="blank">Github</a></div>

        <div class="q-mt-lg text-h5 text-center">Licencja:</div>
        <div class="text-center text-body1"><a class="link" href="https://www.gnu.org/licenses/agpl-3.0.html" target="blank">AGPL-3.0</a></div>

        <div class="q-mt-lg text-h5 text-center">Wersja:</div>
        <div class="text-center text-body1">1.0.0</div>
      </q-card-section>
    </q-card>

    <div class="q-my-lg text-h5 text-center">W projekcie wykorzystano:</div>
    <div class="row flex items-center justify-center q-gutter-lg">
      <div>
        <q-img src="~/assets/info-page/nuxt-logo.png" width="150px" />
      </div>
      <div>
        <q-img src="~/assets/info-page/vue-logo.png" width="130px" />
      </div>

      <div class="qnter">
        <q-img src="~/assets/info-page/mongo-logo.png" width="300px" />
      </div>
      <div>
        <q-img src="~/assets/info-page/quasar-logo.png" width="140px" />
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.info-card {
  margin: auto;
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: 25px;
  max-width: 550px;
}
</style>
