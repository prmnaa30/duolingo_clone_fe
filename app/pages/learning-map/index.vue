<template>
  <UContainer class="min-h-screen bg-bg pb-20">
    <div class="max-w-md mx-auto px-4 mt-8 relative">
      <div
        v-if="curriculumStore.loading"
        class="flex flex-col gap-8 items-center mt-12"
      >
        <USkeleton class="w-16 h-16 rounded-full" />
        <USkeleton class="w-16 h-16 rounded-full" />
        <USkeleton class="w-16 h-16 rounded-full" />
      </div>

      <div v-else>
        <div
          v-for="(chapter) in curriculumStore.chapters"
          :key="chapter.id"
          class="mb-12 relative"
        >
          <div class="sticky top-20 z-30 flex justify-center mb-8">
            <div class="bg-secondary text-secondary-fg px-6 py-2 rounded-2xl shadow-lg font-bold text-sm border-2 border-surface">
              {{ chapter.name }}
            </div>
          </div>

          <div class="absolute left-1/2 -translate-x-1/2 top-10 bottom-0 w-6 bg-[#e7e5e4] rounded-full border-x-2 border-[#d6d3d1] -z-0">
            <div
              class="w-full h-full opacity-20"
              style="background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, #000 5px, #000 6px);"
            />
          </div>

          <div class="flex flex-col gap-12 relative z-10 py-4">
            <div
              v-for="(unit, uIndex) in chapter.units"
              :key="unit.id"
              class="flex w-full"
              :class="{
                // 'justify-center': uIndex % 2 === 0, // Lurus di tengah (opsional)
                'justify-start pl-8': uIndex % 2 !== 0, // Kalau mau zigzag kiri
                'justify-end pr-8': uIndex % 2 === 0// Kalau mau zigzag kanan
              }"
            >
              <div
                class="transition-all duration-300"
                :class="{
                  'ml-0': uIndex % 2 !== 0, // Geser ke Kiri Tiang
                  'ml-16': uIndex % 2 === 0 // Geser ke Kanan Tiang
                }"
              >
                <UnitNode
                  :unit="unit"
                  :index="uIndex"
                />
              </div>
            </div>
          </div>

          <div class="relative z-20 mt-8 mx-auto w-32 h-4 bg-secondary rounded-full opacity-20" />
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import UnitNode from '~/components/learning-map/UnitNode.vue'

const authStore = useAuthStore()
const curriculumStore = useCurriculumStore()

onMounted(async () => {
  await authStore.fetchUser()
  await curriculumStore.fetchChapters()
})
</script>
