import { defineStore } from "pinia";
import useToast from "./useToast";
import type { Task, ID, ITaskWithTargetColumnId } from "@/types";

export const useTaskStore = defineStore("task-store", {
  state: () => ({
    // List of all tasks
    tasks: [] as Task[],
  }),
  actions: {
    // Get all books from DB
    async getAll() {
      try {
        let data = await $fetch<Task[]>("/api/tasks");
        this.tasks = data;
        return data as Task[];
      } catch (e: any) {
        useToast().error(e.message);
      }
    },
    // Create a new task
    async create(taskWithColumnId: ITaskWithTargetColumnId) {
      await $fetch("/api/tasks", {
        method: "POST",
        body: taskWithColumnId,
      })
        .catch((e) => {
          useToast().error(`Error creating task! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success(`Task "${taskWithColumnId.task.title}" created!`);
        });
    },
    // Update a task
    // - `task` param should be updated Task we gotta `PUT`.
    async update(task: Task) {
      await $fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        body: task,
      })
        .catch((e) => {
          useToast().error(`Error updating task! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Task updated!");
        });
    },
    // Delete a task
    async delete(id: ID) {
      await $fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(`Error deleting task! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Task deleted.");
        });
    },
  },
});
