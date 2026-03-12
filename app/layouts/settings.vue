<template>
  <UPage>
    <header class="sticky top-0 z-50 bg-surface">
      <div class="h-12 md:ml-64 md:w-1/2 flex items-center justify-center relative">
        <p class="text-text-muted font-bold text-lg text-center">
          {{ getPageTitle() }}
        </p>

        <button
          class="transition-colors block md:hidden cursor-pointer duration-200 hover:bg-accented absolute rounded-full p-1"
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

    <DesktopSidebar class="md:block hidden" />

    <UMain class="md:ml-64 md:px-8 md:w-1/2">
      <slot />
    </UMain>
  </UPage>
</template>

<script setup lang="ts">
import DesktopSidebar from '~/components/navigation/DesktopSidebar.vue'

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
