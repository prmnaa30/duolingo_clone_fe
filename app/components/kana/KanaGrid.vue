<template>
  <div class="animate-fade-in">
    <div class="grid grid-cols-5 gap-2 sm:gap-3">
      <div
        v-for="v in ['a', 'i', 'u', 'e', 'o']"
        :key="v"
        class="text-center text-xs font-bold text-text-muted mb-2 uppercase"
      >
        {{ v }}
      </div>

      <button
        v-for="(item, idx) in characters"
        :key="idx"
        class="aspect-square flex flex-col items-center justify-center rounded-2xl border-2 transition-all relative overflow-hidden group active:scale-95"
        :class="[
          item?.char
            ? 'bg-surface border-grey hover:border-primary/50 cursor-pointer active:translate-y-1 active:shadow-none'
            : 'bg-transparent border-transparent cursor-default'
        ]"
        :disabled="!item?.char"
        @click="item?.char ? handleSelect(item) : null"
      >
        <div v-if="item?.char">
          <p class="text-2xl sm:text-3xl font-black text-text-title group-hover:text-primary transition-colors -mb-2">
            {{ item.char }}
          </p>
          <p class="text-[10px] sm:text-xs font-bold text-text-muted mt-1">
            {{ item.romaji }}
          </p>

          <div class="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 dark:bg-gray-700">
            <div
              class="h-full bg-success transition-all duration-500"
              :style="{ width: `${item.mastery_level || 0}%` }"
            />
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  characters: (Character | null)[]
}>()

const emit = defineEmits(['select'])

const handleSelect = (character: Character) => {
  emit('select', character)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
