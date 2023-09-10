import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const count = await Book.countDocuments();

  return count;
});
