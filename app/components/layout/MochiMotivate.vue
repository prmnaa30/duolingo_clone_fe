<template>
  <div class="hidden xl:flex flex-col items-end w-72 sticky top-8">
    <div
      class="bg-surface border-2 border-grey p-5 rounded-2xl shadow-sm relative mb-4 w-full cursor-pointer hover:bg-gray-50 transition-colors"
      @click="changeQuote"
    >
      <p class="text-text-title font-bold leading-relaxed min-h-[60px]">
        {{ displayedText
        }}<span
          v-show="isTyping"
          class="inline-block w-1.5 h-4 ml-0.5 bg-primary animate-pulse"
        />
      </p>

      <p
        v-if="!isTyping"
        class="text-[10px] text-text-muted mt-2 font-bold uppercase tracking-wider text-right animate-pulse"
      >
        Ketuk untuk ngobrol
      </p>

      <div
        class="absolute -bottom-2.5 right-10 w-4 h-4 bg-surface border-b-2 border-r-2 border-grey rotate-45"
      />
    </div>

    <img
      :src="mochiEncourage"
      alt="Mochi Mascot"
      class="w-24 drop-shadow-lg animate-bounce-slow mr-4"
    >
  </div>
</template>

<script setup>
import mochiEncourage from '~/assets/images/mochi_encourage.webp'

const quotes = [
  'Wah, kamu rajin banget hari ini! Mochi bangga! 🐾',
  'Sedikit demi sedikit, lama-lama jadi bukit huruf Jepang! 🗻',
  'Jangan menyerah! Mochi akan selalu nemenin kamu belajar. 🍣',
  'Ganbatte kudasai! Kamu pasti bisa hafal semuanya! 🌸',
  'Nggak apa-apa salah, dari situ kita belajar jadi lebih pintar! 💡',
  'Satu unit lagi selesai, Mochi traktir ikan virtual deh! 🐟',
  'Fokus ke depan! Masa depan cerah menantimu. ✨'
]

const currentQuote = ref('')
const displayedText = ref('')
const isTyping = ref(false)
let typingInterval = null

const typeWriter = (text) => {
  clearInterval(typingInterval)
  displayedText.value = ''
  isTyping.value = true

  let i = 0
  const speed = 40

  typingInterval = setInterval(() => {
    if (i < text.length) {
      displayedText.value += text.charAt(i)
      i++
    } else {
      clearInterval(typingInterval)
      isTyping.value = false
    }
  }, speed)
}

// 4. Fungsi Ganti Kata-kata
const changeQuote = () => {
  if (isTyping.value) return

  let randomQuote = currentQuote.value
  while (randomQuote === currentQuote.value) {
    randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  }

  currentQuote.value = randomQuote
  typeWriter(randomQuote)
}

onMounted(() => {
  changeQuote()
})

onUnmounted(() => {
  clearInterval(typingInterval)
})
</script>

<style scoped>
.animate-bounce-slow {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
