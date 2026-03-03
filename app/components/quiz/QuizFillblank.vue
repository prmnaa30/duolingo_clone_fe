<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 flex flex-col justify-center items-center px-4">
      <div class="bg-surface border-2 border-grey p-6 rounded-2xl relative w-full mb-8 shadow-sm">
        <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-surface border-b-2 border-r-2 border-grey rotate-45" />

        <h2 class="text-lg sm:text-2xl font-bold text-text-title leading-loose text-center">
          <span>{{ parts[0] }}</span>

          <span
            class="inline-flex items-center justify-center min-w-20 h-10 mx-1 border-b-4 transition-all align-middle px-2 text-primary"
            :class="selectedOption ? 'border-primary' : 'border-grey bg-gray-100 animate-pulse'"
          >
            {{ selectedOption || '' }}
          </span>

          <span v-if="parts[1]">{{ parts[1] }}</span>
        </h2>
      </div>

      <img
        :src="mochiWondering"
        class="w-24 drop-shadow-md"
        alt="Mochi"
      >
    </div>

    <USeparator class="my-4" />

    <div class="grid grid-cols-2 gap-3 pb-8 mt-4">
      <button
        v-for="(option, idx) in question?.content?.options"
        :key="idx"
        :disabled="isAnswered"
        class="w-full text-center font-bold text-lg py-2 rounded-2xl border-2 border-b-4 transition-all active:translate-y-0.5 active:shadow-none"
        :class="[
          selectedOption === option
            ? 'bg-primary/10 border-primary text-primary shadow-[0_2px_0_0_#ea580c]'
            : 'bg-surface border-grey text-text-body shadow-[0_2px_0_0_rgba(0,0,0,0.1)] hover:bg-gray-50'
        ]"
        @click="selectOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import mochiWondering from '~/assets/images/mochi_wondering.webp'

const props = defineProps({
  question: Object,
  currentAnswer: String,
  isAnswered: Boolean
})

const emit = defineEmits(['update:answer'])

const selectedOption = ref(props.currentAnswer || null)

const parts = computed(() => {
  if (!props.question?.content?.question) return []
  return props.question.content.question.split('__')
})

const selectOption = (option: string) => {
  selectedOption.value = option
  emit('update:answer', option)
}
</script>
