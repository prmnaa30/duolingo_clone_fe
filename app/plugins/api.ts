export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    onRequest(context) {
      const { options } = context
      options.headers = options.headers || {};

      (options.headers as unknown as Record<string, string>)['ngrok-skip-browser-warning'] = 'true'
    }
  })

  nuxtApp.provide('api', api)
})
