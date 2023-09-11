import { Loan } from '~/server/models/loan.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const loanid = event.context.params?.loanid;

  try {
    const response = await Loan.findByIdAndUpdate(loanid, body);
    return { message: 'Loan updated' };
  } catch (e) {
    throw createError({
      message: e.message,
    });
  }
});
