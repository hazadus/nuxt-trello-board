<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";

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
});
</script>

<template>
  <MenuItem
    v-slot="{ active, disabled }"
    :disabled="isDisabled"
  >
    <a
      href="#"
      class="block px-4 py-3 text-md text-gray-700"
      :class="{ 'bg-gray-100': active, 'opacity-40': disabled }"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="mr-2"
      />
      <slot />
    </a>
  </MenuItem>
</template>
