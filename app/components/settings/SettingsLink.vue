<template>
  <div>
    <ULink class="w-full flex justify-between items-center p-4 cursor-pointer" :to="to">
      <h2>{{ title }}</h2>

      <UIcon name="i-heroicons:chevron-right-20-solid" class="size-6" />
    </ULink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, required: true },
  title: { type: String, required: true }
})
</script>

<style scoped>

</style>
