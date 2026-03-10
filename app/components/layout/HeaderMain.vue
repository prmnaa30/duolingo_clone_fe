<template>
  <header class="bg-surface h-12">
    <UContainer class="flex gap-4 items-center h-full overflow-hidden">
      <StatPopover
        icon="i-noto-v1:flag-for-flag-japan"
        :value="userStats?.xp || 0"
      >
        <div class="grid items-center justify-center gap-4 p-4 text-center">
          <h2 class="text-xl">
            Total XP
          </h2>

          <div class="px-4 py-2 flex gap-2 items-center justify-center">
            <UIcon
              name="i-noto-v1:flag-for-flag-japan"
              class="size-8"
            />
            <p class="text-xl">
              {{ userStats?.xp }} XP
            </p>
          </div>

          <div>
            <h3>
              死ぬまで勉強！！
            </h3>
            <p>Semakin sering belajar, semakin banyak XP yang didapat.</p>
          </div>
        </div>
      </StatPopover>

      <StatPopover
        icon="i-noto-v1:fire"
        :value="userStats?.streak || 0"
      >
        <div class="grid items-center justify-center gap-4 p-4 text-center">
          <h2 class="text-xl">
            Streak
          </h2>

          <div class="px-4 py-2 flex gap-2 items-center justify-center">
            <UIcon
              name="i-noto-v1:fire"
              class="size-8"
            />
            <p class="text-xl">
              {{ userStats?.streak }} Hari
            </p>
          </div>

          <div>
            <h3>
              {{ userStats?.streak == 0 ? 'Mulai streakmu sekarang!' : 'Pertahankan!' }}
            </h3>
            <p>{{ userStats?.streak == 0 ? 'Belajarlah secara rutin untuk memulai streak.' : 'Konsistenlah dalam belajar untuk mempertahankan streakmu!' }}</p>
          </div>
        </div>
      </StatPopover>

      <StatPopover
        icon="i-fluent-emoji-flat:battery"
        :value="userStats?.energy || 0"
      >
        <div class="grid items-center justify-center gap-4 p-4 text-center">
          <h2 class="text-xl">
            Energi
          </h2>

          <div class="px-8 py-2 grid grid-cols-5 gap-1 items-center justify-center">
            <UIcon
              v-for="i in 10"
              :key="i"
              :name="i <= (userStats?.energy || 0) ? 'i-fluent-emoji-flat:battery' : 'i-fluent-emoji-flat:low-battery'"
              class="size-8"
              :class="{ 'opacity-50': i > (userStats?.energy || 0) }"
            />
          </div>

          <div>
            <h3 v-if="userStats?.energy as number < 10">
              Energi selanjutnya pulih dalam: {{ userStats?.next_heart_in }}
            </h3>
            <h3 v-else>
              Energi penuh!
            </h3>
            <p>Semangat belajarnya!!</p>
          </div>
        </div>
      </StatPopover>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import StatPopover from './StatsPopover.vue'

const authStore = useAuthStore()
const userStats = authStore.user?.stats
</script>

<style scoped>

</style>
