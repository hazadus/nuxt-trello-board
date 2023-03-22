<script setup lang="ts">
import draggable from "vuedraggable";
import { nanoid } from "nanoid";
import type { Column, Task } from '@/types';

// NB: we're using Nuxt, so we don't have to import `ref()`, `nextTick()`, `useKeyModifier()` etc.

const columns = useLocalStorage<Column[]>("trelloBoard", [
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

function addNewColumn() {
  const column: Column = {
    id: nanoid(),
    title: "Новая колонка",
    tasks: [],
  }

  columns.value.push(column);
  // Make sure Vue has updated the DOM, then focus on the newly created column:
  nextTick(() => {
    (document.querySelector(".column:last-of-type .column-title-input") as HTMLInputElement).focus();
  });
}
</script>

<template>
  <div class="board flex items-start overflow-x-auto gap-4">
    <!-- When `handle` prop is defined, the column can be dragged only by it's handle. -->
    <draggable v-model="columns" group="columns" item-key="id" :animation="200" handle=".drag-handle"
      class="columns-wrapper flex gap-4 items-start">
      <template #item="{ element: column }: { element: Column }">
        <div class="column flex-shrink-0 bg-gray-200 p-5 rounded shadow w-[340px]">
          <header class="font-bold mb-4 flex items-baseline">
            <DragHandle />
            <input
              class="column-title-input bg-transparent focus:bg-white rounded px-1 flex-grow focus:outline focus:outline-gray-400 focus:outline-1"
              @keyup.enter="($event.target as HTMLInputElement).blur()" type="text" v-model="column.title" />
            <button class="text-xl text-gray-400 hover:text-gray-600"
              @click="columns = columns.filter(el => el.id != column.id)">
              <Icon name="material-symbols:delete-outline" />
            </button>
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

    <button class="bg-gray-200 whitespace-nowrap px-6 py-2 rounded opacity-50" @click="addNewColumn">
      + Добавить колонку
    </button>
  </div>
</template>