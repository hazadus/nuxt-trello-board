import { defineStore } from "pinia";
import useToast from "./useToast";
import type { Board, ID } from "@/types";

export const useBoardStore = defineStore("board-store", {
  state: () => ({
    // List of all Boards
    boards: [] as Board[],
  }),
  actions: {
    // Get all Boards from DB
    async getAll() {
      try {
        let data = await $fetch<Board[]>("/api/boards");
        this.boards = data;
        return data as Board[];
      } catch (e: any) {
        useToast().error(`Error fetching boards from backend! ${e.data.message}`);
      }
    },
    async update(board: Board) {
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
