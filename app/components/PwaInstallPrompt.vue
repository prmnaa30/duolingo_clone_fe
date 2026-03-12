<template>
  <Transition name="slide-up">
    <div
      v-if="showPrompt"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-surface border-2 border-primary rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-3"
    >
      <button
        class="absolute top-2 right-2 p-1 text-text-muted hover:text-text-title transition-colors"
        @click="dismissPrompt"
      >
        <UIcon
          name="i-heroicons-x-mark"
          class="w-5 h-5"
        />
      </button>

      <div class="flex items-center gap-4">
        <img
          src="/images/mochi.webp"
          alt="Mochi"
          class="w-14 h-14 drop-shadow-md"
        >
        <div>
          <h3 class="font-extrabold text-text-title text-base leading-tight">
            Instal Meowlingo
          </h3>
          <p class="text-xs text-text-muted mt-1 leading-snug">
            Belajar bahasa Jepang lebih cepat, hemat kuota, dan tanpa gangguan
            browser!
          </p>
        </div>
      </div>

      <div class="mt-2">
        <BaseButton
          v-if="!isIOS"
          color="primary"
          class="w-full h-10 text-sm"
          @click="installApp"
        >
          <UIcon
            name="i-heroicons-arrow-down-tray-solid"
            class="w-4 h-4 mr-2"
          />
          Instal Sekarang
        </BaseButton>

        <div
          v-else
          class="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-xs text-text-body flex items-center gap-3 border border-gray-200 dark:border-gray-700"
        >
          <UIcon
            name="i-heroicons-arrow-up-tray"
            class="w-8 h-8 text-primary shrink-0"
          />
          <p>
            Ketuk ikon <b>Share</b> di menu bawah Safari, lalu pilih <br><b>"Add to Home Screen"</b>
            <UIcon
              name="i-heroicons-plus-square"
              class="inline w-4 h-4 text-text-muted"
            />.
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

const showPrompt = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deferredPrompt = ref<any>(null)
const isIOS = ref(false)

onMounted(() => {
  const isStandalone
    = window.matchMedia('(display-mode: standalone)').matches
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      || (window.navigator as any).standalone
  if (isStandalone) {
    return
  }

  const ua = window.navigator.userAgent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isIosDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream

  if (isIosDevice) {
    isIOS.value = true
    setTimeout(() => {
      showPrompt.value = true
    }, 3000)
    return
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showPrompt.value = true
  })

  window.addEventListener('appinstalled', () => {
    showPrompt.value = false
    deferredPrompt.value = null
  })
})

const installApp = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()

  const { outcome } = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    console.log('User menginstal aplikasi')
  }

  deferredPrompt.value = null
  showPrompt.value = false
}

const dismissPrompt = () => {
  showPrompt.value = false
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%) scale(0.9);
}
</style>
