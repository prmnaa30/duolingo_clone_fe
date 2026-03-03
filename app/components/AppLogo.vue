<template>
  <div class="flex items-center gap-2 text-primary">
    <img
      :src="flatMochi"
      class="h-10"
    >

    <span class="tracking-tight font-bold text-2xl">
      meowlingo
    </span>
  </div>
</template>

<script setup lang="ts">
import flatMochi from '~/assets/icons/flatmochi.svg'
</script>
