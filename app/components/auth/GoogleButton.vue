<template>
  <BaseButton
    color="neutral"
    class="w-full h-10 opacity-80"
    @click="handleGoogleLogin"
  >
    <template #iconLeft>
      <img
        :src="google"
        class="h-4"
      >
    </template>
    <template #default>
      Google
    </template>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import google from '~/assets/icons/google.svg'

const authStore = useAuthStore()

const handleGoogleLogin = () => {
  authStore.loginWithGoogle()
}
</script>
