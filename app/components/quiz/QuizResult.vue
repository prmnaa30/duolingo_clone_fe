<template>
  <div class="flex-1 flex flex-col items-center justify-center p-6 text-center">
    <img
      v-motion
      :src="quizStore.result?.is_passed ? mochiHappy : mochiSad"
      class="w-40 mb-4 drop-shadow-xl"
      :initial="{ opacity: 0, scale: 0.5, y: 50 }"
      :enter="{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 250, damping: 20 }
      }"
    >

    <h1
      v-motion
      class="text-3xl font-extrabold mb-4"
      :class="quizStore.result?.is_passed ? 'text-warning' : 'text-error'"
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
    >
      {{
        quizStore.result?.is_passed
          ? "Unit Selesai!"
          : "Jangan Menyerah! Coba sekali lagi yaa"
      }}
    </h1>

    <div class="flex gap-3 mb-6">
      <UIcon
        v-for="i in 3"
        :key="'star-' + i"
        v-motion
        name="i-heroicons-star-solid"
        class="w-14 h-14 drop-shadow-md"
        :class="
          i <= earnedStars ? 'text-warning' : 'text-gray-300 dark:text-gray-700'
        "
        :initial="{ opacity: 0, scale: 0, rotate: -45 }"
        :enter="{
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            delay: 400 + i * 200
          }
        }"
      />
    </div>

    <p
      v-motion
      class="text-text-muted mb-8 text-lg px-4"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { delay: 1100, duration: 500 } }"
    >
      Kamu hebat! Teruslah berlatih.
    </p>

    <div
      v-motion
      class="grid grid-cols-2 gap-4 w-full mb-8"
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { type: 'spring', delay: 1300 } }"
    >
      <div
        class="bg-surface border-2 border-warning p-4 rounded-2xl flex flex-col items-center shadow-sm"
      >
        <span class="text-xs text-text-muted font-bold uppercase">XP Didapat</span>
        <span class="text-3xl font-black text-warning">+{{ quizStore.result?.xp_gained }}</span>
      </div>
      <div
        class="bg-surface border-2 border-error p-4 rounded-2xl flex flex-col items-center shadow-sm"
      >
        <span class="text-xs text-text-muted font-bold uppercase">Skor Kamu</span>
        <span class="text-3xl font-black text-error">{{ quizStore.result?.score }}%</span>
      </div>
    </div>

    <BaseButton
      class="w-full h-12"
      @click="isSummaryOpen = true"
    >
      Summary
    </BaseButton>

    <QuizSummary
      v-model:is-open="isSummaryOpen"
      :result="
        quizStore.result || {
          score: 0,
          is_passed: false,
          xp_gained: 0,
          hearts_left: 0,
          unlocked_unit_id: null,
          ai_feedback_summary: null
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import mochiHappy from '~/assets/images/mochi_happy.webp'
import mochiSad from '~/assets/images/mochi_sad.webp'
import BaseButton from '../ui/BaseButton.vue'

const quizStore = useQuizStore()

const isSummaryOpen = ref(false)

const earnedStars = computed(() => {
  const score = quizStore.result?.score || 0
  if (score === 100) return 3
  if (score >= 80) return 2
  if (score >= 60) return 1
  return 0
})
</script>

<style scoped></style>
