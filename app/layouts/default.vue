<template>
  <UPage class="">
    <HeaderMain />

    <slot />

    <NavigationMain />
  </UPage>
</template>

<script setup lang="ts">
import HeaderMain from '~/components/layout/HeaderMain.vue'
</script>

<style scoped>

</style>
