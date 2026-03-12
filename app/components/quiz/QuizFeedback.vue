<template>
  <UDrawer
    v-model:open="isOpen"
    direction="bottom"
    class="p-6 border-2 bg-surface flex flex-col rounded-t-3xl"
    :class="[
      isCorrect
        ? 'border-success/50'
        : 'border-error/50'
    ]"
    :handle="false"
    :dismissible="false"
  >
    <template #content>
      <div class="flex items-start gap-4 mb-4 md:w-xl md:mx-auto md:h-32">
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
            class="text-2xl md:text-3xl font-black mb-1"
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
              class="font-normal md:text-lg opacity-90"
            >
              {{ question?.content?.explanation }}
            </span>
          </p>
        </div>
      </div>

      <BaseButton
        class="w-full md:w-xl md:mx-auto h-12"
        color="primary"
        @click="$emit('next')"
      >
        {{ isLastQuestion ? 'SELESAI' : 'LANJUT' }}
      </BaseButton>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

defineProps({
  isCorrect: Boolean,
  isLastQuestion: Boolean,
  question: Object
})

const isOpen = defineModel('isOpen', { type: Boolean, default: false })

defineEmits(['next'])
</script>

<style scoped>

</style>
