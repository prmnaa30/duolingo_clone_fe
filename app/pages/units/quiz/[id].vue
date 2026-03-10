<template>
  <div class="bg-bg flex flex-col max-w-lg mx-auto relative overflow-hidden">
    <div
      v-if="quizStore.loading && !quizStore.isSubmittingAnswers"
      class="min-h-[calc(100vh-3rem)] flex-1 flex flex-col justify-center items-center gap-4"
    >
      <LoadingMochi label="Menyiapkan soal..." />
    </div>

    <div v-else-if="quizStore.isSubmittingAnswers || quizStore.result">
      <div
        v-if="quizStore.isSubmittingAnswers"
        class="min-h-[calc(100vh-3rem)] flex-1 flex flex-col justify-center items-center gap-4"
      >
        <LoadingMochi
          label="Menghitung nilai..."
        />
      </div>

      <QuizResult v-else-if="quizStore.result" />
    </div>

    <div
      v-else
      class="flex flex-col h-full pt-4 relative"
    >
      <div class="flex-1 px-4 overflow-y-auto pb-26">
        <component
          :is="questionComponent"
          v-if="questionComponent"
          :question="quizStore.currentQuestion"
          :current-answer="currentAnswer"
          :is-answered="isAnswered"
          @update:answer="handleAnswerUpdate"
        />
      </div>

      <div
        class="fixed bottom-0 w-full max-w-lg mx-auto border-t border-grey p-4 bg-bg pb-8 z-40 transition-transform duration-300"
        :class="{ 'translate-y-full': showFeedback }"
      >
        <BaseButton
          :disabled="!currentAnswer || isChecking"
          class="w-full h-14 transition-all"
          :color="!currentAnswer ? 'neutral' : 'success'"
          @click="handleCheck"
        >
          <span
            v-if="isChecking"
            class="flex items-center justify-center gap-2"
          >
            <UIcon
              name="i-lucide:loader-circle"
              class="w-6 h-6 animate-spin"
            />
            MEMERIKSA...
          </span>

          <span v-else>CEK JAWABAN</span>
        </BaseButton>
      </div>

      <QuizFeedback
        :is-open="showFeedback"
        :is-correct="isCorrect"
        :is-last-question="quizStore.isLastQuestion"
        :question="quizStore.currentQuestion"
        @next="handleNext"
      />
    </div>

    <QuizExitConfirmation
      v-model:is-open="isExitModalOpen"
      @continue="isExitModalOpen = false"
      @exit-save="handleExit(false)"
      @exit-discard="handleExit(true)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import LoadingMochi from '~/components/ui/LoadingMochi.vue'
import { useQuizStore } from '~/stores/quiz'

definePageMeta({ layout: 'quiz' })

const route = useRoute()
const router = useRouter()
const quizStore = useQuizStore()
const audioStore = useAudioStore()

const currentAnswer = ref<string | null>(null)
const showFeedback = ref(false)

const isChecking = ref(false)
let checkTimeout: number | null | undefined = null
const isCorrect = ref(false)
const isAnswered = ref(false)

const isExitModalOpen = ref(false)
const confirmExit = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextRoute = ref<any>(null)

onMounted(async () => {
  if (sessionStorage.getItem('quiz_unit_id')) return

  try {
    await quizStore.startQuiz(Number(route.params.id))
  } catch (err) {
    console.error('Gagal memuat kuis: ', err)
    router.replace('/learning-map')
  }
})

onBeforeUnmount(() => {
  if (checkTimeout) clearTimeout(checkTimeout)
})

onBeforeRouteLeave((to, from, next) => {
  if (quizStore.result || confirmExit.value) {
    next()
    return
  }

  isExitModalOpen.value = true
  nextRoute.value = to
  next(false)
})

const questionComponent = computed(() => {
  const type = quizStore.currentQuestion?.type

  const componentMap = {
    multiple_choice: resolveComponent('QuizMultipleChoice'),
    arrange_words: resolveComponent('QuizArrange'),
    missing_sentence: resolveComponent('QuizFillblank')
  }

  return type ? componentMap[type] : null
})

const handleAnswerUpdate = (val: string | null): void => {
  if (showFeedback.value) return

  currentAnswer.value = val
}

const normalize = (str: string | null) => String(str).toLowerCase().replace(/\s+/g, '').trim()

const handleCheck = () => {
  if (!currentAnswer.value || isChecking.value) return

  isChecking.value = true
  checkTimeout = setTimeout(() => {
    quizStore.selectAnswer(currentAnswer.value)

    const correctAnswer = quizStore.currentQuestion?.content?.answer || ''

    isCorrect.value = normalize(currentAnswer.value) === normalize(correctAnswer)

    if (isCorrect.value) {
      audioStore.play('correct')
    } else {
      audioStore.play('wrong')
    }

    isChecking.value = false
    isAnswered.value = true
    showFeedback.value = true
  }, 600)
}

const handleNext = async () => {
  showFeedback.value = false
  isCorrect.value = false
  isAnswered.value = false
  currentAnswer.value = null

  if (quizStore.isLastQuestion) {
    await quizStore.submitQuiz()

    if (quizStore.result?.is_passed) {
      audioStore.play('passed')
    } else {
      audioStore.play('failed')
    }
  } else {
    quizStore.nextQuestion()
  }
}

const handleExit = (shouldClearProgress: boolean) => {
  confirmExit.value = true
  isExitModalOpen.value = false

  if (shouldClearProgress) {
    quizStore.resetQuiz()
  }

  if (nextRoute.value) {
    router.push(nextRoute.value.fullPath)
  } else {
    router.replace('learning-map')
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
