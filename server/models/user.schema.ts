import { defineMongooseModel } from '#nuxt/mongoose';

export const User = defineMongooseModel({
  name: 'User',
  schema: {
    name: String,
    password: String,
    token: String,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  options: {},
  hooks(schema) {},
});
