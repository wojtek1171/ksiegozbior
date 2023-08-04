import { Quote } from '~/server/models/quote.schema';

export default defineEventHandler(async (event) => {
  const count = await Quote.countDocuments();

  return count;
});
