<template>
  <nav>
    <div class="hidden md:block">
      <DesktopSidebar />
    </div>

    <div class="block md:hidden">
      <MobileNavbar />
    </div>
  </nav>
</template>

<script setup lang="ts">
import DesktopSidebar from './DesktopSidebar.vue'
import MobileNavbar from './MobileNavbar.vue'
</script>

<style scoped>

</style>
