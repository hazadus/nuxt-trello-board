<script setup lang="ts">
import type { Task } from '@/types';
defineProps<{
  task: Task;
}>();
</script>

<template>
  <div :title="task.createdAt.toLocaleDateString()"
    class="task bg-white p-2 mb-2 rounded max-w-[300px] shadow flex items-baseline">
    <div class="p-2">
      <input type="checkbox" />
    </div>
    <div class="flex-grow">
      <span class="text-sm" :class="task.isCompleted ? 'line-through' : ''">
        {{ task.title }}
      </span>
    </div>
    <div class="p-2">
      <button class="btn-favorite" :class="task.isFavorite ? 'text-yellow-400' : 'text-gray-200'">
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