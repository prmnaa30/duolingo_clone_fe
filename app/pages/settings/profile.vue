<template>
  <div class="min-h-[calc(100vh-3.5rem)] bg-bg">
    <UContainer class="flex-1 w-full pt-8">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-6"
        @submit="onSubmit"
      >
        <SettingsAvatarPicker
          :current-avatar="authStore.user?.avatar_url!"
          @update:file="selectedFile = $event"
        />

        <UFormField
          label="Nama"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            placeholder="Siapa namamu?"
            icon="i-heroicons-user"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <USeparator class="my-4" />

        <SettingsCredentials
          v-model:old-password="state.old_password"
          v-model:new-password="state.new_password"
          :is-google-auth="isGoogleAuth"
          :email="authStore.user?.email"
        />

        <div class="pt-6">
          <BaseButton
            type="submit"
            color="success"
            class="w-full h-14"
            :loading="authStore.loading"
          >
            Simpan Perubahan
          </BaseButton>
        </div>
      </UForm>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import BaseButton from '~/components/ui/BaseButton.vue'

definePageMeta({
  layout: 'settings'
})

const authStore = useAuthStore()

const isGoogleAuth = computed(() => {
  return authStore.user?.provider === 'google'
})

const selectedFile = ref<File | null>(null)

const schema = z
  .object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
    old_password: z.string().optional(),
    new_password: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (!isGoogleAuth.value) {
      if (data.new_password && data.new_password.length > 0) {
        if (data.new_password.length < 6) {
          ctx.addIssue({
            code: 'custom',
            message: 'Password baru minimal 8 karakter',
            path: ['new_password']
          })
        }
        if (!data.old_password || data.old_password.length === 0) {
          ctx.addIssue({
            code: 'custom',
            message: 'Password lama wajib diisi',
            path: ['old_password']
          })
        }
      }
    }
  })

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: authStore.user?.name || '',
  old_password: '',
  new_password: ''
})

const onSubmit = async () => {
  const formData = new FormData()

  if (state.name) {
    formData.append('name', state.name)
  }

  if (selectedFile.value) {
    formData.append('avatar', selectedFile.value)
  }

  if (state.new_password) {
    formData.append('password', state.new_password)
  }

  authStore.updateProfile(formData)
}
</script>
