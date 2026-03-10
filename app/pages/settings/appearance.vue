<template>
  <UContainer>
    <div class="mt-4 border border-accented bg-surface p-4 rounded-2xl">
      <h2 class="mb-1">
        Mode Tampilan
      </h2>
      <UColorModeSelect class="w-full" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings'
})
</script>

<style scoped>

</style>
