<script setup lang="ts">
import { Dialog, DialogOverlay } from "@headlessui/vue";

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
  <Dialog
    class="fixed inset-0 z-50 flex justify-center items-start"
    :open="isOpen"
    :onClose="() => emit('closeModal', true)"
  >
    <DialogOverlay class="fixed inset-0 bg-black bg-opacity-70"></DialogOverlay>

    <div class="w-full max-w-2xl bg-white rounded-lg mx-4 max-h-[80vh] mt-[10vh] relative">
      SearchModal
    </div>
  </Dialog>
</template>
