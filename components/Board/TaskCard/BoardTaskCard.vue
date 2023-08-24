<script setup lang="ts">
import type { ITask, ID } from "@/types";

const props = defineProps<{
  task: ITask;
}>();

const emit = defineEmits<{
  (e: "delete", id: ID): void;
  (e: "toggleCompleted", isCompleted: boolean): void;
  (e: "toggleFavorite", isFavorite: boolean): void;
}>();

const focused = ref(false);

function onToggleCompleted() {
  emit("toggleCompleted", !props.task.isCompleted);
}

function onToggleFavorite() {
  emit("toggleFavorite", !props.task.isFavorite);
}

onKeyStroke("Backspace", () => {
  // Delete task using backspace key
  if (focused.value) {
    emit("delete", props.task._id!);
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
    emit("toggleCompleted", !props.task.isCompleted);
  }
});
</script>

<template>
  <div
    class="relative z-0 bg-white p-2 mb-2 rounded max-w-[300px] shadow flex flex-col task"
    tabindex="0"
    @focus="focused = true"
    @blur="focused = false"
  >
    <div class="p-2">
      <p
        class="text-sm leading-5"
        :class="task.isCompleted ? 'line-through' : ''"
      >
        {{ task.title }}
      </p>
    </div>
    <div class="pb-2 px-2">
      <button
        class="btn-favorite"
        :class="task.isFavorite ? 'text-yellow-400' : 'text-gray-200'"
        tabindex="-1"
        @click.preventDefault="onToggleFavorite"
      >
        <Icon name="material-symbols:star" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  border-radius: 0.25rem;
  outline-width: 2px;
  outline-style: solid;
  transform: scale(1.02);
  transition: all 0.2s;
}

.task:hover {
  transform: scale(1.02);
  transition: all 0.2s;
}

.btn-favorite:hover {
  transform: scale(1.5);
  transition: all 0.2s;
}
</style>
