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
        let data = await $fetch<IColumn[]>("/api/columns");
        this.columns = data;
        return data as IColumn[];
      } catch (e: any) {
        useToast().error(`Error fetching columns from backend! ${e.data.message}`);
      }
    },
    // Create a new column
    async create(column: IColumn) {
      await $fetch("/api/columns", {
        method: "POST",
        body: column,
      })
        .catch((e) => {
          useToast().error(`Error creating column! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success(`Column "${column.title}" created!`);
        });
    },
    // Update a column
    // - `column` param should be updated Column we gotta `PUT`.
    async update(column: IColumn) {
      await $fetch(`/api/columns/${column._id}`, {
        method: "PUT",
        body: column,
      })
        .catch((e) => {
          useToast().error(`Error updating column! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Column updated!");
        });
    },
    // Delete a Column
    async delete(id: ID) {
      await $fetch(`/api/columns/${id}`, {
        method: "DELETE",
      })
        .catch((e) => {
          useToast().error(`Error deleting column! ${e.data.message}`);
        })
        .then(async () => {
          await this.getAll();
          useToast().success("Column deleted.");
        });
    },
  },
});
