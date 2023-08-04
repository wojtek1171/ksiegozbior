import { Quote } from '~/server/models/quote.schema';

export default defineEventHandler(async (event) => {
  const quotes = await Quote.find().sort({ created: -1 });

  return quotes;
});
