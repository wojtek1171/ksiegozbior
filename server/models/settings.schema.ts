import { defineMongooseModel } from '#nuxt/mongoose';

export const Settings = defineMongooseModel({
  name: 'Settings',
  schema: {
    user: String,
    meters: Number,
    statisticsInitialYear: Number,
    expensesVisibleToGuests: Boolean,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  options: {},
  hooks(schema) {},
});
