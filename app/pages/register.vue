<template>
  <UPage>
    <UContainer class="w-80 lg:w-100 mt-12">
      <h1 class="font-bold text-2xl text-center">
        Register
      </h1>

      <RegisterForm />

      <USeparator
        class="my-4"
        size="md"
        label="OR"
        :ui="{ label: 'text-neutral-500/70 font-bold' }"
      />

      <GoogleButton />

      <p class="text-sm text-center mt-4">
        Sudah punya akun?
        <NuxtLink
          to="/login"
          class="google-button transition-colors duration-200 font-semibold cursor-pointer"
        >
          Login
        </NuxtLink>
      </p>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
  layout: 'unauthenticated'
})

const GoogleButton = defineAsyncComponent(() => import('~/components/auth/GoogleButton.vue'))
const RegisterForm = defineAsyncComponent(() => import('~/components/auth/RegisterForm.vue'))
</script>

<style lang="css" scoped>
.google-button:hover {
  color: color-mix(in srgb, var(--color-primary), black 25%);
}

.google-button {
  color: var(--color-primary);
}
</style>
