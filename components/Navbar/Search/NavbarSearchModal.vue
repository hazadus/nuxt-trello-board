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
          <form
            action="#"
            class="flex items-center"
          >
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Icon
                name="material-symbols:search"
                class="w-5 h-5 text-gray-700"
              />
            </div>

            <input
              type="text"
              placeholder="Найти..."
              class="w-full overflow-hidden py-4 pl-12 border-b border-gray-100 outline-none focus:border-none placeholder-gray-400 focus:ring-gray-100 rounded-lg"
            />

            <div class="absolute inset-y-0 right-0 flex items-center pr-4">
              <button
                type="button"
                class="flex items-center p-1.5 text-sm uppercase font-semibold tracking-wider text-gray-700 rounded-md border border-gray-200 focus:outline-none focus:border-gray-300"
              >
                Esc
              </button>
            </div>
          </form>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
