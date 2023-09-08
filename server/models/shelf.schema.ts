import { defineMongooseModel } from '#nuxt/mongoose';

export const Shelf = defineMongooseModel({
  name: 'Shelf',
  schema: {
    name: String,
    books: [String],
    pinned: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  options: {},
  hooks(schema) {},
});
