<script setup lang="ts">
import draggable from "vuedraggable";
import type { Column, Task } from '@/types';
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
        completedAt: null,
      },
      {
        id: nanoid(),
        title: "Поработать",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
        completedAt: null,
      },
      {
        id: nanoid(),
        title: "Пройти курс TypeScript with Vue.js 3",
        isCompleted: false,
        isFavorite: true,
        createdAt: new Date(),
        completedAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Поесть",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
        completedAt: null,
      },
      {
        id: nanoid(),
        title: "Повторить!",
        isCompleted: false,
        isFavorite: false,
        createdAt: new Date(),
        completedAt: null,
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
        completedAt: null,
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

// `alt` will be reactive boolean value, equal to `true` when the alt (or option) key is pressed.
const alt = useKeyModifier("Alt");
</script>

<template>
  <div>
    <!-- When `handle` prop is defined, the column can be dragged only by it's handle. -->
    <draggable v-model="columns" group="columns" item-key="id" :animation="200" handle=".drag-handle"
      class="flex gap-4 overflow-x-auto items-start">
      <template #item="{ element: column }: { element: Column }">
        <div class="column flex-shrink-0 bg-gray-200 p-5 rounded shadow w-[340px]">
          <header class="font-bold mb-4">
            <DragHandle />
            {{ column.title }}
          </header>

          <!-- Tasks are cloned when "alt" ("option") key is pressed. -->
          <draggable v-model="column.tasks" :group="{ name: 'tasks', pull: alt ? 'clone' : true }" item-key="id"
            :animation="200">
            <template #item="{ element: task }: { element: Task }">
              <BoardTaskCard :task="task" @toggle-completed="task.isCompleted = $event"
                @toggle-favorite="task.isFavorite = $event"
                @delete="column.tasks = column.tasks.filter(el => el.id != $event)" />
            </template>
          </draggable>

          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>

          <pre v-if="false" class="text-xs overflow-x-auto mt-3">{{ column }}</pre>
        </div>
      </template>
    </draggable>
  </div>
</template>