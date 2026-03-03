export default defineNuxtRouteMiddleware((to, _from) => {
  const token = useCookie('auth')
  const isPublicRoute = to.meta.auth === false

  if (!token.value && !isPublicRoute) {
    return navigateTo('/login')
  }

  if (token.value && (to.path === '/login' || to.path === '/')) {
    return navigateTo('/learning-map')
  }
})
