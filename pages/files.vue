<script setup lang="ts">
const fileStore = useFileStore();
const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push("/login/");
  }
});

const fileInputRef: Ref<HTMLInputElement | null> = ref(null);
const searchText = ref("");
const isUploading = ref(false);

const filteredFiles = computed(() => {
  if (searchText.value && searchText.value.trim().length > 1)
    return fileStore.files.filter((item) =>
      item.fileName.toLowerCase().includes(searchText.value.toLowerCase()),
    );
  else return fileStore.files;
});

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

const onFileInputChange = async (event: InputFileEvent) => {
  const files = event.target.files;

  if (files) {
    isUploading.value = true;
    await fileStore.uploadFile(files[0]);
    isUploading.value = false;
    await fileStore.getAll();
  }
};

onMounted(() => {
  fileStore.getAll();
});
</script>

<template>
  <Title> Все файлы | Трололо </Title>

  <h1 class="text-4xl font-semibold text-gray-100 px-5 py-6">Все файлы</h1>

  <div class="px-5 mb-5 max-w-screen-xl mx-auto">
    <div
      class="flex flex-col md:flex-row justify-between p-0 mb-3 md:mb-1 items-left md:items-center"
    >
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center -top-2 pl-4 pointer-events-none">
          <Icon
            name="material-symbols:filter-list"
            class="w-5 h-5 text-gray-700"
          />
        </div>
        <input
          v-model="searchText"
          type="text"
          class="w-96 pl-11 text-gray-700 border border-gray-900/10 bg-teal-500 bg-opacity-50 hover:bg-opacity-70 shadow-sm px-3 mb-2 hover:border-gray-300 focus:outline-none focus:border-gray-300 focus:ring-0 rounded-lg"
          placeholder="Фильтровать файлы..."
        />
      </div>

      <div class="flex items-center">
        <CustomButton
          :icon="isUploading ? `svg-spinners:3-dots-scale` : `ic:round-cloud-upload`"
          :isDisabled="isUploading"
          @click="() => fileInputRef!.click()"
        >
          Загрузить файл...
        </CustomButton>

        <form enctype="multipart/form-data">
          <input
            ref="fileInputRef"
            type="file"
            name="file"
            hidden
            @change="onFileInputChange($event as InputFileEvent)"
          />
        </form>
      </div>
    </div>

    <div
      class="mt-5 flex flex-col gap-1"
      v-if="fileStore.files.length"
    >
      <FileItem
        v-for="file in filteredFiles"
        :file="file"
        :key="file._id"
      />
    </div>
  </div>
</template>
