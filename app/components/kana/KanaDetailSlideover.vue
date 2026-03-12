<template>
  <USlideover
    v-model:open="internalIsOpen"
    side="bottom"
  >
    <template #content>
      <div class="flex flex-col h-full bg-surface md:w-xl md:mx-auto">
        <div class="flex items-center justify-between p-4 border-b border-grey">
          <h3 class="text-lg font-bold text-text-title">
            Detail Huruf
          </h3>
          <button
            class="p-2 pb-0 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-colors"
            @click="closeSlideover"
          >
            <UIcon
              name="i-heroicons-x-mark"
              class="w-5 h-5"
            />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          <div
            v-if="pending"
            class="flex flex-col items-center justify-center h-full gap-4"
          >
            <UIcon
              name="i-lucide-loader-circle"
              class="w-10 h-10 animate-spin text-primary"
            />
            <p class="text-text-muted font-bold">
              Memuat data...
            </p>
          </div>

          <div
            v-else-if="props.character"
            class="w-full flex flex-col items-center mt-8"
          >
            <div class="w-40 h-40 bg-gray-50 dark:bg-gray-800 rounded-3xl border-2 border-grey flex items-center justify-center mb-6 shadow-inner relative">
              <span class="text-7xl font-black text-text-title">{{ props.character.char }}</span>
              <UBadge
                class="absolute -top-3 -right-3"
                color="primary"
                variant="solid"
              >
                {{ props.character.type }}
              </UBadge>
            </div>

            <div class="flex items-center gap-4 mb-8">
              <h2 class="text-3xl font-extrabold text-text-title">
                {{ props.character.romaji }}
              </h2>
              <button
                class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md"
                title="Dengarkan Pelafalan"
                @click="playAudio"
              >
                <UIcon
                  name="i-heroicons-speaker-wave-solid"
                  class="w-5 h-5"
                />
              </button>
            </div>

            <div class="w-full bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-grey mb-8">
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-text-muted text-sm uppercase">Tingkat Penguasaan</span>
                <span class="font-black text-primary">{{ props.character.mastery_level || 0 }}%</span>
              </div>
              <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-success transition-all duration-1000 ease-out"
                  :style="{ width: `${props.character.mastery_level || 0}%` }"
                />
              </div>
              <p class="text-xs text-text-muted mt-3 text-center">
                Latih terus tulisanmu agar mencapai 100%!
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-grey bg-bg">
          <BaseButton
            class="w-full h-14"
            color="success"
            :disabled="pending"
            @click="startWriting"
          >
            Mulai Latihan Menulis
          </BaseButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

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

const props = defineProps<{
  character: Character | null
  isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen'])

const router = useRouter()

const internalIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value)
})

const pending = ref(false)

watch(() => props.character, (newCharacter) => {
  if (newCharacter) {
    emit('update:isOpen', true)
  }
}, { immediate: true })

const closeSlideover = () => {
  emit('update:isOpen', false)
}

const playAudio = () => {
  const text = props.character?.char || props.character?.romaji || ''
  if (text) {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'ja-JP'
    speech.volume = 1
    speech.rate = 0.5
    window.speechSynthesis.speak(speech)
  }
}

const startWriting = () => {
  if (!props.character) return
  emit('update:isOpen', false)
  router.push(`/write/${props.character.id}`)
}
</script>
