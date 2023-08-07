export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await $fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID f0ea04148a54268',
      'Content-Type': 'multipart/form-data',
      'User-Agent': 'PostmanRuntime/7.32.3',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alice',
      'Access-Control-Allow-Origin': '*',
    },
    body: body,
  });

  return response;
});
