<template>
  <transition name="slide-up">
    <div
      v-if="show"
      class="fixed bottom-0 w-full max-w-lg mx-auto border-t-2 p-6 pb-8 z-50 flex flex-col gap-4"
      :class="[
        isCorrect
          ? 'bg-green-100 border-green-200'
          : 'bg-red-100 border-red-200'
      ]"
    >
      <div class="flex items-start gap-4">
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center mt-0.75"
          :class="isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
        >
          <UIcon
            :name="isCorrect ? 'i-heroicons:check-16-solid' : 'i-heroicons:x-mark-16-solid'"
            class="size-5"
          />
        </div>

        <div class="flex-1">
          <h3
            class="text-2xl font-black mb-1"
            :class="isCorrect ? 'text-green-600' : 'text-red-600'"
          >
            {{ isCorrect ? 'Luar Biasa!' : 'Kurang Tepat' }}
          </h3>

          <p
            class="text-sm font-semibold"
            :class="isCorrect ? 'text-green-700' : 'text-red-700'"
          >
            <span
              v-if="!isCorrect"
              class="block mb-1"
            >
              Jawaban benar: <strong class="underline">{{ question?.content?.answer }}</strong>
            </span>

            <span
              v-if="question?.content?.explanation"
              class="font-normal opacity-90"
            >
              {{ question?.content?.explanation }}
            </span>
          </p>
        </div>
      </div>

      <BaseButton
        class="w-full h-12"
        :color="isCorrect ? 'success' : 'danger'"
        @click="$emit('next')"
      >
        {{ isLastQuestion ? 'SELESAI' : 'LANJUT' }}
      </BaseButton>
    </div>
  </transition>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

defineProps({
  show: Boolean,
  isCorrect: Boolean,
  isLastQuestion: Boolean,
  question: Object
})

defineEmits(['next'])
</script>

<style scoped>

</style>
