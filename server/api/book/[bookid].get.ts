import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const bookid = event.context.params.bookid;
  const book = await Book.findById(bookid);

  return book;
});
