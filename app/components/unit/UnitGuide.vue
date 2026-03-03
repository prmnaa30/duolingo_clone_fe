<template>
  <article
    v-motion-slide-visible-once-bottom
    class="bg-surface rounded-3xl p-6 sm:p-8 shadow-sm border border-grey/50 relative"
  >
    <div class="absolute -top-3 -right-3 bg-secondary text-secondary-fg px-4 py-1 rounded-full text-xs font-bold shadow-md transform rotate-3">
      Guide
    </div>

    <div
      class="prose prose-stone max-w-none
          prose-headings:text-text-title prose-p:text-text-body prose-strong:text-primary prose-li:text-text-body"
      v-html="renderedContent"
    />

    <div class="w-full mt-4 sticky bottom-24 z-50">
      <div class="max-w-md mx-auto flex gap-4 items-center">
        <img
          src="/images/mochi.webp"
          class="w-16 h-16 -mb-2 drop-shadow-lg animate-bounce-slow hidden sm:block"
        >

        <BaseButton
          class="w-full h-12"
          color="success"
          @click="startQuiz"
        >
          Mulai Kuis
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import BaseButton from '../ui/BaseButton.vue'

interface UnitData {
  id?: string
  name?: string
  topic?: string
  guide_md?: string
}

const props = defineProps<{
  unit: UnitData
}>()

const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

const md = new MarkdownIt({
  html: true,
  typographer: true
})
const renderedContent = computed(() => {
  if (!props.unit?.guide_md) return ''
  return md.render(props.unit.guide_md)
})

const startQuiz = () => {
  if (authStore.user?.stats.energy === 0) {
    toast.add({
      title: 'Energi habis!',
      description: `Tunggu ${authStore.user.stats.next_heart_in} lagi untuk energi selanjutnya.`,
      color: 'error'
    })
    return
  }

  navigateTo(`quiz/${route.params.id}`)
}
</script>

<style scoped>
:deep(.prose table) {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--color-grey);
  padding: 4px 8px;
  border-radius: 8px;
}
</style>
