<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <button
    :disabled="isDisabled"
    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm enabled:hover:bg-gray-300 disabled:text-gray-500"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="mr-1 -ml-1 w-4 h-4 shrink-0"
    />
    <span>
      <slot />
    </span>
  </button>
</template>
