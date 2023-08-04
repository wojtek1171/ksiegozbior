import { Quote } from '~/server/models/quote.schema';

export default defineEventHandler(async (event) => {
  const quoteid = event.context.params?.quoteid;

  try {
    const response = await Quote.findByIdAndDelete(quoteid);
    return { message: 'Quote deleted' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
