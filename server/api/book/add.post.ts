export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const response = await Book.create(body);

  return response;
});