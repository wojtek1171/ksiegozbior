import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const books = await Book.find().select('authors pages purchasePrice retailPrice');

  return books;
});
