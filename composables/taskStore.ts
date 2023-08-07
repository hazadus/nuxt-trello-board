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
          useToast().error(`Ошибка при создании карточки! ${e.data.message}`);
        })
        .then(async (data) => {
          // In case of error, we get `data=undefined`, so we check `data` here:
          if (data) useToast().success(`Карточка "${task.title}" создана!`);
        });
    },
    // Update a task
    // - `task` param should contain updated Task we have to `PUT` to the server.
    async update(task: ITask) {
      await fetchApi(`/tasks/${task._id}`, "PUT", task)
        .catch((e) => {
          useToast().error(`Ошибка при сохранении карточки! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) useToast().success("Карточка сохранена!");
        });
    },
    // Delete a task
    async delete(id: ID) {
      await fetchApi(`/tasks/${id}`, "DELETE")
        .catch((e) => {
          useToast().error(`Ошибка при удалении карточки! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) useToast().success("Карточка удалена.");
        });
    },
  },
});
