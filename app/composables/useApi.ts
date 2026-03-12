export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('auth')

  return $fetch.create({
    baseURL: config.public.baseApi,
    onRequest({ options }) {
      options.headers = new Headers(options.headers)

      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }

      options.headers.set('ngrok-skip-browser-warning', 'true')

      if (import.meta.server) {
        options.headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        token.value = null
      }
    }
  })
}
