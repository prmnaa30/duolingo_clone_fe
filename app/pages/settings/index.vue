<template>
  <UContainer class="min-h-[calc(100vh-5rem)] flex flex-col justify-between">
    <div class="mt-4 border border-accented bg-surface rounded-2xl overflow-hidden">
      <div
        v-for="(setting, index) in settings"
        :key="setting.title"
      >
        <SettingsLink
          :to="setting.to"
          :title="setting.title"
        />

        <USeparator v-if="index < settings.length - 1" />
      </div>
    </div>

    <div class="">
      <BaseButton
        class="h-14 w-full"
        color="danger"
        @click="handleLogout"
      >
        <template #iconLeft>
          <UIcon
            name="i-heroicons-outline:logout"
            class="size-6"
          />
        </template>

        <template #default>
          <span class="text-lg">Logout</span>
        </template>
      </BaseButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import SettingsLink from '~/components/settings/SettingsLink.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

const authStore = useAuthStore()

interface SettingLink {
  to: string
  title: string
}

definePageMeta({
  layout: 'settings'
})

const settings: SettingLink[] = [
  {
    to: '/settings/profile',
    title: 'Akun'
  },
  {
    to: '/settings/appearance',
    title: 'Tampilan'
  }
]

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>

</style>
