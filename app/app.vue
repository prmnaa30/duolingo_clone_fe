<template>
  <UApp :toaster="{ position: 'top-center' }">
    <VitePwaManifest />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <PwaInstallPrompt />
  </UApp>
</template>

<script setup>
import PwaInstallPrompt from './components/PwaInstallPrompt.vue'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preload', href: '/sounds/sprite_assets.mp3' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'MeowLingo'
const description = 'Learn Language with AI Feedback!'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,

  ogTitle: title,
  ogDescription: 'Mulai petualangan belajar bahasa Jepangmu dari nol bersama Mochi di Meowlingo!',
  ogImage: 'https://meowlingo.vercel.app/images/mochi-og.png',
  ogUrl: 'https://meowlingo.vercel.app',
  ogType: 'website',

  twitterCard: 'summary_large_image',
  twitterTitle: 'Belajar Bahasa Jepang Seru di Meowlingo',
  twitterDescription: 'Kuasai Hiragana dan Katakana dengan metode seru bersama AI!',
  twitterImage: 'https://meowlingo.vercel.app/images/mochi-og.png'
})
</script>
