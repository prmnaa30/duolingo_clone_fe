<template>
  <nav>
    <div class="hidden md:block">
      <!-- TODO: Add desktop navbar here -->
    </div>

    <div class="block md:hidden">
      <MobileNavbar />
    </div>
  </nav>
</template>

<script setup lang="ts">
import MobileNavbar from './MobileNavbar.vue'
</script>

<style scoped>

</style>
