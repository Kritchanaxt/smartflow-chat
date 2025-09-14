<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              <!-- Header -->
              <div class="flex items-center justify-between mb-4">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {{ title }}
                </DialogTitle>
                <button
                  @click="closeModal"
                  class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>

              <!-- Body -->
              <div class="mb-6">
                <slot />
              </div>

              <!-- Footer -->
              <div v-if="$slots.footer" class="flex justify-end space-x-3">
                <slot name="footer" />
              </div>
              <div v-else class="flex justify-end space-x-3">
                <Button variant="secondary" @click="closeModal">
                  Cancel
                </Button>
                <Button variant="primary" @click="$emit('confirm')">
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Button from './Button.vue'

interface Props {
  isOpen: boolean
  title: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const closeModal = () => {
  emit('close')
}
</script>