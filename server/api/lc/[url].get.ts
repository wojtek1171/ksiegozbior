export default defineEventHandler(async (event) => {
  const url = event.context.params.url;
  const originalUrl = url.replaceAll('&', '/');

  const response = await $fetch(`https://${originalUrl}`, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  return response;
});
