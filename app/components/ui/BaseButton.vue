<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :type="to ? undefined : type"
    :to="to"
    :disabled="disabled || loading"
    :style="cssVars"
    class="
      relative inline-flex items-center justify-center px-4 py-2
      rounded-2xl font-bold uppercase tracking-wider
      transition-all duration-200 ease-out active:duration-0
      select-none focus:outline-none
      bg-(--btn-bg) text-(--btn-text)

      shadow-[0_5px_0_var(--btn-edge)]

      active:shadow-none active:translate-y-1.25
      hover:-translate-y-0.5 hover:shadow-[0_7px_0_var(--btn-edge)]

      disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0
    "
    @click="handleClick"
  >
    <span
      v-if="$slots.iconLeft"
      class="mr-2 flex justify-center"
    >
      <slot name="iconLeft" />
    </span>

    <span v-if="!loading">
      <slot>{{ label }}</slot>
    </span>

    <span
      v-else
      class="animate-spin"
    >
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </span>

    <span
      v-if="$slots.iconRight"
      class="ml-2 flex justify-center"
    >
      <slot name="iconRight" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

interface Props {
  label?: string
  to?: string
  type?: string
  color?: 'primary' | 'success' | 'danger' | 'neutral' | 'warning'
  block?: boolean
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  block: false,
  loading: false,
  disabled: false
})

const NuxtLink = resolveComponent('NuxtLink')

const cssVars = computed(() => {
  const colorMap: Record<string, string> = {
    primary: 'var(--primary)',
    success: 'var(--success)',
    danger: 'var(--error)',
    warning: 'var(--warning)',
    neutral: 'var(--secondary)'
  }

  const textMap: Record<string, string> = {
    primary: 'var(--primary-fg)',
    success: '#ffffff',
    danger: '#ffffff',
    warning: '#ffffff',
    neutral: 'var(--secondary-fg)'
  }

  const baseColor = colorMap[props.color] || 'var(--primary)'
  const textColor = textMap[props.color] || '#ffffff'

  return {
    '--btn-bg': baseColor,
    '--btn-text': textColor,
    '--btn-edge': `color-mix(in srgb, ${baseColor}, black 25%)`
  }
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>
