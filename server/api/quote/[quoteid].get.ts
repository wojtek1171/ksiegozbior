import { Quote } from '~/server/models/quote.schema';

export default defineEventHandler(async (event) => {
  const quoteid = event.context.params.quoteid;
  const quote = await Quote.findById(quoteid);

  return quote;
});
