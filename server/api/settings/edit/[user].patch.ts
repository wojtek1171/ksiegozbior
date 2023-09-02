import { Settings } from '~/server/models/settings.schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = event.context.params?.user;

  try {
    const settings = await Settings.findOneAndUpdate({ user: user }, body);
    return { message: 'Ustawienia zostały zmienione' };
  } catch (e) {
    throw createError({
      message: 'Could not save data.',
    });
  }
});
