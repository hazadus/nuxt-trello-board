<script setup lang="ts">
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const isOpen = ref(false);

function setIsOpen(value: boolean) {
  isOpen.value = value;
}

function placeholder() {
  alert("Not yet implemented!");
}
</script>

<template>
  <button @click="setIsOpen(true)"
    class="text-gray-100 bg-transparent px-5 py-0 rounded hover:bg-gray-100 hover:bg-opacity-20">
    <Icon name="ph:dots-three-outline-fill" />
  </button>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog :open="isOpen" @close="setIsOpen" class="fixed inset-0 overflow-hidden z-10">
      <TransitionChild as="template" enter="transition-opacity ease-in-out duration-300" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition-opacity ease-in-out duration-300" leave-from="opacity-100"
        leave-to="opacity-0">
        <DialogOverlay class="absolute inset-0 bg-black bg-opacity-40" />
      </TransitionChild>

      <TransitionChild as="template" enter="transform ease-in-out transition-transform duration-300"
        enter-from="translate-x-full" enter-to="translate-x-0"
        leave="transform ease-in-out transition-transform duration-300" leave-from="translate-x-0"
        leave-to="translate-x-full">
        <div class="bg-gray-100 flex flex-col fixed inset-y-0 right-0 w-full max-w-sm">
          <div class="flex justify-between items-center p-4 shadow">
            <DialogTitle class="text-xl font-semibold">
              Menu
            </DialogTitle>
            <button @click="setIsOpen(false)"
              class="text-xl text-gray-900 bg-transparent px-3 py-0 rounded hover:bg-gray-300 hover:bg-opacity-20">
              <Icon name="mdi:close" />
            </button>
          </div>

          <DialogDescription class="p-4">
            Actions available for the board ...
          </DialogDescription>

          <div class="flex-1 flex flex-col">
            <div class="flex-1 px-1">
              <div class="p-4 font-semibold hover:bg-gray-200 hover:cursor-pointer" @click="placeholder()">
                Description
              </div>
              <div class="p-4 font-semibold hover:bg-gray-200 hover:cursor-pointer" @click="placeholder()">
                Background color
              </div>
              <div class="p-4 font-semibold hover:bg-gray-200 hover:cursor-pointer" @click="placeholder()">
                Close the board
              </div>
            </div>
            <div class="flex flex-col text-gray-400">
              <div class="px-4 py-1">
                Created: ...
              </div>
              <div class="px-4 py-1">
                Updated: ...
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>