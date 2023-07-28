import { defineMongooseModel } from '#nuxt/mongoose';

export const Book = defineMongooseModel({
  name: 'Book',
  schema: {
    title: String,
    authors: String,
    publisher: String,
    publicationDate: Number,
    pages: Number,
    cover: String,
    purchasePrice: Number,
    retailPrice: Number,
    read: Boolean,
    purchaseDate: Date,
    translators: String,
    originalTitle: String,
    tags: String,
    series: String,
    seriesVol: Number,
    publSeries: String,
    isbn: Number,
    note: String,
    description: String,
    image: {
      type: String,
      default: 'https://i.imgur.com/rpVYMUX.jpeg',
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  options: {},
  hooks(schema) {},
});
