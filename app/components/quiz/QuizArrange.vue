<template>
  <div class="flex flex-col h-full">
    <div class="flex items-start gap-4 mb-6 px-2">
      <img
        :draggable="false"
        :src="mochiScrambledKana"
        class="w-24 drop-shadow-md"
        alt="Mochi"
      >
      <div class="relative bg-surface border-2 border-grey p-4 rounded-2xl shadow-sm flex-1 mt-2">
        <div class="absolute -left-2.5 top-5 w-4 h-4 bg-surface border-b-2 border-l-2 border-grey rotate-45" />
        <h2 class="text-lg sm:text-xl font-bold text-text-title leading-relaxed">
          {{ question?.content?.question || 'Bantu aku menyusun kata-kata berikut...' }}
        </h2>
      </div>
    </div>

    <div class="min-h-35 flex flex-wrap content-start gap-2 border-b-2 border-grey/50 py-4 mb-6">
      <div
        v-if="selectedWords.length === 0"
        class="w-full text-center text-text-muted italic pt-4"
      >
        Ketuk kata-kata di bawah untuk menyusun {{ isJapaneseChar ? 'kata' : 'kalimat' }}
      </div>

      <button
        v-for="word in selectedWords"
        :key="word.id"
        :disabled="isAnswered"
        class="bg-surface border-2 border-grey text-text-body px-4 py-2 rounded-xl shadow-[0_2px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-0.5 hover:bg-red-50 transition-all font-bold text-lg animate-pop-in"
        @click="moveToBank(word)"
      >
        {{ word.text }}
      </button>
    </div>

    <div class="flex flex-wrap justify-center gap-3 pb-8">
      <button
        v-for="word in wordBank"
        :key="word.id"
        :disabled="isAnswered"
        class="bg-surface border-2 border-grey text-text-body px-4 py-2 rounded-xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 hover:bg-gray-50 transition-all font-bold text-lg"
        @click="moveToAnswer(word)"
      >
        {{ word.text }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import mochiScrambledKana from '~/assets/images/mochi_scrambled_kana.webp'

interface WordObj { id: number, text: string }

const props = defineProps({ question: Object, isAnswered: Boolean })
const emit = defineEmits(['update:answer'])

const wordBank = ref<WordObj[]>([])
const selectedWords = ref<WordObj[]>([])
const isJapaneseChar = ref(false)
const japaneseRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/

watch(() => props.question, (newQ) => {
  if (newQ && newQ.type === 'arrange_words') {
    selectedWords.value = []
    const rawWords = newQ.content.words || newQ.content.options || []
    if (rawWords.length > 0) isJapaneseChar.value = japaneseRegex.test(rawWords[0])

    wordBank.value = rawWords.map((word: string, index: number) => ({
      id: index, text: word
    })).sort(() => Math.random() - 0.5)

    emit('update:answer', null)
  }
}, { immediate: true })

const moveToAnswer = (word: WordObj) => {
  wordBank.value = wordBank.value.filter(w => w.id !== word.id)
  selectedWords.value.push(word)
  emitAnswer()
}

const moveToBank = (word: WordObj) => {
  selectedWords.value = selectedWords.value.filter(w => w.id !== word.id)
  wordBank.value.push(word)
  emitAnswer()
}

const emitAnswer = () => {
  const separator = isJapaneseChar.value ? '' : ' '
  const sentence = selectedWords.value.map(w => w.text).join(separator)
  emit('update:answer', sentence.length > 0 ? sentence : null)
}
</script>

<style scoped>
.animate-pop-in { animation: pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes pop { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
</style>
