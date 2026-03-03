<template>
  <UPage class="min-h-screen">
    <UContainer class="flex flex-col items-center justify-center h-screen">
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="relative">
          <div class="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
          <img
            :src="flatmochi"
            class="absolute top-2 left-2 w-10"
          >
        </div>

        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
        <p class="mt-4 text-gray-600 loading-text">Sedang memproses login</p>
      </div>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
import flatmochi from '~/assets/icons/flatmochi.svg'

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

<style lang="css">
  .loading-text::after {
    content: '.';
    animation: dots 2.5s steps(5, end) infinite;
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80%, 100% { content: ''; }
  }
</style>
