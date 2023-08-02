export default defineNuxtRouteMiddleware((to, from) => {
  const { isAdmin, authorize } = useAuth();
  authorize();

  const adminPages = ['/admin', '/book/add'];

  if (adminPages.includes(to.path) && !isAdmin.value) {
    return navigateTo('/');
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  // if (to.path !== '/') {
  //   return navigateTo('/')
  // }
});
