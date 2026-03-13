<template>
  <UContainer class="min-h-screen bg-bg flex flex-col relative pb-24">
    <div class="md:bg-transparent bg-surface/80 backdrop-blur-md border-b border-grey px-4 py-4 sticky top-0 z-40">
      <UContainer class="max-w-2xl mx-auto flex gap-4 items-center">
        <div class="md:w-full">
          <h1 class="text-xl md:text-2xl font-extrabold text-text-title md:text-center">
            Papan Peringkat
          </h1>
          <p class="text-sm md:text-md text-text-muted md:text-center">
            Pemain Unggulan
          </p>
        </div>
      </UContainer>
    </div>

    <UContainer
      v-motion-slide-visible-once-bottom
      as="main"
      class="flex-1 w-full max-w-2xl mx-auto py-6 mt-2 flex flex-col"
    >
      <div
        v-if="topThree.length === 3"
        class="flex justify-center items-end gap-2 sm:gap-4 mb-10 mt-4 h-56"
      >
        <div class="flex flex-col items-center w-1/3 max-w-25 order-1">
          <div class="relative mb-2">
            <UAvatar
              :src="topThree[1]!.avatar_url as string"
              size="xl"
              :alt="topThree[1]!.name"
              class="ring-4 ring-gray-300 shadow-lg"
            />
            <div class="absolute -bottom-3 -right-2 bg-gray-200 text-gray-700 w-7 h-7 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
              2
            </div>
          </div>
          <span class="text-sm font-bold text-text-title truncate w-full text-center">{{ topThree[1]!.name }}</span>
          <span class="text-xs font-bold text-warning mt-1">{{ topThree[1]!.stats.xp }} XP</span>
          <div class="w-full h-24 bg-linear-to-t from-gray-200 to-gray-100 rounded-t-2xl mt-3 border-x-2 border-t-2 border-gray-300" />
        </div>

        <div class="flex flex-col items-center w-1/3 max-w-27.5 order-2 z-10 -mb-2">
          <div class="relative mb-2">
            <UIcon
              name="i-heroicons-star-solid"
              class="w-8 h-8 text-warning absolute -top-6 left-1/2 -translate-x-1/2 drop-shadow-md animate-bounce-slow"
            />
            <UAvatar
              :src="topThree[0]!.avatar_url as string"
              size="2xl"
              :alt="topThree[0]!.name"
              class="ring-4 ring-warning shadow-xl"
            />
            <div class="absolute -bottom-3 -right-2 bg-warning text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
              1
            </div>
          </div>
          <span class="text-sm font-bold text-text-title truncate w-full text-center">{{ topThree[0]!.name }}</span>
          <span class="text-xs font-bold text-warning mt-1">{{ topThree[0]!.stats.xp }} XP</span>
          <div class="w-full h-32 bg-linear-to-t from-warning/40 to-warning/20 rounded-t-2xl mt-3 border-x-2 border-t-2 border-warning/50 shadow-[0_-5px_15px_rgba(250,204,21,0.2)]" />
        </div>

        <div class="flex flex-col items-center w-1/3 max-w-25 order-3">
          <div class="relative mb-2">
            <UAvatar
              :src="topThree[2]!.avatar_url as string"
              size="xl"
              :alt="topThree[2]!.name"
              class="ring-4 ring-orange-300 shadow-lg"
            />
            <div class="absolute -bottom-3 -right-2 bg-orange-200 text-orange-800 w-7 h-7 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
              3
            </div>
          </div>
          <span class="text-sm font-bold text-text-title truncate w-full text-center">{{ topThree[2]!.name }}</span>
          <span class="text-xs font-bold text-warning mt-1">{{ topThree[2]!.stats.xp }} XP</span>
          <div class="w-full h-20 bg-linear-to-t from-orange-200 to-orange-100 rounded-t-2xl mt-3 border-x-2 border-t-2 border-orange-300" />
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-for="(user, index) in restOfLeaderboard"
          :key="user.id"
          class="flex items-center justify-between p-4 rounded-2xl border-2 transition-all"
          :class="user.id === currentUserId ? 'bg-primary/5 border-primary shadow-sm' : 'bg-surface border-grey hover:border-primary/30'"
        >
          <div class="flex items-center gap-4">
            <span class="font-bold text-text-muted w-5 text-center">{{ index + 4 }}</span>
            <UAvatar
              :src="user.avatar_url as string"
              :alt="user.name"
              size="md"
            />
            <div class="flex flex-col">
              <span class="font-bold text-text-title text-sm">{{ user.name }}</span>
              <span
                v-if="user.id === currentUserId"
                class="text-[10px] font-bold text-primary uppercase tracking-wider"
              >Ini Kamu!</span>
              <span
                v-else
                class="text-xs text-text-muted"
              >{{ user.email }}</span>
            </div>
          </div>

          <div class="font-black text-warning">
            {{ user.stats.xp }} XP
          </div>
        </div>
      </div>
    </UContainer>
  </UContainer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authStore = useAuthStore()

interface LeaderboardResponse {
  id: number
  name: string
  email: string
  avatar_url: string | null
  stats: {
    xp: number
    gems: number
    streak: number
    energy: number
    rank: number
    next_heart_in: number
  }
  joined_at: string
}

interface LeaderboardApiResponse {
  data: LeaderboardResponse[]
}

const currentUserId = authStore.user?.id

const { data: leaderboardResponse } = await useFetch<LeaderboardApiResponse>(`${config.public.baseApi}/leaderboard`, {
  headers: { Authorization: `Bearer ${authStore.token}` }
})

const leaderboardData = computed(() => leaderboardResponse.value?.data || [])

const topThree = computed(() => leaderboardData.value.slice(0, 3))
const restOfLeaderboard = computed(() => leaderboardData.value.slice(3))
</script>

<style scoped>
.animate-bounce-slow {
  animation: bounce 2.5s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(-10%) translateX(-50%); }
  50% { transform: translateY(10%) translateX(-50%); }
}
</style>
