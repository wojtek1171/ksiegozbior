import { Quote } from '~/server/models/quote.schema';

export default defineEventHandler(async (event) => {
  const bookid = event.context.params.bookid;
  const quotes = await Quote.find({ bookId: bookid });

  return quotes;
});
