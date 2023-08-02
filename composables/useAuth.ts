export default function useAuth() {
  const isAdmin = ref(false);
  const config = useRuntimeConfig();

  async function authorize() {
    const token = useCookie('token');
    if (token.value == config.public.token) {
      isAdmin.value = true;
    }
  }

  return {
    isAdmin,
    authorize,
  };
}
