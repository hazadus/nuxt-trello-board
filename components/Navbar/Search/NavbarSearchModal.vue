<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionRoot, TransitionChild } from "@headlessui/vue";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "closeModal", closeModal: boolean): void;
}>();
</script>

<template>
  <TransitionRoot
    as="template"
    :show="isOpen"
  >
    <Dialog
      class="fixed inset-0 z-50 flex justify-center items-start"
      :open="isOpen"
      @close="() => emit('closeModal', true)"
    >
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black bg-opacity-70"></DialogOverlay>
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div class="w-full max-w-2xl bg-white rounded-lg mx-4 max-h-[80vh] mt-[10vh] relative">
          SearchModal
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
