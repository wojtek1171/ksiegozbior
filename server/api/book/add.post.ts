export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await Book.create(body);
    return { message: 'Book created' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
