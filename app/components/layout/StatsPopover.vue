<template>
  <UPopover
    mode="hover"
    arrow
  >
    <div class="p-1 rounded-lg flex gap-2 items-center hover:bg-surface-grey transition-colors duration-200 ease-in cursor-default">
      <UIcon
        :name="icon"
        class="size-5 md:size-7"
      />
      <p class="md:text-lg">
        {{ value }}
      </p>
    </div>

    <template #content>
      <div class="grid items-center justify-center px-4 py-2 w-80">
        <slot />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  }
})
</script>

<style scoped>

</style>
