/* eslint-disable @typescript-eslint/no-explicit-any */
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const token = useCookie('auth')

  if (to.path.startsWith('/auth/callback')) {
    return
  }

  if (token.value && !authStore.user?.stats) {
    try {
      await authStore.fetchUser()
    } catch (error: any) {
      const status = error.response?.status || error.statusCode

      if (status === 401 && to.path !== '/login') {
        return navigateTo('/login')
      }
    }
  }

  const publicRoutes = ['/login', '/register', '/auth']
  const isPublicRoute = publicRoutes.some(route => to.path.startsWith(route))

  if (!token.value && !isPublicRoute) {
    return navigateTo('/login')
  }
})
