import { defineStore } from "pinia";
import useToast from "./useToast";
import type { IBoard, ID } from "@/types";

export const useBoardStore = defineStore("board-store", {
  state: () => ({
    // List of all Boards
    boards: [] as IBoard[],
  }),
  actions: {
    // Get all Boards from DB
    async getAll() {
      try {
        let data = await $fetch<IBoard[]>("/api/boards");
        this.boards = data;
        return data as IBoard[];
      } catch (e: any) {
        useToast().error(`Error fetching boards from backend! ${e.data.message}`);
      }
    },
    async update(board: IBoard) {
      await $fetch(`/api/boards/${board._id}`, {
        method: "PUT",
        body: board,
      })
        .catch((e) => {
          useToast().error(`Error updating board! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Board updated!");
        });
    },
  },
});
