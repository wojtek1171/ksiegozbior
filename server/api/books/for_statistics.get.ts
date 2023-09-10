import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const books = await Book.find().select('authors tags read publisher purchasePrice purchaseDate');

  return books;
});
