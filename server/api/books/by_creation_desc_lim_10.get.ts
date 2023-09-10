import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const books = await Book.find().sort({ created: -1 }).limit(10);

  return books;
});
