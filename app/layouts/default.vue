<template>
  <UPage>
    <HeaderMain class="md:hidden" />

    <UMain class="md:ml-64 md:grid md:grid-cols-12 md:px-8 md:gap-8">
      <div class="md:col-span-7">
        <slot />
      </div>

      <aside class="hidden md:block md:sticky top-0 md:col-span-4 h-40">
        <HeaderMain />

        <div class="flex justify-center mt-12">
          <MochiMotivate />
        </div>
      </aside>
    </UMain>

    <NavigationMain />
  </UPage>
</template>

<script setup lang="ts">
import HeaderMain from '~/components/layout/HeaderMain.vue'
import MochiMotivate from '~/components/layout/MochiMotivate.vue'
</script>

<style scoped>

</style>
