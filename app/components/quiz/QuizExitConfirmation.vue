<template>
  <UModal
    v-model:open="isOpen"
    :dismissible="false"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="p-2 pb-0 bg-warning/20 rounded-full text-warning">
          <UIcon
            name="i-heroicons-pause-circle-solid"
            class="w-8 h-8"
          />
        </div>
        <h3 class="text-xl font-bold text-text-title">
          Jeda Belajar?
        </h3>
      </div>
    </template>

    <template #body>
      <div class="py-2 text-text-body">
        <p class="mb-3">
          Kamu sedang berada di tengah kuis. Progres jawabanmu sejauh ini sudah kami simpan otomatis.
        </p>
        <p class="text-sm text-text-muted bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          💡 <b>Tips:</b> Pilih "Keluar & Simpan" jika kamu ingin melanjutkannya nanti tanpa mengulang dari awal.
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-col gap-3 w-full">
        <BaseButton
          class="w-full h-12"
          color="success"
          @click="emit('continue')"
        >
          Kembali Belajar
        </BaseButton>

        <BaseButton
          class="w-full h-12"
          color="primary"
          variant="soft"
          @click="emit('exit-save')"
        >
          Simpan & Keluar
        </BaseButton>

        <button
          class="text-error font-bold text-sm hover:underline mt-2 transition-all"
          @click="emit('exit-discard')"
        >
          Hapus Progres & Keluar
        </button>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

const isOpen = defineModel('isOpen', { type: Boolean, default: false })

const emit = defineEmits(['continue', 'exit-save', 'exit-discard'])
</script>

<style scoped>

</style>
