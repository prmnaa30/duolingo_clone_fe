<template>
  <UPage>
    <HeaderMain />

    <slot />
  </UPage>
</template>

<script setup lang="ts">
import HeaderMain from '~/components/layout/HeaderMain.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})
</script>

<style scoped>

</style>
