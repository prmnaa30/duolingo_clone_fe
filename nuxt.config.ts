/* eslint-disable @typescript-eslint/no-explicit-any */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion',
    '@vueuse/sound/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/seo'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      titleTemplate: '%s | Meowlingo',
      title: 'Meowlingo - Belajar Bahasa Jepang',
      meta: [
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://meowlingo.vercel.app',
    name: 'Meowlingo',
    description: 'Platform belajar Bahasa Jepang yang seru dan interaktif bersama Mochi.',
    defaultLocale: 'id'
  },

  colorMode: {
    preference: 'system',
    fallback: 'light'
  },

  runtimeConfig: {
    public: {
      baseApi: ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    server: {
      allowedHosts: ['.ngrok-free.dev']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [{ name: 'Nunito', provider: 'google' }]
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      }
    ]
  },

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      navigateFallbackDenylist: [/^\/auth\/callback/],
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,mp3}']
    },
    manifest: {
      name: 'Meowlingo',
      short_name: 'Meowlingo',
      description: 'Belajar Bahasa Jepang bersama Mochi!',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },

    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  sitemap: {
    urls: async () => {
      try {
        const response = await fetch(`${process.env.NUXT_PUBLIC_BASE_API || ''}/units`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        return data.data?.map((unit: any) => ({
          loc: `/units/${unit.id}`,
          changefreq: 'weekly',
          priority: 0.8
        })) || []
      } catch (error) {
        console.error('Gagal mengambil data untuk sitemap', error)
        return []
      }
    }
  },

  sound: {
    sounds: {
      scan: true
    }
  }
})
