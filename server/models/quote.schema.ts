import { defineMongooseModel } from '#nuxt/mongoose';

export const Quote = defineMongooseModel({
  name: 'Quote',
  schema: {
    bookTitle: String,
    authors: String,
    bookId: String,
    text: String,
    tags: String,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  options: {},
  hooks(schema) {},
});
