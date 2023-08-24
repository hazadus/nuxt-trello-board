<script setup lang="ts">
const emit = defineEmits<{
  (e: "shortcutPressed", isPressed: boolean): void;
}>();

const isAppleOs = () => {
  const platform = navigator.userAgent;
  return /(Mac|iPhone|iPad|iPod)/i.test(platform);
};

const keyaboardShortcut = isAppleOs() ? "⌘ /" : "Ctrl+/";

const onKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && (event.key === "/" || event.key === ".")) {
    emit("shortcutPressed", true);
  }
};

onMounted(() => window.addEventListener("keydown", onKeyDown));
onUnmounted(() => window.removeEventListener("keydown", onKeyDown));
</script>

<template>
  <div
    class="flex items-center space-x-2 w-40 sm:w-56 md:w-96 text-gray-900 border border-gray-900/10 bg-teal-500 bg-opacity-50 hover:bg-opacity-70 shadow-sm px-3 py-1.5 hover:border-gray-300 focus:outline-none focus:border-gray-300 rounded-lg cursor-pointer"
  >
    <Icon
      name="material-symbols:search"
      class="text-xl"
    />
    <span class="flex-1 text-left text-gray-600"> Найти... </span>
    <span class="hidden sm:flex">{{ keyaboardShortcut }}</span>
  </div>
</template>
