import { Settings } from '~/server/models/settings.schema';

export default defineEventHandler(async (event) => {
  const user = event.context.params.user;

  try {
    const settings = await Settings.findOne({ user: user });
    return settings;
  } catch (e) {
    throw createError({ message: e.message });
  }
});
