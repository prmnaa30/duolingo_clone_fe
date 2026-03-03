// ? fetch user data biar user data selalu tersedia untuk SSR
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const token = useCookie('auth')

  if (token.value && !authStore.user?.stats) {
    await authStore.fetchUser()
  }
})
