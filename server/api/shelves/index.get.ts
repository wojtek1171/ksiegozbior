import { Shelf } from '~/server/models/shelf.schema';

export default defineEventHandler(async (event) => {
  const shelves = await Shelf.find();

  return shelves;
});
