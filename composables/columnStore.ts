import { defineStore } from "pinia";
import useToast from "./useToast";
import type { IColumn, ID } from "@/types";

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
        useToast().error(`Error fetching columns from backend! ${e.data.message}`);
      }
    },
    // Create a new column
    async create(column: IColumn) {
      await fetchApi("/columns", "POST", column)
        .catch((e) => {
          useToast().error(`Error creating column! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            await this.getAll();
            useToast().success(`Column "${column.title}" created!`);
          }
        });
    },
    // Update a column
    // - `column` param should be updated Column we gotta `PUT`.
    async update(column: IColumn) {
      await fetchApi(`/columns/${column._id}`, "PUT", column)
        .catch((e) => {
          useToast().error(`Error updating column! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            await this.getAll();
            useToast().success("Column updated!");
          }
        });
    },
    // Delete a Column
    async delete(id: ID) {
      await fetchApi(`/columns/${id}`, "DELETE")
        .catch((e) => {
          useToast().error(`Error deleting column! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            await this.getAll();
            useToast().success("Column deleted.");
          }
        });
    },
  },
});
