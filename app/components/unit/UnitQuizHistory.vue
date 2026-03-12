<template>
  <div class="w-full space-y-4">
    <div
      v-if="pending"
      class="space-y-4"
    >
      <USkeleton
        v-for="i in 3"
        :key="i"
        class="h-24 w-full rounded-2xl"
      />
    </div>

    <div
      v-else-if="error"
      class="text-center py-10 bg-surface rounded-3xl border border-grey/50"
    >
      <UIcon
        name="i-heroicons-exclamation-circle"
        class="w-12 h-12 text-error mx-auto mb-2"
      />
      <p class="text-text-muted">
        Gagal memuat riwayat.
      </p>
    </div>

    <div
      v-else-if="!historyData || historyData.length === 0"
      class="text-center py-12 bg-surface rounded-3xl border border-grey/50"
    >
      <img
        :draggable="false"
        :src="mochiCannotFind"
        class="w-24 mx-auto mb-4 opacity-50 grayscale"
      >
      <h3 class="font-bold text-text-title">
        Belum Ada Riwayat
      </h3>
      <p class="text-sm text-text-muted">
        Kamu belum pernah mengerjakan kuis di unit ini.
      </p>
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <div
        v-for="(session, index) in historyData"
        :key="index"
        v-motion-slide-visible-once-bottom
        class="bg-surface rounded-2xl p-4 border border-grey/50 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors cursor-pointer"
        @click="openSummary(session.ai_feedback_summary)"
      >
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span
              class="font-bold text-lg"
              :class="session.score >= 70 ? 'text-success' : 'text-error'"
            >
              Skor: {{ session.score }}%
            </span>
            <UBadge
              :color="session.score >= 70 ? 'success' : 'error'"
              variant="subtle"
              size="xs"
            >
              {{ session.score >= 70 ? 'Lulus' : 'Gagal' }}
            </UBadge>
          </div>
          <p class="text-xs text-text-muted font-medium">
            {{ new Date(session.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex flex-col items-end">
            <div class="flex items-center gap-1 text-warning font-bold">
              <UIcon
                name="i-heroicons-star-solid"
                class="w-5 h-5"
              />
              +{{ session.score }} XP
            </div>
            <span class="text-[10px] text-text-muted uppercase tracking-wider font-bold mt-1">Summary</span>
          </div>

          <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-muted">
            <UIcon
              name="i-heroicons-chevron-right"
              class="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>

    <UDrawer
      v-model:open="isDrawerOpen"
      direction="bottom"
    >
      <template #content>
        <article
          class="bg-surface rounded-t-3xl mt-4 p-6 sm:p-8 overflow-y-auto max-h-[85vh]"
        >
          <div class="flex items-center justify-between mb-6 border-b border-grey pb-4 bg-surface">
            <h3 class="text-xl font-bold text-text-title flex items-center gap-2">
              <UIcon
                name="i-heroicons-sparkles-solid"
                class="w-6 h-6 text-warning"
              />
              Feedback AI
            </h3>
            <button
              class="p-2 pb-0 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-colors"
              @click="isDrawerOpen = false"
            >
              <UIcon
                name="i-heroicons-x-mark"
                class="w-5 h-5"
              />
            </button>
          </div>

          <div
            class="prose prose-stone max-w-none
              prose-headings:text-text-title prose-p:text-text-body prose-strong:text-primary prose-li:text-text-body
              text-justify mb-8"
            v-html="renderedFeedback"
          />

          <BaseButton
            class="w-full h-12"
            color="neutral"
            variant="soft"
            @click="isDrawerOpen = false"
          >
            Tutup
          </BaseButton>
        </article>
      </template>
    </UDrawer>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import BaseButton from '../ui/BaseButton.vue'
import mochiCannotFind from '~/assets/images/mochi_cannot_find.webp'

const route = useRoute()
const config = useRuntimeConfig()
const authStore = useAuthStore()

const isDrawerOpen = ref(false)
const selectedFeedback = ref('')

const md = new MarkdownIt({
  html: true,
  typographer: true
})

interface HistoryResponse {
  data: Array<{
    ai_feedback_summary: string
    correct_count: number
    created_at: Date
    id: number
    score: number
    total_questions: number
  }>
}

const { data: historyResponse, pending, error } = await useFetch<HistoryResponse>(`${config.public.baseApi}/quiz/history/${route.params.id}`, {
  headers: { Authorization: `Bearer ${authStore.token}` }
})

const historyData = computed(() => {
  return historyResponse.value?.data || []
})

const openSummary = (feedbackMarkdown: string) => {
  selectedFeedback.value = feedbackMarkdown || 'Tidak ada feedback AI untuk sesi ini.'
  isDrawerOpen.value = true
}

const renderedFeedback = computed(() => {
  return md.render(selectedFeedback.value)
})
</script>
