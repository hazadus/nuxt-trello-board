<script setup lang="ts">
import draggable from "vuedraggable";
import type { IColumn, ITask, ID } from '@/types';

const props = defineProps<{
  boardId: ID;
}>();

const boardStore = useBoardStore();
const columnStore = useColumnStore();
const taskStore = useTaskStore();

// `alt` will be reactive boolean value, equal to `true` when the alt (or option) key is pressed.
const alt = useKeyModifier("Alt");

const board = computed(() => {
  return boardStore.boards.find((item) => item._id === props.boardId);
});

async function addNewColumn(targetBoardId: ID) {
  await columnStore.create({
    title: "Новая колонка",
    tasks: [],
    targetBoardId,
  });

  await boardStore.getAll();

  // Make sure Vue has updated the DOM, then focus on the newly created column:
  nextTick(() => {
    (document.querySelector(".column:last-of-type .column-title-input") as HTMLInputElement).focus();
  });
}

/**
 * This should be called when column inside the board was moved in another position,
 * or the board has changed.
 */
async function onBoardChange() {
  await boardStore.update(board.value!);
}

/**
 * This should be called on `change` from inner `draggable`, which represents task cards.
 * Triggered for column when task removed, and when task is added.
 * @param columnId 
 */
async function onColumnChange(columnId: ID) {
  const updatedColumn = board.value!.columns.find(column => column._id === columnId);
  if (updatedColumn) await columnStore.update(updatedColumn);
}

async function onRenameColumn(column: IColumn, newTitle: string) {
  await columnStore.update({
    ...column,
    title: newTitle,
  });
}

async function onDeleteColumn(column: IColumn) {
  await columnStore.delete(column._id!);
  boardStore.getAll();
}

async function onAddTask(task: ITask, targetColumn: IColumn) {
  await taskStore.create({
    ...task,
    targetColumnId: targetColumn._id!,
  });

  // We need to reload board from database after we create new task:
  boardStore.getAll();
}

async function onToggleCompleted(task: ITask, isCompleted: boolean) {
  await taskStore.update({
    ...task,
    isCompleted,  // Overwrite value already in `task`
  });
  boardStore.getAll();
}

async function onToggleFavorite(task: ITask, isFavorite: boolean) {
  await taskStore.update({
    ...task,
    isFavorite,  // Overwrite value already in `task`
  });
  boardStore.getAll();
}

async function onDeleteTask(taskId: ID) {
  await taskStore.delete(taskId);
  boardStore.getAll();
}

onMounted(async () => {
  // https://nuxt.com/docs/api/composables/use-async-data#example
  await useAsyncData(() => boardStore.getAll());
});
</script>

<template>
  <Title>
    {{ board?.title || "Доска не найдена" }} | Трололо
  </Title>

  <AlertBox v-if="!board" alertType="danger" class="m-4">
    Не найдена доска с ID "{{ boardId }}"!
    <RouterLink to="/boards/" class="underline">
      Просмотреть все доски.
    </RouterLink>
  </AlertBox>

  <template v-if="board">
    <div class="flex justify-between items-middle px-5 py-4">
      <input v-model="board.title"
        class="text-4xl font-semibold bg-transparent border-none rounded px-1 min-w-0 flex-grow text-gray-100 focus:text-black focus:bg-white  focus:outline focus:outline-gray-400 focus:outline-1 hover:bg-gray-100 hover:bg-opacity-20"
        @keyup.enter="onBoardChange(); ($event.target as HTMLInputElement).blur()" type="text">

      <BoardOptionsSlideover :board="board" />
    </div>

    <div class="board flex items-start pt-0 px-5 pb-5 overflow-x-auto gap-4">
      <!-- When `handle` prop is defined, the column can be dragged only by it's handle. -->
      <draggable v-model="board.columns" group="columns" item-key="id" :animation="200" @change="onBoardChange()"
        handle=".drag-handle" class="columns-wrapper flex gap-4 items-start">
        <template #item="{ element: column }: { element: IColumn }">
          <div class="column relative z-0 flex-shrink-0 bg-gray-200 p-5 rounded shadow w-[340px]">
            <header class="font-bold mb-4 flex items-baseline">
              <BoardDragHandle />
              <input
                class="column-title-input bg-transparent border-none focus:bg-white rounded px-1 flex-grow focus:outline focus:outline-gray-400 focus:outline-1 hover:bg-gray-400 hover:bg-opacity-20"
                @keyup.enter="onRenameColumn(column, ($event.target as HTMLInputElement).value); ($event.target as HTMLInputElement).blur()"
                v-model=" column.title " type="text" />
              <button class="text-xl text-gray-400 hover:text-gray-600" @click="onDeleteColumn(column)">
                <Icon name="material-symbols:delete-outline" />
              </button>
            </header>

            <!-- Tasks are cloned when "alt" ("option") key is pressed. -->
            <draggable v-model=" column.tasks " :group=" { name: 'tasks', pull: alt ? 'clone' : true } " item-key="_id"
              :animation=" 200 " @change="onColumnChange(column._id!)">
              <template #item=" { element: task }: { element: ITask } ">
                <!-- Hide completed cards if this options is on  -->
                <BoardTaskCard :task=" task " v-if=" !task.isCompleted || !board.hideCompletedCards "
                  @toggle-completed=" onToggleCompleted(task, $event)" @toggle-favorite="onToggleFavorite(task, $event)"
                  @delete="onDeleteTask($event)" />
              </template>
            </draggable>

            <footer>
              <BoardTaskCardCreate @add="onAddTask($event, column)" />
            </footer>
          </div>
        </template>
      </draggable>

      <button class=" bg-gray-200 whitespace-nowrap mt-1 px-6 py-2 rounded bg-opacity-50 hover:bg-opacity-60 "
        @click=" addNewColumn(board._id!) ">
        + Добавить колонку
      </button>
    </div>
  </template>
</template>