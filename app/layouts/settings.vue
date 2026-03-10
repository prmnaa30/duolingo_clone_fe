<template>
  <UPage>
    <header class="sticky top-0 z-50 bg-surface">
      <div class="h-12 flex items-center justify-center relative">
        <p class="text-text-muted font-bold text-lg text-center">
          {{ getPageTitle() }}
        </p>

        <button
          class="transition-colors cursor-pointer duration-200 hover:bg-accented absolute rounded-full p-1"
          :class="getPageTitle() !== 'Settings' ? 'left-2' : 'right-2 px-2 text-primary'"
          @click="handleClick"
        >
          <UIcon
            v-if="getPageTitle() !== 'Settings'"
            name="i-heroicons:arrow-left"
            class="size-6 block text-text-muted"
          />
          <p
            v-else
            class="font-bold"
          >
            SELESAI
          </p>
        </button>
      </div>

      <USeparator />
    </header>

    <slot />
  </UPage>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const getPageTitle = () => {
  const path = route.path
  const segments = path.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  return lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : 'Settings'
}

const handleClick = () => {
  if (getPageTitle() !== 'Settings') {
    router.back()
  }
  router.push('/profile')
}

onMounted(() => {
  authStore.fetchUser()
})
</script>

<style scoped>

</style>
