<script setup lang="ts">
import type { ITask } from "@/types";

const emit = defineEmits<{
  (e: "add", payload: ITask): void;
}>();

const focused = ref(false);
const title = ref("");

function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault();
    emit("add", {
      title: title.value.trim(),
      isCompleted: false,
      isFavorite: false,
    } as ITask);
  }

  title.value = "";
}
</script>

<template>
  <div>
    <textarea
      v-model="title"
      class="bg-gray-200 focus:bg-white focus:shadow p-2 focus:pl-3 text-gray-500 resize-none rounded w-full border-none overflow-y-hidden focus:overflow-y-auto"
      :class="{
        'h-7': !focused,
        'h-20': focused,
      }"
      :placeholder="!focused ? '+ Добавить карточку' : 'Введите текст карточки'"
      style="outline: none !important"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>
