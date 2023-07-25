import { defineStore } from "pinia";
import useToast from "./useToast";
import type { IBoard } from "@/types";

export const useBoardStore = defineStore("board-store", {
  state: () => ({
    // List of all Boards
    boards: [] as IBoard[],
  }),
  actions: {
    // Get all Boards from DB
    async getAll() {
      try {
        let data = await fetchApi<IBoard[]>("/boards");
        this.boards = data;
        return data as IBoard[];
      } catch (e: any) {
        useToast().error(`Error fetching boards from backend! ${e.data.message}`);
      }
    },
    async update(board: IBoard) {
      await fetchApi(`/boards/${board._id}`, "PUT", board)
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
