export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await Quote.create(body);
    return { message: 'Quote created' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
