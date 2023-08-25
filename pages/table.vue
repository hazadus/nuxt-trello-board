<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { formatTimeAgo } from "@vueuse/core";
import { ITask } from "types";
import EasyDataTable, { Header } from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const taskStore = useTaskStore();
const selectedTask = ref<ITask | null>(null);
const searchText = ref("");
const switchHideCompleted = ref(true);

const headers: Header[] = [
  { text: "Изб.", value: "isFavorite", sortable: true, width: 64 },
  { text: "Вып.", value: "isCompleted", sortable: true, width: 64 },
  { text: "Заголовок", value: "title", sortable: true },
  { text: "Создана", value: "createdAt", sortable: true },
  { text: "Обновлена", value: "updatedAt", sortable: true },
  { text: "Действия", value: "actions", width: 100 },
];

const filteredTasks = computed(() => {
  if (switchHideCompleted.value) {
    return taskStore.tasks.filter((task) => !task.isCompleted);
  } else return taskStore.tasks;
});

const completedQty = computed(() => {
  return taskStore.tasks.reduce((accumulator, task) => accumulator + (task.isCompleted ? 1 : 0), 0);
});

taskStore.getAll();
</script>

<template>
  <Title> Все карточки | Трололо </Title>

  <h1 class="text-4xl font-semibold text-gray-100 px-5 py-6">Все карточки</h1>

  <div class="p-5 max-w-screen-xl mx-auto">
    <div class="flex justify-between p-0 mb-1 items-center">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center -top-2 pl-4 pointer-events-none">
          <Icon
            name="material-symbols:filter-list"
            class="w-5 h-5 text-gray-700"
          />
        </div>
        <input
          v-model="searchText"
          type="text"
          class="w-96 pl-11 text-gray-700 border border-gray-900/10 bg-teal-500 bg-opacity-50 hover:bg-opacity-70 shadow-sm px-3 mb-2 hover:border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 rounded-lg"
          placeholder="Фильтровать карточки..."
        />
      </div>

      <div class="flex items-center">
        <div class="mr-2">
          <Switch
            v-model="switchHideCompleted"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
            :class="switchHideCompleted ? 'bg-teal-600' : 'bg-gray-200'"
          >
            <span class="sr-only">Hide completed</span>
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              :class="switchHideCompleted ? 'translate-x-6' : 'translate-x-1'"
            />
          </Switch>
        </div>
        <div class="text-sm text-gray-700">
          Скрывать завершенные карточки ({{ completedQty }} шт.)
        </div>
      </div>
    </div>

    <ClientOnly>
      <EasyDataTable
        theme-color="#1d90ff"
        header-text-direction="left"
        alternating
        :search-value="searchText"
        :headers="headers"
        :items="filteredTasks"
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
