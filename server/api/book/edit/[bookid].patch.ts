import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const bookid = event.context.params?.bookid;

  const response = await Book.findByIdAndUpdate(bookid, body);

  return response;
});
