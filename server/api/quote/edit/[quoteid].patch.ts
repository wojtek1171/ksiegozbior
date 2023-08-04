import { Quote } from '~/server/models/quote.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const quoteid = event.context.params?.quoteid;

  try {
    const response = await Quote.findByIdAndUpdate(quoteid, body);
    return { message: 'Quote updated' };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
