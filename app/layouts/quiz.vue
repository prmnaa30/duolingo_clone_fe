<template>
  <UPage>
    <HeaderQuiz />

    <slot />
  </UPage>
</template>

<script setup lang="ts">
import HeaderQuiz from '~/components/layout/HeaderQuiz.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})
</script>

<style scoped>

</style>
