import { Book } from '~/server/models/book.schema';

export default defineEventHandler(async (event) => {
  const bookid = event.context.params?.bookid;

  try {
    const response = await Book.findByIdAndDelete(bookid);
    return { message: 'Book deleted' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
