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
      link: 'text-orange-500!',
      linkLeadingIcon: 'size-8 text-orange-500!'
    }
  },
  {
    icon: 'i-custom:kana',
    to: '/kana',
    ui: {
      link: 'text-green-500!',
      linkLeadingIcon: 'size-8 text-green-500!'
    }
  },
  {
    icon: 'i-custom:profile',
    to: '/profile',
    ui: {
      link: 'text-blue-500!',
      linkLeadingIcon: 'size-8 text-blue-500!'
    }
  }
])
</script>

<style scoped>

</style>
