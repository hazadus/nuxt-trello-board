<script setup lang="ts">
import draggable from "vuedraggable";
import type { Column } from '@/types';
import { nanoid } from "nanoid";

const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: "Нужно сделать 🚀",
    tasks: [
      {
        id: nanoid(),
        title: "Поспать",
        isCompleted: true,
        isFavorite: false,
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Поработать",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Пройти курс TypeScript with Vue.js 3",
        isCompleted: false,
        isFavorite: true,
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Поесть",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Повторить!",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: "Завтра ☀️",
    tasks: [
      {
        id: nanoid(),
        title: "Работу работать",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: "Разобрать 📥",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Выполнено 🏆",
    tasks: [],
  },
]);
</script>

<template>
  <div>
    <!-- When `handle` prop is defined, the column can be dragged only by it's handle. -->
    <draggable v-model="columns" group="columns" item-key="id" :animation="200" handle=".drag-handle"
      class="flex gap-4 overflow-x-auto items-start">
      <template #item="{ element: column }: { element: Column }">
        <div class="column bg-gray-200 p-5 rounded shadow min-w-[300px]">
          <header class="font-bold mb-4">
            <DragHandle />
            {{ column.title }}
          </header>

          <BoardTaskCard v-for="task in column.tasks" :key="task.id" :task="task" />

          <footer>
            <button class="p-2 text-gray-500">
              <Icon name="material-symbols:add-card" />&nbsp;
              <span class="text-sm">Добавить карточку</span>
            </button>
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>