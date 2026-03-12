<template>
  <UForm
    :schema="schema"
    :state="state"
    class="grid grid-cols-1 gap-2 mt-6"
    @submit="handleSubmit"
  >
    <UFormField name="email">
      <UInput
        v-model="state.email"
        placeholder="Email"
        variant="subtle"
        class="w-full"
        :ui="{
          base: 'px-4 py-2 md:py-3 md:pt-4 rounded-lg ring-2 ring-gray-300 ring-gray-300 dark:ring-gray-700 placeholder:text-text-grey placeholder:text-lg text-lg',
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
          base: 'px-4 py-2 md:py-3 md:pt-4 rounded-lg ring-2 ring-gray-300 dark:ring-gray-700 placeholder:text-text-grey placeholder:text-lg text-lg',
          trailing: 'pe-1'
        }"
        :type="show ? 'text' : 'password'"
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
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
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
          {{ authStore.loading ? 'Mencoba login...' : 'Masuk' }}
        </span>
      </div>
    </BaseButton>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import BaseButton from '../ui/BaseButton.vue'

const authStore = useAuthStore()

const schema = z.object({
  email: z.email('Email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, { message: 'Password minimal 8 karakter' })
    .regex(/[A-Z]/, { message: 'Sisipkan setidaknya 1 huruf kapital' })
    .regex(/[a-z]/, { message: 'Sisipkan setidaknya 1 huruf kecil' })
    .regex(/[0-9]/, { message: 'Sisipkan setidaknya 1 angka' })
})

type Schema = z.output<typeof schema>

const show = ref(false)
const state = reactive<Partial<Schema>>({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  await authStore.login({
    email: state.email!,
    password: state.password!
  })
}
</script>
