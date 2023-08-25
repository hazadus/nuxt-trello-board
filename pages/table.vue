<script setup lang="ts">
import { formatTimeAgo } from "@vueuse/core";
import { ITask } from "types";
import EasyDataTable, { Header } from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const taskStore = useTaskStore();
const selectedTask = ref<ITask | null>(null);

const headers: Header[] = [
  { text: "Изб.", value: "isFavorite", sortable: true, width: 64 },
  { text: "Вып.", value: "isCompleted", sortable: true, width: 64 },
  { text: "Заголовок", value: "title", sortable: true },
  { text: "Создана", value: "createdAt", sortable: true },
  { text: "Обновлена", value: "updatedAt", sortable: true },
  { text: "Действия", value: "actions", width: 100 },
];

taskStore.getAll();
</script>

<template>
  <Title> Все карточки | Трололо </Title>

  <h1 class="text-4xl font-semibold text-gray-100 px-5 py-6">Все карточки</h1>

  <div class="p-5 max-w-screen-xl mx-auto">
    <ClientOnly>
      <EasyDataTable
        theme-color="#1d90ff"
        header-text-direction="left"
        alternating
        :headers="headers"
        :items="taskStore.tasks"
      >
        <template #item-isfavorite="{ isFavorite }">
          <Icon
            v-if="isFavorite"
            name="material-symbols:star"
            class="text-yellow-500"
          />
        </template>
        <template #item-iscompleted="{ isCompleted }">
          <Icon
            v-if="isCompleted"
            name="material-symbols:check-circle-outline"
            class="text-teal-500"
          />
        </template>
        <template #item-title="{ title }">
          {{ title }}
        </template>
        <template #item-createdat="{ createdAt }">
          {{ formatTimeAgo(new Date(createdAt)) }}
        </template>
        <template #item-updatedat="{ updatedAt }">
          {{ formatTimeAgo(new Date(updatedAt)) }}
        </template>
        <template #item-actions="task">
          <div class="flex space-x-4 text-gray-500">
            <button @click="selectedTask = task">
              <Icon
                size="18"
                name="fluent:pen-24-regular"
              />
            </button>
            <button>
              <Icon
                size="18"
                name="fluent:delete-24-regular"
              />
            </button>
          </div>
        </template>
      </EasyDataTable>
    </ClientOnly>
  </div>

  <BoardTaskCardModal
    v-if="selectedTask"
    :key="selectedTask._id"
    :card="selectedTask"
    :onClose="
      () => {
        selectedTask = null;
        taskStore.getAll();
      }
    "
  />
</template>
