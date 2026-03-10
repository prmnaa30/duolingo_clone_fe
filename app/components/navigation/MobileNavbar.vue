<template>
  <UContainer class="fixed bottom-0 z-50 bg-surface border-t-2 border-gray-400 dark:border-primary h-20 w-full">
    <UNavigationMenu
      :items="navLinks"
      :ui="{ root: 'flex justify-center', list: 'flex gap-8' }"
    />
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navLinks = ref<NavigationMenuItem[]>([
  {
    icon: 'i-custom:home',
    to: '/learning-map',
    ui: {
      link: 'text-[#C64602]!',
      linkLeadingIcon: 'size-8 text-[#C64602]!'
    }
  },
  {
    icon: 'i-custom:kana',
    to: '/kana',
    ui: {
      link: 'text-[#20C602]!',
      linkLeadingIcon: 'size-8 text-[#20C602]!'
    }
  },
  {
    icon: 'i-custom:leaderboard',
    to: '/leaderboard',
    ui: {
      link: 'text-[#A802C6]!',
      linkLeadingIcon: 'size-8 text-[#A802C6]!'
    }
  },
  {
    icon: 'i-custom:profile',
    to: '/profile',
    ui: {
      link: 'text-[#0282C6]!',
      linkLeadingIcon: 'size-8 text-[#0282C6]!'
    }
  }
])
</script>

<style scoped>

</style>
