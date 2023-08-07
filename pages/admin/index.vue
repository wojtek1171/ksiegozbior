<script setup lang="ts">
definePageMeta({
  middleware: 'adminguard',
});

const config = useRuntimeConfig();
const imageFile = ref(null);
const imgurResponse = ref('cos');

async function uploadFile() {
  console.log(imageFile.value);
  // const response = useFetch('/api/imgur/upload', {
  //   method: 'POST',
  //   body: imageFile.valued
  // })
  const clientId = config.public.imgurId;
  console.log;
  const response = await $fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${clientId}`,
      // 'Content-Type' : 'multipart/form-data',
      // 'User-Agent' : 'PostmanRuntime/7.32.3',
      // 'Accept' : '*/*',
      // 'Accept-Encoding' : 'gzip, deflate, br',
      // 'Connection' : 'keep-alice',
      // 'Access-Control-Allow-Origin': '*',
    },
    body: imageFile.value,
  });
  imgurResponse.value = response.data.link;
  console.log(response);
}
</script>

<template>
  <div class="text-h3">Admin page</div>

  <div class="row">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-file color="purple-12 text-black" v-model="imageFile" label="Label">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
      <q-btn @click="uploadFile">Upload </q-btn>
    </div>
    <div>{{ imgurResponse }}</div>
  </div>
</template>

<style lang="scss"></style>
