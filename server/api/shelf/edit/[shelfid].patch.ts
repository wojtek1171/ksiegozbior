import { Shelf } from '~/server/models/shelf.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const shelfid = event.context.params?.shelfid;

  try {
    const response = await Shelf.findByIdAndUpdate(shelfid, body);
    return { message: 'Shelf updated' };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
