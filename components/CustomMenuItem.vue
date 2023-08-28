<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";

defineProps({
  icon: {
    type: String,
    required: false,
  },
  link: {
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
    v-slot="{ active, disabled, close }"
    :disabled="isDisabled"
    class="cursor-pointer"
  >
    <NuxtLink
      :to="link || ''"
      class="block px-4 py-3 text-md text-gray-700"
      :class="{ 'bg-gray-100': active, 'opacity-40': disabled }"
      @click="close()"
    >
      <div class="flex flex-row items-center">
        <Icon
          v-if="icon"
          :name="icon"
          class="mr-2 shrink-0"
          size="20"
        />
        <div>
          <slot />
        </div>
      </div>
    </NuxtLink>
  </MenuItem>
</template>
