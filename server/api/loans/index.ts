import { Loan } from '~/server/models/loan.schema';

export default defineEventHandler(async (event) => {
  const loanes = await Loan.find();

  return loanes;
});
