<template>
  <div class="flex flex-col h-full">
    <div class="flex items-start gap-4 mb-8 px-2">
      <img
        :draggable="false"
        :src="mochiChoices"
        class="w-20 drop-shadow-md"
        alt="Mochi"
      >

      <div class="relative bg-surface border-2 border-grey p-4 rounded-2xl shadow-sm flex-1 mt-2">
        <div class="absolute -left-2.5 top-5 w-4 h-4 bg-surface border-b-2 border-l-2 border-grey rotate-45" />

        <h2 class="text-lg sm:text-xl font-bold text-text-title leading-relaxed">
          {{ props.question?.content?.question }}
        </h2>
      </div>
    </div>

    <div class="flex flex-col gap-3 pb-8">
      <button
        v-for="(option, idx) in props.question?.content?.options"
        :key="idx"
        :disabled="isAnswered"
        class="w-full text-left p-4 rounded-xl border-2 border-b-4 transition-all duration-200 group flex items-center gap-3 active:translate-y-0.5 active:border-b-2"
        :class="[
          currentAnswer === option
            ? 'bg-primary/10 border-primary text-primary'
            : 'bg-surface border-grey hover:bg-gray-50 text-text-body'
        ]"
        @click="selectOption(option)"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center border font-bold text-sm"
          :class="currentAnswer === option ? 'bg-primary text-white border-primary' : 'bg-white border-grey text-text-muted'"
        >
          {{ String.fromCharCode(65 + idx) }}
        </div>

        <span class="font-semibold text-lg">{{ option }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import mochiChoices from '~/assets/images/mochi_choice.webp'

const props = defineProps({
  question: Object,
  currentAnswer: String,
  isAnswered: Boolean
})

const emit = defineEmits(['update:answer'])

const selectOption = (option) => {
  emit('update:answer', option)
}
</script>
