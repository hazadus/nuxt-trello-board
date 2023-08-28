<script setup lang="ts">
import { IFile } from "types";

const uploadedFiles: Ref<IFile[]> = ref([]);
const fileInputRef: Ref<HTMLInputElement | null> = ref(null);
const fetchError = ref("");

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const onChange = async (event: InputFileEvent) => {
  const files = event.target.files;
  const formData = new FormData();
  fetchError.value = "";
  let response: IFile | null = null;

  if (files) {
    formData.append("file", files[0]);

    await fetchApi<IFile>("/uploads", "POST", formData)
      .catch((e) => {
        useToast().error(`Ошибка при загрузке файла! ${e.data.message}`);
      })
      .then(async (data) => {
        if (data) {
          response = data;
          console.log("API response:", response);
          uploadedFiles.value.push(response);
          useToast().success("Файл успешно загружен!");
        }
      });
  }
};
</script>

<template>
  <div class="p-5">
    <h1>File Upload</h1>

    <button
      class="p-2 m-1 border border-gray-900 rounded-md"
      @click="() => fileInputRef!.click()"
    >
      Select file
    </button>

    <form enctype="multipart/form-data">
      <input
        ref="fileInputRef"
        type="file"
        name="file"
        hidden
        @change="onChange($event as InputFileEvent)"
      />
    </form>

    <AlertBox
      v-if="fetchError"
      alertType="danger"
    >
      Error
      {{ fetchError }}
    </AlertBox>

    <ul class="mt-5">
      <li
        v-for="file in uploadedFiles"
        :key="file._id"
      >
        <a :href="`/uploads/${file.fileName}`">
          {{ file }}
        </a>
      </li>
    </ul>
  </div>
</template>
