import { defineStore } from "pinia";
import useToast from "./useToast";
import type { IBoard } from "@/types";

export const useBoardStore = defineStore("board-store", {
  state: () => ({
    // List of all user's Boards
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
        useToast().error(`Ошибка при получении данных о досках с сервера! ${e.data.message}`);
      }
    },
    async create(board: IBoard) {
      await fetchApi("/boards", "POST", board)
        .catch((e) => {
          useToast().error(`Ошибка при создании доски! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            await this.getAll();
            useToast().success(`Доска "${board.title}" создана!`);
          }
        });
    },
    async update(board: IBoard) {
      await fetchApi(`/boards/${board._id}`, "PUT", board)
        .catch((e) => {
          useToast().error(`Ошибка при сохранении доски! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            await this.getAll();
            useToast().success("Доска сохранена!");
          }
        });
    },
  },
});
