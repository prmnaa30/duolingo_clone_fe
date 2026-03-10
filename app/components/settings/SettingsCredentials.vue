<template>
  <div class="space-y-4">
    <h3 class="font-bold text-text-title">
      Keamanan Akun
    </h3>

    <div
      v-if="isGoogleAuth"
      class="bg-gray-50 dark:bg-gray-800 border-2 border-grey rounded-2xl p-4"
    >
      <div class="flex items-center gap-3 mb-3">
        <UIcon
          name="i-custom:google"
          class="w-6 h-6"
        />
        <span class="font-bold text-sm text-text-title">Terhubung dengan Google</span>
      </div>
      <UFormField
        label="Email"
        name="email"
      >
        <UInput
          :model-value="email"
          disabled
          size="md"
          class="w-full opacity-70"
        />
      </UFormField>
      <p class="text-[10px] text-text-muted mt-2 leading-tight">
        Password dikelola oleh Google.
      </p>
    </div>

    <template v-else>
      <UFormField
        label="Password Lama"
        name="old_password"
      >
        <UInput
          v-model="oldPassword"
          type="password"
          placeholder="Masukkan password saat ini"
          icon="i-heroicons-lock-closed"
          size="lg"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Password Baru"
        name="new_password"
      >
        <UInput
          v-model="newPassword"
          type="password"
          placeholder="Buat password baru (min. 6 karakter)"
          icon="i-heroicons-key"
          size="lg"
          class="w-full"
        />
      </UFormField>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isGoogleAuth: boolean
  email?: string
}>()

const oldPassword = defineModel('oldPassword', { type: String, default: '' })
const newPassword = defineModel('newPassword', { type: String, default: '' })
</script>
