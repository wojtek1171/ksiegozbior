<script setup lang="ts">
const loginData = ref({
  username: '',
  password: '',
});

async function login() {
  const response = await useFetch('/api/user/login', {
    method: 'POST',
    body: {
      username: loginData.value.username,
      password: loginData.value.password,
    },
  });
  if (response.data.value.message) {
  } else {
    const token = useCookie('token');
    token.value = response.data.value;
  }
}

onMounted(() => {
  console.log('fsdf');
});
</script>

<template>
  <q-page class="q-pa-lg">
    <q-card class="q-pa-lg base-card">
      <q-card-section class="q-gutter-md">
        <q-input v-model="loginData.username" rounded outlined label="login"></q-input>
        <q-input v-model="loginData.password" rounded outlined type="password" label="hasło"></q-input>
        <q-btn @click="login">LOGIN</q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss">
.base-card {
  margin: auto;
  max-width: 400px;
  background-color: rgb(255, 255, 255, 0.2);
}
</style>
