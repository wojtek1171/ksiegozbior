import { Shelf } from '~/server/models/shelf.schema';

export default defineEventHandler(async (event) => {
  const bookid = event.context.params?.bookid;

  const shelves = await Shelf.find({ books: bookid });

  return shelves;
});
