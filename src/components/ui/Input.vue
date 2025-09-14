<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix" />
      </div>
      
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200',
          'focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary-600',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'pl-10': $slots.prefix,
            'pr-10': $slots.suffix,
            'border-red-300 dark:border-red-600 focus:ring-red-600 focus:border-red-600': error,
          },
          sizeClasses
        ]"
      />
      
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="suffix" />
      </div>
    </div>
    
    <p v-if="error" class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-gray-500 dark:text-gray-400">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputId = useId()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-4 text-base',
  }
  return sizes[props.size]
})
</script>