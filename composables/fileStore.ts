import { defineStore } from "pinia";
import useToast from "./useToast";
import type { IFile, ID } from "@/types";

export const useFileStore = defineStore("files-store", {
  state: () => ({
    // List of all files uploaded by authenticated user
    files: [] as IFile[],
  }),
  actions: {
    // Get all files uploaded by authenticated user from MongoDB
    async getAll() {
      try {
        let data = await fetchApi<IFile[]>("/uploads");
        this.files = data;
        return data as IFile[];
      } catch (e: any) {
        useToast().error(e.message);
      }
    },
    async uploadFile(file: File) {
      const formData = new FormData();
      formData.append("file", file);

      await fetchApi<IFile>("/uploads", "POST", formData)
        .catch((e) => {
          useToast().error(`Ошибка при загрузке файла! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) {
            useToast().success("Файл успешно загружен!");
          }
        });
    },
  },
});
