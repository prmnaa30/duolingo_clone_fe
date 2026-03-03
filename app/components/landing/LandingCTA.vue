<template>
  <UPageSection>
    <UPageCTA
      title="Ready to master Japanese?"
      description="Join the project, contribute to the code, or start your learning journey with Mochi today."
      variant="subtle"
      :links="[{
        label: 'Start Learning Now',
        onClick: handleClick,
        icon: 'i-heroicons-rocket-launch',
        color: 'primary',
        size: 'xl'
      }, {
        label: 'Read Project Docs',
        to: 'https://docs.google.com/document/d/17thcB50lPtRpPeM058m3lJPlIiUiu9mB',
        target: '_blank',
        icon: 'i-heroicons-document-text',
        color: 'neutral',
        variant: 'outline',
        size: 'xl'
      }]"
    />
  </UPageSection>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>
