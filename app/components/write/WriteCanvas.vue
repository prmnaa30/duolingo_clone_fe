<template>
  <div class="flex flex-col items-center w-full">
    <div
      class="relative w-full aspect-square max-w-sm rounded-3xl overflow-hidden border-2 bg-white shadow-inner mb-6 transition-all"
      :class="isAnalyzing || isAnalyzed ? 'border-primary/50 opacity-80' : 'border-grey'"
    >
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div class="w-full h-px bg-black absolute" />
        <div class="h-full w-px bg-black absolute" />
      </div>

      <canvas
        ref="canvasRef"
        class="w-full h-full cursor-crosshair touch-none"
        @pointerdown="startDrawing"
        @pointermove="draw"
        @pointerup="stopDrawing"
        @pointerout="stopDrawing"
      />

      <div
        v-if="isAnalyzing"
        class="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="w-10 h-10 animate-spin text-primary mb-2"
        />
        <p class="font-bold text-text-title text-sm animate-pulse">
          AI sedang menilai...
        </p>
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-4 w-full max-w-sm"
      :class="isAnalyzed ? 'hidden' : ''"
    >
      <BaseButton
        color="neutral"
        variant="soft"
        class="h-12"
        :disabled="isAnalyzing"
        @click="clearCanvas"
      >
        <template #iconLeft>
          <UIcon
            name="i-heroicons-trash"
            class="size-5"
          />
        </template>

        <template #default>
          Hapus
        </template>
      </BaseButton>

      <BaseButton
        color="primary"
        class="h-12"
        :disabled="isAnalyzing || isCanvasBlank"
        @click="submitDrawing"
      >
        <template #iconLeft>
          <UIcon
            name="i-heroicons-sparkles-solid"
            class="size-5"
          />
        </template>

        <template #default>
          Periksa
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'

const props = defineProps<{
  isAnalyzing: boolean
  isAnalyzed: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', base64Image: string): void
  (e: 'clear'): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const isCanvasBlank = ref(true)

let ctx: CanvasRenderingContext2D | null = null
let lastX = 0
let lastY = 0

onMounted(() => {
  if (canvasRef.value) {
    const canvas = canvasRef.value
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 12
      ctx.strokeStyle = '#333333'
    }
  }
})

const getCoordinates = (e: PointerEvent) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

const startDrawing = (e: PointerEvent) => {
  if (props.isAnalyzing || props.isAnalyzed) return
  isDrawing.value = true
  isCanvasBlank.value = false
  const { x, y } = getCoordinates(e)
  lastX = x
  lastY = y
}

const draw = (e: PointerEvent) => {
  if (!isDrawing.value || !ctx || props.isAnalyzing || props.isAnalyzed) return
  const { x, y } = getCoordinates(e)

  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(x, y)
  ctx.stroke()

  lastX = x
  lastY = y
}

const stopDrawing = () => {
  isDrawing.value = false
}

const clearCanvas = () => {
  if (!canvasRef.value || !ctx) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  isCanvasBlank.value = true
  emit('clear')
}

const submitDrawing = () => {
  if (!canvasRef.value || isCanvasBlank.value) return

  const base64Image = canvasRef.value.toDataURL('image/png')
  emit('submit', base64Image)
}
</script>
