<template>
  <UDrawer
    v-model:open="isOpen"
    direction="bottom"
  >
    <template #content>
      <article
        v-motion-slide-visible-once-bottom
        class="bg-surface rounded-3xl mt-4 p-6 sm:p-8 overflow-y-auto md:w-xl md:mx-auto"
      >
        <div
          class="prose prose-stone max-w-none
            prose-headings:text-text-title prose-p:text-text-body prose-strong:text-primary prose-li:text-text-body
            text-justify"
          v-html="renderedContent"
        />

        <BaseButton
          class="w-full h-12 mt-8"
          @click="finishAndExit"
        >
          Lanjut Belajar
        </BaseButton>
      </article>
    </template>
  </UDrawer>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import BaseButton from '~/components/ui/BaseButton.vue'

const props = defineProps({
  result: { required: true, type: Object }
})

const isOpen = defineModel('isOpen', { type: Boolean, default: false })

const router = useRouter()
const quizStore = useQuizStore()
const authStore = useAuthStore()
const curriculumStore = useCurriculumStore()

const md = new MarkdownIt({
  html: true,
  typographer: true
})

const renderedContent = computed(() => {
  if (!props.result?.ai_feedback_summary) return '<p>Tidak ada evaluasi untuk saat ini</p>'
  return md.render(props.result.ai_feedback_summary)
})

const finishAndExit = async () => {
  await router.replace('/learning-map')
  await authStore.fetchUser()
  await curriculumStore.fetchChapters()
  quizStore.resetQuiz()
}
</script>

<style scoped>

</style>
