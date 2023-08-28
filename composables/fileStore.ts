import type { ID, IFile } from "@/types";
import { defineStore } from "pinia";
import useToast from "./useToast";

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
    // Upload file to the server, and create corresponding MongoDB File document
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
    // Delete a file (document in MongoDB + corresponding file itself)
    async delete(id: ID) {
      await fetchApi(`/uploads/${id}`, "DELETE")
        .catch((e) => {
          useToast().error(`Ошибка при удалении файла! ${e.data.message}`);
        })
        .then(async (data) => {
          if (data) useToast().success("Файл удалён.");
        });
    },
  },
});
