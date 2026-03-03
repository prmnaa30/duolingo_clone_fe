<template>
  <div>
    <BaseButton @click="audioStore.play('correct')">
      Correct
    </BaseButton>

    <!-- <QuizFeedback />

    <QuizArrange />
    <QuizFillblank />
    <QuizMultipleChoice />
    <QuizResult /> -->
    <UDrawer
      v-model:open="show"
      direction="bottom"
    >
      <template #content>
        <article
          v-motion-slide-visible-once-bottom
          class="bg-surface rounded-3xl mt-4 p-6 sm:p-8 overflow-y-auto"
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
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import BaseButton from '~/components/ui/BaseButton.vue'

const audioStore = useAudioStore()
const router = useRouter()
const quizStore = useQuizStore()
const show = ref(false)
const md = new MarkdownIt({
  html: true,
  typographer: true
})

const summary_md = `
# Hasil Kuis Kamu

**Otsukaresama desu!** Kamu sudah berusaha dengan baik, namun ada beberapa poin penting yang perlu diperhatikan kembali:

## 1. Penggunaan Dakuten dan Handakuten
Pada kata-kata berikut, kamu lupa membubuhkan tanda petik (dakuten) atau lingkaran kecil (handakuten), yang sangat penting untuk mengubah bunyi konsonan:

- 'enpitsu' (えんぴつ)
- 'zasshi' (ざっし)
- 'mado' (まど)
- 'gakkou' (がっこう)

Dakuten merubah 'sa' menjadi 'za' dan handakuten merubah 'ka' menjadi 'ga'.

## 2. Struktur Kalimat
Pada soal "Ada jam dinding", ingat bahwa dalam tata bahasa Jepang, kata kerja (arimasu) selalu diletakkan di akhir kalimat. Jadi, subjek 'tokei' dan partikel 'ga' harus muncul terlebih dahulu sebelum kata kerja.

---

Teruslah berlatih menulis Hiragana dengan teliti, ya! **Ganbatte kudasai!**
`

const renderedContent = computed(() => {
  if (!summary_md) return ''
  return md.render(summary_md)
})

const finishAndExit = () => {
  quizStore.resetQuiz()
  router.replace('/learning-map')
}
</script>

<style scoped>

</style>
