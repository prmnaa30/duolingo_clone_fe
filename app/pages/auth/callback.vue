<template>
  <UPage class="min-h-screen">
    <UContainer class="flex flex-col items-center justify-center h-screen">
      <div class="flex flex-col items-center justify-center min-h-screen">
        <LoadingMochi label="Memproses login..." />
      </div>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
import LoadingMochi from '~/components/ui/LoadingMochi.vue'

definePageMeta({
  auth: false,
  layout: 'unauthenticated'
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const token = route.query.token

  if (token) {
    authStore.setToken(token as string)

    await authStore.fetchUser()

    router.replace('/learning-map')
  } else if (authStore.user) {
    router.replace('/learning-map')
  } else {
    router.replace('/login')
  }
})
</script>
