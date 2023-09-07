import { Shelf } from '~/server/models/shelf.schema';

export default defineEventHandler(async (event) => {
  const count = await Shelf.countDocuments();

  return count;
});
