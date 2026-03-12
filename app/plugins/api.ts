export default defineNuxtPlugin(() => {
  globalThis.$fetch = $fetch.create({
    onRequest({ options }) {
      const headers = new Headers(options.headers)

      headers.set('ngrok-skip-browser-warning', 'true')

      options.headers = headers
    }
  })
})
