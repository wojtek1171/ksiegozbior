import { defineMongooseModel } from '#nuxt/mongoose';

export const Loan = defineMongooseModel({
  name: 'Loan',
  schema: {
    bookId: String,
    bookTitle: String,
    bookAuthors: String,
    borrower: String,
    returned: Boolean,
    lendingDate: Date,
    returnDate: Date,
    onLoanDays: Number,
    notes: String,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  options: {},
  hooks(schema) {},
});
