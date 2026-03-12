<template>
  <UContainer class="min-h-screen bg-bg flex flex-col relative pb-24">
    <div class="bg-surface/80 md:bg-transparent backdrop-blur-md border-b border-grey px-4 py-4 sticky top-0 z-40">
      <UContainer class="max-w-2xl mx-auto flex gap-4 items-center">
        <div class="md:w-full">
          <h1 class="text-xl md:text-2xl font-extrabold text-text-title md:text-center">
            Daftar Kana
          </h1>
          <p class="text-sm md:text-md text-text-muted md:text-center">
            Pilih huruf untuk mulai berlatih
          </p>
        </div>
      </UContainer>
    </div>

    <main class="flex-1 w-full max-w-2xl mx-auto px-4 py-6 mt-2">
      <div
        v-if="pending"
        class="flex justify-center py-20"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="w-10 h-10 animate-spin text-primary"
        />
      </div>

      <div v-else>
        <UTabs
          :items="tabItems"
          class="w-full"
          :ui="{
            trigger: 'w-full',
            label: 'uppercase font-bold'
          }"
        >
          <template #hiragana>
            <div class="mt-6">
              <KanaGrid
                :characters="hiraganaList"
                @select="openSlideover"
              />
            </div>
          </template>

          <template #katakana>
            <div class="mt-6">
              <KanaGrid
                :characters="katakanaList"
                @select="openSlideover"
              />
            </div>
          </template>
        </UTabs>
      </div>
    </main>

    <KanaDetailSlideover
      v-model:is-open="isSlideoverOpen"
      :character="selectedCharacter"
    />
  </UContainer>
</template>

<script setup lang="ts">
import KanaGrid from '~/components/kana/KanaGrid.vue'
import KanaDetailSlideover from '~/components/kana/KanaDetailSlideover.vue'

interface Character {
  id: number
  char: string
  romaji: string
  type: string
  guide_stroke: string | null
  created_at: string
  updated_at: string
  mastery_level: number
}

const config = useRuntimeConfig()
const authStore = useAuthStore()

const tabItems = [
  { label: 'Hiragana', slot: 'hiragana' },
  { label: 'Katakana', slot: 'katakana' }
]

const isSlideoverOpen = ref(false)

const selectedCharacter = ref<Character | null>(null)

const openSlideover = (character: Character) => {
  selectedCharacter.value = character
  isSlideoverOpen.value = true
}

interface ApiResponse {
  data: {
    hiragana: Character[]
    katakana: Character[]
  }
}

const { data: charactersResponse, pending } = await useFetch<ApiResponse>(`${config.public.baseApi}/characters`, {
  headers: { Authorization: `Bearer ${authStore.token}` }
})

const kanaLayout = [
  'a', 'i', 'u', 'e', 'o',
  'ka', 'ki', 'ku', 'ke', 'ko',
  'sa', 'shi', 'su', 'se', 'so',
  'ta', 'chi', 'tsu', 'te', 'to',
  'na', 'ni', 'nu', 'ne', 'no',
  'ha', 'hi', 'fu', 'he', 'ho',
  'ma', 'mi', 'mu', 'me', 'mo',
  'ya', null, 'yu', null, 'yo',
  'ra', 'ri', 'ru', 're', 'ro',
  'wa', null, null, null, 'wo',
  'n', null, null, null, null
]

const mapToKanaLayout = (kanaData: Character[], type: string) => {
  const filteredData = kanaData.filter((c: Character) => c.type === type)

  return kanaLayout.map((romaji) => {
    if (romaji === null) return null

    const charData = filteredData.find(c => c.romaji.toLocaleLowerCase() === romaji)
    return charData || null
  })
}

const hiraganaList = computed(() => {
  const hiraganaData = charactersResponse.value?.data.hiragana || []
  return mapToKanaLayout(hiraganaData, 'hiragana')
})

const katakanaList = computed(() => {
  const katakanaData = charactersResponse.value?.data.katakana || []
  return mapToKanaLayout(katakanaData, 'katakana')
})
</script>
