<template>
  <aside class="hidden md:flex flex-col fixed left-0 top-0 z-50 bg-surface border-r-2 border-gray-400 dark:border-primary h-screen w-64 py-6 px-4">
    <div
      class="flex items-center gap-3 px-4 mb-10 cursor-pointer"
      @click="navigateTo('/learning-map')"
    >
      <img
        :src="flatMochi"
        alt="Meowlingo"
        class="w-10 h-10 drop-shadow-sm"
      >
      <h1 class="text-2xl font-black text-primary tracking-wide">
        Meowlingo
      </h1>
    </div>

    <UNavigationMenu
      orientation="vertical"
      :items="navLinks"
      :ui="{
        root: 'w-full',
        list: 'flex flex-col gap-4'
      }"
    />
  </aside>
</template>

<script setup lang="ts">
import flatMochi from '~/assets/icons/flatmochi.svg'
import type { NavigationMenuItem } from '@nuxt/ui'

const navLinks = ref<NavigationMenuItem[]>([
  {
    label: 'Belajar',
    icon: 'i-custom:home',
    to: '/learning-map',
    ui: {
      link: 'text-[#C64602]! font-bold text-lg p-3 hover:bg-[#C64602]/10 rounded-xl transition-colors',
      linkLeadingIcon: 'size-8 text-[#C64602]!'
    }
  },
  {
    label: 'Huruf',
    icon: 'i-custom:kana',
    to: '/kana',
    ui: {
      link: 'text-[#20C602]! font-bold text-lg p-3 hover:bg-[#20C602]/10 rounded-xl transition-colors',
      linkLeadingIcon: 'size-8 text-[#20C602]!'
    }
  },
  {
    label: 'Peringkat',
    icon: 'i-custom:leaderboard',
    to: '/leaderboard',
    ui: {
      link: 'text-[#A802C6]! font-bold text-lg p-3 hover:bg-[#A802C6]/10 rounded-xl transition-colors',
      linkLeadingIcon: 'size-8 text-[#A802C6]!'
    }
  },
  {
    label: 'Profil',
    icon: 'i-custom:profile',
    to: '/profile',
    ui: {
      link: 'text-[#0282C6]! font-bold text-lg p-3 hover:bg-[#0282C6]/10 rounded-xl transition-colors',
      linkLeadingIcon: 'size-8 text-[#0282C6]!'
    }
  },
  {
    label: 'Pengaturan',
    icon: 'i-custom:setting',
    to: '/settings',
    ui: {
      link: 'text-[#747C71]! font-bold text-lg p-3 hover:bg-[#747C71]/10 rounded-xl transition-colors',
      linkLeadingIcon: 'size-8 text-[#747C71]!'
    }
  }
])
</script>

<style scoped>
:deep(.router-link-active) {
  background-color: var(--color-surface);
  border: 2px solid;
  border-color: currentColor;
}
</style>
