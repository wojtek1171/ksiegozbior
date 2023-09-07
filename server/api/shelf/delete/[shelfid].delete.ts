import { Shelf } from '~/server/models/shelf.schema';

export default defineEventHandler(async (event) => {
  const shelfid = event.context.params?.shelfid;

  try {
    const response = await Shelf.findByIdAndDelete(shelfid);
    return { message: 'Shelf deleted' };
  } catch (e) {
    throw createError({ message: e.message });
  }
});
