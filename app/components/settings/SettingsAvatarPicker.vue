<template>
  <UFileUpload
    v-slot="{ open, removeFile }"
    v-model="state.avatar"
    accept="image/jpeg, image/png, image/webp"
    class="flex flex-col items-center"
    @update:model-value="handleFileChange"
  >
    <div
      class="relative cursor-pointer group"
      @click="open()"
    >
      <UAvatar
        :src="previewUrl"
        class="w-16 h-16 ring-4 ring-grey group-hover:ring-primary transition-all duration-300 shadow-md object-cover"
      />

      <div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <UIcon
          name="i-heroicons-camera-solid"
          class="size-8 text-white"
        />
      </div>

      <div class="absolute -bottom-2 -right-2 bg-surface border-2 border-grey rounded-full px-1.5 shadow-sm">
        <UIcon
          name="i-heroicons-pencil-solid"
          class="size-3 text-text-title"
        />
      </div>
    </div>

    <p class="text-xs text-muted mt-3 font-medium">
      {{ state.avatar ? state.avatar.name : 'Ketuk untuk mengubah foto' }}

      <UButton
        v-if="state.avatar"
        label="Hapus"
        color="error"
        variant="link"
        size="xs"
        class="p-0"
        @click="removeFile()"
      />
    </p>

    <p
      v-if="errorMessage"
      class="text-xs text-error mt-1 font-bold"
    >
      {{ errorMessage }}
    </p>
  </UFileUpload>
</template>

<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  currentAvatar?: string
}>()

const emit = defineEmits<{
  (e: 'update:file', file: File): void
}>()

const toast = useToast()

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/png']

const avatarSchema = z
  .instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, {
    error: 'Ukuran foto maksimal 2MB.'
  })
  .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    error: 'Format harus JPG, PNG, atau WebP.'
  })

const state = reactive<{ avatar: File | null | undefined }>({
  avatar: undefined
})

const errorMessage = ref<string | null>(null)

const previewUrl = computed(() => {
  if (state.avatar) {
    return URL.createObjectURL(state.avatar)
  }
  return props.currentAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mochi'
})

const handleFileChange = (file: File | null | undefined) => {
  errorMessage.value = null

  if (!file) return

  const result = avatarSchema.safeParse(file)

  if (!result.success) {
    const errorMsg = String(result.error._zod.def[0]?.message)
    errorMessage.value = errorMsg

    toast.add({
      title: 'Gagal upload foto',
      description: errorMsg,
      color: 'error'
    })

    state.avatar = undefined
    return
  }

  emit('update:file', file)
}
</script>
