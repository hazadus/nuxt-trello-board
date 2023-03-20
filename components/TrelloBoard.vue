<script setup lang="ts">
import { Column } from '~~/types';
import { nanoid } from "nanoid";

const columns = ref<Column[]>([
  {
    id: nanoid(),
    title: "Нужно сделать",
    tasks: [
      {
        id: nanoid(),
        title: "Поспать",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Поработать",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Поесть",
        createdAt: new Date(),
      },
      {
        id: nanoid(),
        title: "Повторить!",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: nanoid(),
    title: "Завтра",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Разобрать",
    tasks: [],
  },
  {
    id: nanoid(),
    title: "Выполнено",
    tasks: [],
  },
]);
</script>

<template>
  <div class="flex gap-4 overflow-x-auto items-start">
    <div v-for="column in columns" :key="column.id" class="column bg-gray-200 p-5 rounded min-w-[250px]">
      <header>
        {{ column.title }}
      </header>

      <div v-for="task in column.tasks" :key="task.id">
        {{ task.title }}
      </div>
    </div>
  </div>
</template>