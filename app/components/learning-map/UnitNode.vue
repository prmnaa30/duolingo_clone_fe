<script setup>
const props = defineProps({
  unit: Object,
  index: Number
})

const statusColor = computed(() => {
  switch (props.unit.status) {
    case 'completed': return 'bg-warning text-white ring-warning'
    case 'open': return 'bg-primary text-white ring-primary animate-bounce-slow'
    default: return 'bg-grey text-text-muted ring-grey grayscale'
  }
})

const handleClick = () => {
  if (props.unit.status === 'locked') return
  navigateTo(`/units/${props.unit.id}`)
}
</script>

<template>
  <div
    class="relative z-10 flex flex-col items-center justify-center cursor-pointer group transition-transform hover:scale-105"
    @click="handleClick"
  >
    <div
      class="absolute -bottom-2 w-24 h-8 rounded-[50%] opacity-50 shadow-sm -z-50"
      :class="props.unit.status === 'locked' ? 'bg-slate-300' : 'bg-orange-200'"
    />

    <div
      class="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_4px_0_0_rgba(0,0,0,0.2)] ring-4 ring-offset-2 ring-offset-bg transition-all active:translate-y-1 active:shadow-none"
      :class="statusColor"
    >
      <UIcon
        v-if="props.unit.status === 'completed'"
        name="i-heroicons-star-solid"
        class="w-8 h-8"
      />

      <UIcon
        v-else-if="props.unit.status === 'open'"
        name="i-heroicons-play-solid"
        class="w-8 h-8"
      />

      <UIcon
        v-else
        name="i-heroicons-lock-closed-solid"
        class="w-6 h-6"
      />
    </div>

    <div
      v-if="props.unit.stars > 0"
      class="absolute -top-6 flex gap-1"
    >
      <UIcon
        v-for="n in 3"
        :key="n"
        name="i-heroicons-star-solid"
        class="w-4 h-4"
        :class="n <= props.unit.stars ? 'text-warning' : 'text-grey'"
      />
    </div>

    <div class="absolute top-20 bg-surface w-40 overflow-hidden px-3 py-1 rounded-xl shadow-md border border-grey text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity z-20">
      {{ props.unit.name }}
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
