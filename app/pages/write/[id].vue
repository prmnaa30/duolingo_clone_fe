<template>
  <div class="min-h-[calc(100vh-5rem)] bg-bg flex flex-col relative pb-10">
    <div class="bg-surface/80 backdrop-blur-md border-b border-grey h-16 px-4 py-2 sticky top-0 z-40">
      <UContainer class="max-w-md mx-auto flex gap-4 items-center">
        <button
          class="p-2 pb-0 rounded-md bg-gray-200 border border-gray-300 hover:bg-gray-400/70 transition-colors"
          @click="router.back()"
        >
          <UIcon
            name="i-heroicons-arrow-left"
            class="text-text-title size-6"
          />
        </button>
        <div v-if="character">
          <h1 class="text-lg font-bold text-text-title">
            Latihan Menulis
          </h1>
        </div>
      </UContainer>
    </div>

    <main class="flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center">
      <div
        v-if="pending"
        class="py-20 flex flex-col items-center gap-4"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="w-10 h-10 animate-spin text-primary"
        />
        <p class="text-text-muted font-bold">
          Memuat kanvas...
        </p>
      </div>

      <div
        v-else-if="character"
        class="w-full flex flex-col items-center animate-fade-in"
      >
        <div class="flex justify-between items-center w-full mb-6 px-2">
          <div>
            <span class="text-sm font-bold text-text-muted uppercase tracking-wider">Target:</span>
            <div class="flex items-end gap-2">
              <span class="text-4xl font-black text-text-title">{{ character?.char }}</span>
              <span class="text-lg font-bold text-primary mb-1">({{ character?.romaji }})</span>
            </div>
          </div>
          <button
            class="p-3 pb-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
            @click="playAudio"
          >
            <UIcon
              name="i-heroicons-speaker-wave-solid"
              class="w-6 h-6"
            />
          </button>
        </div>

        <WriteCanvas
          :is-analyzing="isAnalyzing"
          :is-analyzed="!!result"
          @submit="handleAnalyze"
          @clear="handleClear"
        />

        <div v-if="result">
          <WriteResult
            :score="result.score"
            :feedback="result.feedback"
          />

          <BaseButton
            class="w-full mt-6 h-12"
            color="primary"
            @click="router.push('/kana')"
          >
            Selesai Latihan
          </BaseButton>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import WriteCanvas from '~/components/write/WriteCanvas.vue'

definePageMeta({
  layout: 'write'
})

interface AnalyzeResponse {
  score: number
  feedback: string
  target: {
    id: number
    char: string
    romaji: string
    type: string
  }
}

interface CharacterResponse {
  data: {
    id: number
    char: string
    romaji: string
    type: string
    stroke_count: number
  }
}

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const authStore = useAuthStore()
const toast = useToast()

const isAnalyzing = ref(false)
const result = ref<{ score: number, feedback: string } | null>(null)

const { data: characterData, pending } = await useFetch<CharacterResponse>(`${config.public.baseApi}/characters/${route.params.id}`, {
  headers: { authorization: `Bearer ${authStore.token}` }
})

const character = computed(() => {
  return characterData.value?.data || null
})

const handleAnalyze = async (base64Image: string) => {
  isAnalyzing.value = true
  result.value = null

  try {
    const response = await $fetch<AnalyzeResponse>(`${config.public.baseApi}/writing/analyze`, {
      method: 'POST',
      headers: { authorization: `Bearer ${authStore.token}` },
      body: {
        character_id: route.params.id,
        image: base64Image
      }
    })

    result.value = {
      score: response.score || 0,
      feedback: response.feedback || 'Tidak ada feedback dari AI.'
    }

    await saveProgress(result.value.score)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Gagal analisis AI:', error)
    toast.add({
      title: 'Gagal Menganalisis',
      description: error.data?.message || 'Terjadi kesalahan jaringan',
      color: 'error'
    })
  } finally {
    isAnalyzing.value = false
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
}

const saveProgress = async (finalScore: number) => {
  try {
    await $fetch(`${config.public.baseApi}/writing/progress`, {
      method: 'POST',
      headers: { authorization: `Bearer ${authStore.token}` },
      body: {
        character_id: route.params.id,
        score: finalScore
      }
    })
  } catch (err) {
    console.error('Gagal menyimpan progres:', err)
  }
}

const handleClear = () => {
  result.value = null
}

const playAudio = () => {
  const text = character.value?.char || character.value?.romaji
  if (text) {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'ja-JP'
    speech.volume = 1
    speech.rate = 0.5
    window.speechSynthesis.speak(speech)
  }
}
</script>
