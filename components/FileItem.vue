<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import { IFile } from "types";

const fileStore = useFileStore();

const fileTypeIcons = new Map();
fileTypeIcons.set("image/png", "bi:filetype-png");
fileTypeIcons.set("image/svg+xml", "bi:filetype-svg");
fileTypeIcons.set("application/pdf", "bi:filetype-pdf");

const isDeleting = ref(false);

const props = defineProps({
  file: {
    type: Object as PropType<IFile>,
    required: true,
  },
  size: {
    type: String,
    default: "large",
    required: false,
  },
});

const emit = defineEmits<{
  (e: "delete", payload: IFile): void;
}>();

const onClickDelete = async () => {
  isDeleting.value = true;
  await fileStore.delete(props.file._id!);
  emit("delete", props.file);
  isDeleting.value = false;
};
</script>

<template>
  <div
    class="bg-gray-100 rounded-md flex flex-row gap-2 items-center"
    :class="[size === 'small' ? 'p-2' : 'p-5', size === 'small' ? 'shadow-sm' : 'shadow-md']"
  >
    <div class="hidden sm:block">
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
          :href="`/file/${file.fileName}`"
          target="_blank"
          class="hover:underline mb-1"
        >
          {{ file.fileName }}
        </a>
      </div>
      <div class="text-sm text-gray-400">
        {{ file.size.toLocaleString() }} байт &middot;
        <span :class="size === 'small' ? 'hidden' : 'inline-block'">
          {{ file.mimeType }} &middot;
        </span>
        {{ formatTimeAgo(new Date(file.createdAt!)) }}
      </div>
    </div>
    <div>
      <CustomButton
        :icon="isDeleting ? `svg-spinners:3-dots-scale` : `material-symbols:delete-outline`"
        :isDisabled="isDeleting"
        @click="onClickDelete"
      >
        Удалить
      </CustomButton>
    </div>
  </div>
</template>
