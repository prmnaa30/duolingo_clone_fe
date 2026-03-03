// ? fetch user data biar user data selalu tersedia untuk SSR
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const token = useCookie('auth')

  if (token.value && !authStore.user?.stats) {
    try {
      await authStore.fetchUser()
    } catch {
      if (to.path !== '/login') {
        return navigateTo('/login')
      }
    }
  }
})
