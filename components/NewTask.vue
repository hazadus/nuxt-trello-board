<script setup lang="ts">
import type { Task } from "@/types";
import { nanoid } from "nanoid";

const emit = defineEmits<{
  (e: "add", payload: Task): void;
}>();

// We don't need to import `ref()`, because it's Nuxt :)
const focused = ref(false);
const title = ref("");

function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault();
    emit("add", {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid(),
    } as Task)
  }

  title.value = "";
}
</script>

<template>
  <div>
    <textarea v-model="title" @keydown.tab="createTask" @keyup.enter="createTask"
      class="bg-gray-200 focus:bg-white focus:shadow p-2 focus:pl-3 text-gray-500 resize-none rounded w-full border-none overflow-y-hidden focus:overflow-y-auto"
      :class="{
        'h-7': !focused,
        'h-20': focused,
      }" style="outline: none !important;" @focus="focused = true" @blur="focused = false"
      :placeholder="!focused ? '+ Добавить карточку' : 'Введите текст карточки'" />
  </div>
</template>