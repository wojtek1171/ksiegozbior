export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await Loan.create(body);
    return { message: 'Loan created' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
