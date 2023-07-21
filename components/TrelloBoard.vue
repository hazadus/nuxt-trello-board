<script setup lang="ts">
import draggable from "vuedraggable";
import type { IColumn, ITask, ID } from '@/types';

const boardStore = useBoardStore();
await useAsyncData(() => boardStore.getAll());

const columnStore = useColumnStore();
const taskStore = useTaskStore();

const activeBoardIndex = ref(0);

// `alt` will be reactive boolean value, equal to `true` when the alt (or option) key is pressed.
const alt = useKeyModifier("Alt");

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

async function onBoardChange() {
  // This should be called when column inside the board was moved in another position.
  await boardStore.update(boardStore.boards[activeBoardIndex.value]);
}

async function onColumnChange(columnId: ID) {
  // This should be called @change from inner `draggable`, which represents task cards.
  // Triggered for column when task removed, and when task is added.
  const updatedColumn = boardStore.boards[activeBoardIndex.value].columns.find(column => column._id === columnId);
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
</script>

<template>
  <div class="board flex items-start overflow-x-auto gap-4">
    <!-- When `handle` prop is defined, the column can be dragged only by it's handle. -->
    <draggable v-model="boardStore.boards[activeBoardIndex].columns" group="columns" item-key="id" :animation="200"
      @change="onBoardChange()" handle=".drag-handle" class="columns-wrapper flex gap-4 items-start">
      <template #item="{ element: column }: { element: IColumn }">
        <div class="column flex-shrink-0 bg-gray-200 p-5 rounded shadow w-[340px]">
          <header class="font-bold mb-4 flex items-baseline">
            <DragHandle />
            <input
              class="column-title-input bg-transparent border-none focus:bg-white rounded px-1 flex-grow focus:outline focus:outline-gray-400 focus:outline-1"
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
              <BoardTaskCard :task=" task " @toggle-completed=" onToggleCompleted(task, $event)"
                @toggle-favorite="onToggleFavorite(task, $event)" @delete="onDeleteTask($event)" />
            </template>
          </draggable>

          <footer>
            <NewTask @add="onAddTask($event, column)" />
          </footer>
        </div>
      </template>
    </draggable>

    <button class="bg-gray-200 whitespace-nowrap px-6 py-2 rounded opacity-50"
      @click=" addNewColumn(boardStore.boards[activeBoardIndex]._id!) ">
      + Добавить колонку
    </button>
  </div>
</template>