<template>
  <UPage>
    <header class="sticky top-0 z-50 bg-surface">
      <div class="h-12 md:ml-64 flex items-center justify-center relative">
        <p class="text-text-muted font-bold text-lg text-center">
          {{ route.name && typeof route.name === 'string' ? route.name.charAt(0).toUpperCase() + route.name.slice(1) : route.name }}
        </p>

        <button class="transition-all block md:hidden cursor-pointer duration-200 hover:bg-accented absolute right-2 rounded-full p-1" @click="router.push('/settings')">
          <UIcon
            name="i-heroicons:cog-6-tooth"
            class="size-6 block"
          />
        </button>
      </div>

      <USeparator />
    </header>

    <UMain class="md:ml-64 md:px-8">
      <slot />
    </UMain>

    <NavigationMain />
  </UPage>
</template>

<script setup lang="ts">
import NavigationMain from '~/components/navigation/NavigationMain.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  authStore.fetchUser()
})
</script>

<style scoped>

</style>
