/* eslint-disable @typescript-eslint/no-explicit-any */
interface QuestionContent {
  question: string
  options?: string[]
  answer?: string
  [key: string]: any
}

interface QuizQuestion {
  id: number
  unit_id: number
  type: 'multiple_choice' | 'arrange_words' | 'missing_sentence'
  content: QuestionContent
}

interface QuizStartResponse {
  unit_id: number
  is_remedial_mode: boolean
  questions: QuizQuestion[]
}

export interface QuizResult {
  score: number
  is_passed: boolean
  xp_gained: number
  hearts_left: number
  unlocked_unit_id: number | null
  ai_feedback_summary: string | null
}

interface AnswerPayload {
  question_id: number
  selected: string | null
}

export const useQuizStore = defineStore('quiz', () => {
  const config = useRuntimeConfig()
  const BASE_API = config.public.baseApi
  const authStore = useAuthStore()
  const toast = useToast()

  // * States * //
  const questions = useSessionStorage<QuizQuestion[]>('quiz_questions', [])
  const currentQuestionIndex = useSessionStorage('quiz_index', 0)
  const userAnswers = useSessionStorage<AnswerPayload[]>('quiz_answers', [])
  const result = useSessionStorage<QuizResult | null>('quiz_result', null)
  const unitId = useSessionStorage<number | null>('quiz_unit_id', null)
  const isRemedial = ref(false)
  const isSubmittingAnswers = ref(false)
  const loading = ref(false)

  // * Getters * //
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

  const progressPercent = computed(() => {
    if (questions.value.length === 0) return 0
    return ((currentQuestionIndex.value + 1) / questions.value.length) * 100
  })

  const isLastQuestion = computed(() => {
    return questions.value.length > 0 && currentQuestionIndex.value === questions.value.length - 1
  })

  // * Methods * //
  const startQuiz = async (id: number) => {
    resetQuiz()

    unitId.value = id
    isRemedial.value = false
    loading.value = true

    try {
      const response = await $fetch<QuizStartResponse>(`${BASE_API}/quiz/start/${id}`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      })

      questions.value = response.questions
      isRemedial.value = response.is_remedial_mode
    } catch (error: any) {
      console.error('Gagal memulai kuis: ', error)

      const msg = error.data?.message || 'Gagal memuat soal'

      toast.add({
        title: 'Gagal Memuat Kuis',
        description: msg,
        color: 'error'
      })

      if (error.statusCode === 403) {
        throw error
      }
    } finally {
      loading.value = false
    }
  }

  const selectAnswer = (selectedOption: string | null) => {
    if (!currentQuestion.value) return

    const qId = currentQuestion.value.id

    const existingIndex = userAnswers.value.findIndex(a => a.question_id === qId)

    const answerObj: AnswerPayload = {
      question_id: qId,
      selected: selectedOption
    }

    if (existingIndex !== -1) {
      userAnswers.value[existingIndex] = answerObj
    } else {
      userAnswers.value.push(answerObj)
    }
  }

  const nextQuestion = () => {
    if (!isLastQuestion.value) {
      currentQuestionIndex.value++
    }
  }

  const submitQuiz = async () => {
    isSubmittingAnswers.value = true
    try {
      const response = await $fetch<QuizResult>(`${BASE_API}/quiz/submit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authStore.token}` },
        body: {
          unit_id: unitId.value,
          answers: userAnswers.value
        }
      })

      result.value = response

      await authStore.fetchUser()
    } catch (error: any) {
      console.error('Gagal submit:', error)

      toast.add({
        title: 'Gagal Mengirim Jawaban',
        description: error.data?.message || 'Terjadi kesalahan jaringan',
        color: 'error'
      })
    } finally {
      isSubmittingAnswers.value = false
    }
  }

  const resetQuiz = () => {
    questions.value = []
    userAnswers.value = []
    currentQuestionIndex.value = 0
    result.value = null
    unitId.value = null
  }

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    progressPercent,
    isLastQuestion,
    loading,
    result,
    isRemedial,
    isSubmittingAnswers,
    startQuiz,
    selectAnswer,
    nextQuestion,
    submitQuiz,
    resetQuiz
  }
})
