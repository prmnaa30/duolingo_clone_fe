<template>
  <header class="h-12 bg-surface">
    <UContainer class="h-full flex items-center gap-4">
      <UIcon
        name="i-heroicons-x-mark"
        class="w-6 h-6"
        @click="router.back()"
      />

      <div class="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative">
        <div
          class="h-full bg-success transition-all duration-500 ease-out rounded-full relative"
          :style="{ width: `${quizStore.progressPercent}%` }"
        >
          <div class="absolute top-1 right-2 w-full h-0.75 bg-white/30 rounded-full" />
        </div>
      </div>

      <div class="p-1 rounded-lg flex gap-2 items-center transition-colors duration-200 ease-in cursor-default">
        <UIcon
          name="i-fluent-emoji-flat:battery"
          class="size-5"
        />
        <p>{{ authStore.user?.stats.energy }}</p>
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
const router = useRouter()
const quizStore = useQuizStore()
const authStore = useAuthStore()
</script>

<style scoped>

</style>
