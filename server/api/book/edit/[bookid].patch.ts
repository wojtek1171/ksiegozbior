import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const bookid = event.context.params?.bookid;

  try {
    const response = await Book.findByIdAndUpdate(bookid, body);
    return { message: 'Book updated' };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
