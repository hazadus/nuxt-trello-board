<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import { IFile } from "types";

const fileTypeIcons = new Map();
fileTypeIcons.set("image/png", "bi:filetype-png");
fileTypeIcons.set("image/svg+xml", "bi:filetype-svg");
fileTypeIcons.set("application/pdf", "bi:filetype-pdf");

defineProps({
  file: {
    type: Object as PropType<IFile>,
    required: true,
  },
});
</script>

<template>
  <div class="bg-gray-100 rounded-md p-5 flex flex-row gap-2 shadow-md items-center">
    <div>
      <Icon
        v-if="fileTypeIcons.has(file.mimeType)"
        :name="fileTypeIcons.get(file.mimeType)"
        size="32"
      />
      <Icon
        v-else
        name="mdi:file-outline"
        size="32"
      />
    </div>
    <div class="flex flex-col flex-1">
      <div class="text-md font-semibold">
        <a
          :href="`/uploads/${file.fileName}`"
          target="_blank"
          class="hover:underline mb-1"
          >{{ file.fileName }}</a
        >
      </div>
      <div class="text-sm text-gray-400">
        {{ file.size.toLocaleString() }} байт &middot; {{ file.mimeType }}
      </div>
    </div>
    <div class="text-md text-gray-400 hidden md:block">
      {{ formatTimeAgo(new Date(file.createdAt!)) }}
    </div>
  </div>
</template>
