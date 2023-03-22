<script setup lang="ts">
import type { Task, ID } from '@/types';

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "delete", id: ID): void;
  (e: "toggleCompleted", isCompleted: boolean): void;
  (e: "toggleFavorite", isFavorite: boolean): void;
}>();

const focused = ref(false);
const completed = ref(props.task.isCompleted);
const favorite = ref(props.task.isFavorite);

function onToggleCompleted() {
  emit("toggleCompleted", completed.value);
}

function onToggleFavorite() {
  favorite.value = !favorite.value;
  emit("toggleFavorite", favorite.value);
  console.log("isFavorite:", favorite.value);
}

onKeyStroke("Backspace", (event) => {
  // Delete task using backspace key
  if (focused.value) {
    emit("delete", props.task.id);
  }
});

onKeyStroke("Enter", (event) => {
  // Enter toggles "favorite" status
  if (focused.value) {
    event.preventDefault();
    onToggleFavorite();
  }
});

onKeyStroke(" ", (event) => {
  // Spacebar toggles "completed" status
  if (focused.value) {
    event.preventDefault();
    completed.value = !completed.value;
    emit("toggleCompleted", completed.value);
  }
});
</script>

<template>
  <div :title="task.createdAt.toLocaleDateString()"
    class="task bg-white p-2 mb-2 rounded max-w-[300px] shadow flex items-baseline" @focus="focused = true"
    @blur="focused = false" tabindex="0">
    <div class="p-2">
      <input type="checkbox" v-model="completed" @change="onToggleCompleted" />
    </div>
    <div class="flex-grow">
      <span class="text-sm" :class="completed ? 'line-through' : ''">
        {{ task.title }}
      </span>
    </div>
    <div class="p-2">
      <button class="btn-favorite" :class="favorite ? 'text-yellow-400' : 'text-gray-200'"
        @click.preventDefault="onToggleFavorite">
        <Icon name="material-symbols:star" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.task:hover {
  transform: scale(1.02);
  transition: all 0.2s;
}

.btn-favorite:hover {
  transform: scale(1.5);
  transition: all 0.2s;
}
</style>