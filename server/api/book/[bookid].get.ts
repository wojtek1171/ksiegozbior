import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const book = await Book.findById(event.context.params.bookid);

  return book;
});
