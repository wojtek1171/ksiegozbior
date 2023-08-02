import { env } from 'process';
import { User } from '~/server/models/user.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const user = await User.findOne({ name: body.username });

    if (user && user.password === body.password) {
      return user.token;
    } else {
      return { message: 'No user found' };
    }
  } catch (e) {
    throw createError({ message: e.message });
  }
});
