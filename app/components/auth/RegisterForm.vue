<template>
  <UForm
    :schema="schema"
    :state="state"
    class="grid grid-cols-1 gap-4 mt-6"
    @submit="handleSubmit"
  >
    <UFormField name="name">
      <UInput
        v-model="state.name"
        placeholder="Nama"
        variant="subtle"
        class="w-full"
        :ui="{
          base: 'px-4 py-2 rounded-lg ring-2 ring-gray-300 placeholder:text-text-grey placeholder:text-lg text-lg',
          trailing: 'pe-1'
        }"
      >
        <template
          v-if="state.name?.length"
          #trailing
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            tabindex="-1"
            icon="i-lucide-circle-x"
            aria-label="Clear name input"
            @click="state.name = ''"
          />
        </template>
      </UInput>

      <template #error="{ error }">
        <div
          v-if="error"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="size-5"
          />
          <span>{{ error }}</span>
        </div>
      </template>
    </UFormField>

    <UFormField name="email">
      <UInput
        v-model="state.email"
        placeholder="Email"
        variant="subtle"
        class="w-full"
        :ui="{
          base: 'px-4 py-2 rounded-lg ring-2 ring-gray-300 placeholder:text-text-grey placeholder:text-lg text-lg',
          trailing: 'pe-1'
        }"
      >
        <template
          v-if="state.email?.length"
          #trailing
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            tabindex="-1"
            icon="i-lucide-circle-x"
            aria-label="Clear email input"
            @click="state.email = ''"
          />
        </template>
      </UInput>

      <template #error="{ error }">
        <div
          v-if="error"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="size-5"
          />
          <span>{{ error }}</span>
        </div>
      </template>
    </UFormField>

    <UFormField name="password">
      <UInput
        v-model="state.password"
        placeholder="Password"
        variant="subtle"
        class="w-full"
        :ui="{
          base: 'px-4 py-2 rounded-lg ring-2 ring-gray-300 placeholder:text-text-grey placeholder:text-lg text-lg',
          trailing: 'pe-1'
        }"
        :type="showPassword ? 'text' : 'password'"
      >
        <template
          v-if="state.password?.length"
          #trailing
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            tabindex="-1"
            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            aria-controls="password"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>

      <template #error="{ error }">
        <div
          v-if="error"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="size-5"
          />
          <span>{{ error }}</span>
        </div>
      </template>
    </UFormField>

    <UFormField name="password_confirmation">
      <UInput
        v-model="state.password_confirmation"
        placeholder="Konfirmasi Password"
        variant="subtle"
        class="w-full"
        :ui="{
          base: 'px-4 py-2 rounded-lg ring-2 ring-gray-300 placeholder:text-text-grey placeholder:text-lg text-lg',
          trailing: 'pe-1'
        }"
        :type="showConfirmationPassword ? 'text' : 'password'"
      >
        <template
          v-if="state.password_confirmation?.length"
          #trailing
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            tabindex="-1"
            :icon="showConfirmationPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showConfirmationPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showConfirmationPassword"
            aria-controls="password"
            @click="showConfirmationPassword = !showConfirmationPassword"
          />
        </template>
      </UInput>

      <template #error="{ error }">
        <div
          v-if="error"
          class="flex items-center gap-2"
        >
          <UIcon
            name="i-heroicons-exclamation-triangle"
            class="size-5"
          />
          <span>{{ error }}</span>
        </div>
      </template>
    </UFormField>

    <BaseButton
      type="submit"
      class="mt-4"
      :disabled="authStore.loading"
    >
      <div class="flex gap-2 items-center">
        <UIcon
          v-if="authStore.loading"
          name="i-ant-design:loading-outlined"
          class="animate-spin block mb-1"
        />
        <span class="block">
          {{ authStore.loading ? 'Sedang registrasi...' : 'Registrasi' }}
        </span>
      </div>
    </BaseButton>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import BaseButton from '../ui/BaseButton.vue'

const authStore = useAuthStore()

const passwordRules = z
  .string()
  .min(1, 'Password wajib diisi')
  .min(8, { message: 'Password minimal 8 karakter' })
  .regex(/[A-Z]/, { message: 'Sisipkan setidaknya 1 huruf kapital' })
  .regex(/[a-z]/, { message: 'Sisipkan setidaknya 1 huruf kecil' })
  .regex(/[0-9]/, { message: 'Sisipkan setidaknya 1 angka' })

const schema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
  password: passwordRules,
  password_confirmation: z.string().min(1, 'Konfirmasi password wajib diisi')
}).refine(data => data.password === data.password_confirmation, {
  message: 'Password tidak cocok.',
  path: ['password_confirmation']
})

type Schema = z.infer<typeof schema>

const showPassword = ref(false)
const showConfirmationPassword = ref(false)

const state = reactive<Partial<Schema>>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleSubmit = async () => {
  await authStore.register({
    name: state.name!,
    email: state.email!,
    password: state.password!,
    password_confirmation: state.password_confirmation!
  })
}
</script>
