export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await Shelf.create(body);
    return { message: 'Shelf created' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
