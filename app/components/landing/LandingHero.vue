<template>
  <UPageHero
    title="Meowlingo"
    description="A scalable Japanese learning platform powered by Generative AI and Nuxt. Experience a modern architecture designed for adaptive learning, gamification, and real-time feedback."
    reverse
  >
    <template #links>
      <BaseButton
        color="primary"
        @click="handleClick"
      >
        <template #iconRight>
          <UIcon
            name="i-heroicons-sparkles"
            class="size-5"
          />
        </template>

        <template #default>
          Start learning
        </template>
      </BaseButton>

      <BaseButton
        color="neutral"
        class="opacity-70"
        to="https://github.com/prmna30/duolingo_clone_fe"
      >
        <template #iconRight>
          <UIcon
            name="i-lucide-github"
            class="size-5"
          />
        </template>

        <template #default>
          Source Code
        </template>
      </BaseButton>
    </template>
    <NuxtImg
      src="/images/mochi.webp"
      width="250"
      class="mx-auto"
    />
  </UPageHero>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
