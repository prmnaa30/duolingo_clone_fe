<template>
  <UCard
    class="p-6 border-2 flex flex-col items-center text-center shadow-sm rounded-3xl"
    :class="score >= 80 ? 'bg-success/10 border-success' : 'bg-warning/10 border-warning'"
  >
    <template #default>
      <UBadge
        :color="score >= 80 ? 'success' : 'warning'"
        class="mb-3 font-bold px-3 py-1 text-sm"
      >
        {{ score >= 80 ? 'Luar Biasa!' : 'Sedikit Lagi!' }}
      </UBadge>

      <h2
        class="text-5xl font-black mb-2"
        :class="score >= 80 ? 'text-success' : 'text-warning'"
      >
        {{ score }}%
      </h2>

      <p class="text-text-body font-medium leading-relaxed">
        {{ feedback }}
      </p>
    </template>
  </UCard>
</template>

<script setup lang="ts">
defineProps({
  score: { type: Number, required: true },
  feedback: { type: String, required: true }
})
</script>

<style scoped>

</style>
