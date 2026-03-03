<template>
  <div class="relative">
    <div class="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
    <img
      :draggable="false"
      :src="flatmochi"
      class="absolute top-2 left-2 w-10"
    >
  </div>
  <p
    v-if="label"
    class="text-text-muted font-bold animate-pulse"
  >
    {{ label }}
  </p>
</template>

<script setup lang="ts">
import flatmochi from '~/assets/icons/flatmochi.svg'

defineProps({
  label: String
})
</script>
