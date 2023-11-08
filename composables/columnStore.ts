import type { IColumn, ID } from "@/types";
import { createUmamiEvent } from "@/utils/helpers.client";
import { defineStore } from "pinia";
import useToast from "./useToast";

export const useColumnStore = defineStore("column-store", {
  state: () => ({
    // List of all Columns
    columns: [] as IColumn[],
  }),
  actions: {
    // Get all Columns from DB
    async getAll() {
      try {
        let data = await fetchApi<IColumn[]>("/columns");
        this.columns = data;
        return data as IColumn[];
      } catch (e: any) {
        useToast().error(`Ошибка при получении данных о колонках с сервера! ${e.data.message}`);
      }
    },
    // Create a new column
    async create(column: IColumn) {
      await fetchApi("/columns", "POST", column)
        .catch((e) => {
          useToast().error(`Ошибка при создании колонки! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            useToast().success(`Колонка "${column.title}" создана!`);
            createUmamiEvent("Create column");
          }
        });
    },
    // Update a column
    // - `column` param should be updated Column we gotta `PUT`.
    async update(column: IColumn) {
      await fetchApi(`/columns/${column._id}`, "PUT", column)
        .catch((e) => {
          useToast().error(`Ошибка при сохранении колонки! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            useToast().success("Колонка сохранена!");
            createUmamiEvent("Update column");
          }
        });
    },
    // Delete a Column
    async delete(id: ID) {
      await fetchApi(`/columns/${id}`, "DELETE")
        .catch((e) => {
          useToast().error(`Ошибка при удалении колонки! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            useToast().success("Колонка удалена.");
            createUmamiEvent("Delete column");
          }
        });
    },
  },
});
