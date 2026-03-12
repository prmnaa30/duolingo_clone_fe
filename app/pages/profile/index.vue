<template>
  <UContainer
    v-motion-slide-visible-once-bottom
    class="min-h-[calc(100vh-5rem)] relative bg-bg pb-24"
  >
    <div class="py-6 flex flex-col gap-4">
      <div class="flex justify-center h-40 md:h-56 bg-gray-300 dark:bg-gray-600 rounded-2xl relative">
        <img
          :src="String(authStore.user?.avatar_url)"
          alt="User Profile"
          class="rounded-full w-20 h-20 md:w-32 md:h-32 absolute bottom-4"
          :draggable="false"
        >
      </div>

      <div class="flex flex-col gap-1">
        <h1 class="text-xl text-text-title">
          {{ authStore.user?.name }}
        </h1>
        <p class="text-text-muted">
          {{ authStore.user?.email }}
        </p>
        <p class="text-sm">
          Bergabung pada {{ authStore.user?.joined_at }}
        </p>
      </div>

      <USeparator />

      <section>
        <h2 class="mb-2">
          Statistik
        </h2>

        <div class="grid grid-cols-2 gap-2">
          <div class="flex gap-2 px-4 py-3 bg-surface border-2 border-accented/80 rounded-2xl">
            <UIcon
              name="i-noto:fire"
              class="size-5"
            />
            <div class="font-semibold">
              <p>Streak</p>
              <p>{{ authStore.user?.stats.streak }}</p>
            </div>
          </div>
          <div class="flex gap-2 px-4 py-3 bg-surface border-2 border-accented/80 rounded-2xl">
            <UIcon
              name="i-noto:sparkles"
              class="text-yellow-500 size-5"
            />
            <div class="font-semibold">
              <p>Total XP</p>
              <p>{{ authStore.user?.stats.xp }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile'
})

const authStore = useAuthStore()

console.log(authStore.user?.avatar_url)
</script>

<style scoped>

</style>
