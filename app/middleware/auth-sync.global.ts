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
      if (error.statusCode === 401 && to.path !== '/login') {
        return navigateTo('/login')
      }
    }
  }
})
