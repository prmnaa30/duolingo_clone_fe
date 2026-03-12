<template>
  <div class="min-h-screen bg-bg flex flex-col relative">
    <div class="md:bg-transparent bg-surface/80 backdrop-blur-md border-b border-grey px-4 pt-4 sticky top-0 z-40">
      <UContainer
        v-if="unitData"
      >
        <div class="flex gap-2 items-center">
          <button
            class="md:hidden block p-2 pb-0.5 rounded-md bg-grey border border-[color-mix(in_srgb,var(--color-grey),20%_black)] hover:bg-gray-400/70 cursor-pointer transition-colors duration-200 ease-in"
            @click="router.push('/learning-map')"
          >
            <UIcon
              name="i-heroicons-arrow-left"
              class="text-text-title size-6"
            />
          </button>
          <h1 class="text-lg md:text-xl font-bold text-text-title leading-tight">
            {{ unitData.name }}
          </h1>
        </div>

        <p class="text-xs md:text-sm text-text-muted text-justify mt-1">
          Topik: {{ unitData.topic }}
        </p>

        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          class="w-full"
          :content="false"
          :ui="{
            trigger: 'w-full',
            content: 'hidden'
          }"
          variant="link"
        />
      </UContainer>
    </div>

    <main class="flex-1 px-4 py-6 max-w-2xl mx-auto w-full relative">
      <div
        v-if="pending"
        class="space-y-4"
      >
        <USkeleton class="h-8 w-3/4 mb-6" />
        <USkeleton class="h-32 w-full rounded-3xl" />
      </div>

      <div
        v-else-if="error"
        class="text-center py-10"
      >
        <img
          :draggable="false"
          :src="mochiSad"
          class="w-32 mx-auto mb-4 grayscale opacity-50"
        >
        <h3 class="text-error font-bold">
          Gagal memuat materi
        </h3>
        <UButton
          color="neutral"
          @click="router.go(0)"
        >
          Coba Lagi
        </UButton>
      </div>

      <div
        v-else
        class="pb-24"
      >
        <div
          v-if="selectedTab === '0'"
          class="mt-4"
        >
          <UnitGuide :unit="unitData!" />
        </div>

        <div
          v-if="selectedTab === '1'"
          class="mt-4"
        >
          <UnitQuizHistory />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import UnitGuide from '~/components/unit/UnitGuide.vue'
import UnitQuizHistory from '~/components/unit/UnitQuizHistory.vue'
import mochiSad from '~/assets/images/mochi_sad.webp'

interface UnitData {
  id?: string
  name?: string
  topic?: string
  guide_md?: string
}

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const authStore = useAuthStore()

const selectedTab = ref('0')

const tabItems = [
  {
    label: 'Materi (Guide)',
    icon: 'i-heroicons-book-open'
  },
  {
    label: 'Riwayat Kuis',
    icon: 'i-heroicons-clock'
  }
]

const { data: unitDataResponse, pending, error } = await useFetch<UnitData>(`${config.public.baseApi}/units/${route.params.id}`, {
  headers: { Authorization: `Bearer ${authStore.token}` },
  key: `unit-${route.params.id}`
})

const unitData = computed<UnitData | null>(() => {
  return unitDataResponse.value || null
})

onMounted(() => {
  authStore.fetchUser()
})

useSeoMeta({
  title: () => `${unitData.value?.name || 'Unit'} - Panduan Belajar`,
  description: () => `Pelajari materi ${unitData.value?.topic || 'Bahasa Jepang'} dan taklukkan kuisnya di Meowlingo!`,
  ogTitle: () => `${unitData.value?.name || 'Unit'} | Meowlingo`,
  ogDescription: () => `Pelajari materi ${unitData.value?.topic || 'Bahasa Jepang'} dan taklukkan kuisnya di Meowlingo!`
})
</script>
