<script setup lang="ts">
const fileNames: Ref<string[]> = ref([]);
const fileInputRef: Ref<HTMLInputElement | null> = ref(null);

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

interface ApiResponse {
  message: string;
  files: string[];
}

const onChange = async (event: InputFileEvent) => {
  const files = event.target.files;
  const formData = new FormData();

  if (files) {
    formData.append("file", files[0]);

    const { data } = await useFetch<ApiResponse>("/api/uploads", {
      method: "post",
      body: formData,
    });

    console.log(data.value);

    if (data.value) data.value.files.forEach((fileName) => fileNames.value.push(fileName));
  }
};
</script>

<template>
  <div>
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

    <ul class="mt-5">
      <li
        v-for="file in fileNames"
        :key="file"
      >
        <a :href="`/uploads/${file}`">
          {{ file }}
        </a>
      </li>
    </ul>
  </div>
</template>
