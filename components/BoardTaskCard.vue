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
    <div>
      <span :class="task.isCompleted ? 'line-through' : ''">
        {{ task.title }}
      </span>
    </div>
  </div>
</template>