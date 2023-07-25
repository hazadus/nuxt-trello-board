import { defineStore } from "pinia";
import useToast from "./useToast";
import type { ITask, ID } from "@/types";

export const useTaskStore = defineStore("task-store", {
  state: () => ({
    // List of all tasks
    tasks: [] as ITask[],
  }),
  actions: {
    // Get all books from DB
    async getAll() {
      try {
        let data = await fetchApi<ITask[]>("/tasks");
        this.tasks = data;
        return data as ITask[];
      } catch (e: any) {
        useToast().error(e.message);
      }
    },
    // Create a new task
    async create(task: ITask) {
      await fetchApi("/tasks", "POST", task)
        .catch((e) => {
          useToast().error(`Error creating task! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success(`Task "${task.title}" created!`);
        });
    },
    // Update a task
    // - `task` param should be updated Task we gotta `PUT`.
    async update(task: ITask) {
      await fetchApi(`/tasks/${task._id}`, "PUT", task)
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
      await fetchApi(`/tasks/${id}`, "DELETE")
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
