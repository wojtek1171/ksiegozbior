import { Shelf } from '~/server/models/shelf.schema';

export default defineEventHandler(async (event) => {
  const shelves = await Shelf.find().sort({ pinned: -1 }).sort({ name: 1 }).collation({ locale: 'pl', caseLevel: false });

  return shelves;
});
