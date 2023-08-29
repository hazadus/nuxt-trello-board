<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import type { IFile, ITask } from "@/types";

const props = defineProps<{
  card: ITask | null;
  onClose: () => void;
}>();

const taskStore = useTaskStore();
const boardStore = useBoardStore();
const fileStore = useFileStore();

const fileInputRef: Ref<HTMLInputElement | null> = ref(null);

const isFetching = ref(false);
const isUploading = ref(false);
const errorMessage = ref("");

const isDisabled = computed(() => {
  return isFetching.value || isUploading.value;
});

// Initialize auto-resizable text area for card title
const { textarea: titleTextarea, input: newTitle } = useTextareaAutosize();
newTitle.value = props.card?.title || "";

const editableCard: Ref<Partial<ITask> | null> = props.card
  ? ref({
      _id: props.card._id,
      title: props.card.title,
      details: props.card.details,
      attachedFiles: props.card.attachedFiles,
      isCompleted: props.card.isCompleted,
      isFavorite: props.card.isFavorite,
    })
  : ref(null);

const isOpen = computed(() => (props.card ? true : false));

/**
 * Save updated task to the database, then fetch updated data to the global state.
 */
const onClickSave = async () => {
  if (editableCard.value) {
    errorMessage.value = "";

    // Validate title length
    if (newTitle.value.length && newTitle.value.trim().length < 3) {
      errorMessage.value = "Заголовок карточки должен содержать не менее трёх символов";
      return;
    }

    editableCard.value.title = newTitle.value;

    // Actually update the task in database
    isFetching.value = true;
    const isSuccess = await taskStore.update(editableCard.value);
    if (isSuccess) {
      // Update global state and close the modal
      await boardStore.getAll();
      props.onClose();
    }
    isFetching.value = false;
  }
};

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

/**
 * Handle file upload when a file is selected using dialog window.
 * @param event Even created by file input dialog
 */
const onFileInputChange = async (event: InputFileEvent) => {
  const files = event.target.files;

  if (files) {
    // 1. Upload the file
    isUploading.value = true;
    const newFileDocument = await fileStore.uploadFile(files[0]);
    isUploading.value = false;

    // 2. Update task - add new file to `attachedFiles` array.
    if (newFileDocument && editableCard.value) {
      if (!editableCard.value.attachedFiles) {
        editableCard.value.attachedFiles = [];
      }

      editableCard.value.attachedFiles.push(newFileDocument);

      // Actually update task in MongoDB (only attached files list)
      isFetching.value = true;
      const isSuccess = await taskStore.update({
        ...props.card,
        attachedFiles: editableCard.value.attachedFiles,
      });
      if (isSuccess) {
        // 3. Update global state
        await boardStore.getAll();
        await taskStore.getAll();
      }
      isFetching.value = false;
    }
  }
};

const onDeleteFile = async (file: IFile) => {
  await boardStore.getAll();
  await taskStore.getAll();
  // NB: manually remove deleted file from the list, because it's not get updated by Vue,
  // I can't imagine, why!!
  editableCard.value!.attachedFiles = editableCard.value!.attachedFiles?.filter(
    (item) => item._id !== file._id,
  );
};
</script>

<template>
  <TransitionRoot
    v-if="editableCard"
    :show="isOpen"
    appear
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="onClose()"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-40" />
      </TransitionChild>

      <div class="overflow-y-auto fixed inset-0">
        <div class="flex justify-center items-start px-4 py-12 min-h-full text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="overflow-hidden w-full max-w-4xl text-left align-middle bg-white rounded-md shadow-xl transition-all transform"
            >
              <!--Modal header with "X" button -->
              <div class="flex justify-between items-center p-4">
                <Icon
                  name="mdi:card-text"
                  class="text-xl mx-2 text-gray-500"
                />
                <div class="flex-1">
                  <textarea
                    v-model="newTitle"
                    ref="titleTextarea"
                    :disabled="isFetching"
                    class="block w-full text-xl resize-none font-semibold rounded-md bg-transparent border-none focus:ring-gray-300 hover:bg-gray-50"
                  />
                </div>
                <button
                  class="text-xl text-gray-900 bg-transparent px-3 py-0 rounded hover:bg-gray-300 hover:bg-opacity-20"
                  @click="onClose"
                >
                  <Icon name="mdi:close" />
                </button>
              </div>

              <div class="flex flex-col sm:flex-row">
                <!-- Left column - edit the card -->
                <div class="flex-1 px-5 pt-0 pb-5">
                  <div>
                    <label
                      class="inline-block mb-1 ml-1 text-md font-semibold text-gray-700"
                      for="description"
                    >
                      Описание
                    </label>
                    <textarea
                      v-model="editableCard.details as string"
                      :disabled="isDisabled"
                      class="block w-full text-sm mb-2 rounded-md bg-gray-50 border-none focus:ring-gray-300 focus:bg-white"
                      name="description"
                      rows="10"
                    >
                    </textarea>

                    <span class="block mb-1 ml-1 text-md font-semibold text-gray-700">
                      Статус
                    </span>
                    <div class="flex">
                      <div class="flex items-center mr-5">
                        <input
                          type="checkbox"
                          id="checkboxFavorite"
                          v-model="editableCard.isFavorite"
                          :disabled="isDisabled"
                          class="mx-2 rounded-md"
                        />
                        <label for="checkboxFavorite">Избранная</label>
                      </div>

                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          id="checkboxCompleted"
                          v-model="editableCard.isCompleted"
                          :disabled="isDisabled"
                          class="mx-2 rounded-md"
                        />
                        <label for="checkboxCompleted">Завершенная</label>
                      </div>
                    </div>

                    <template v-if="editableCard && editableCard.attachedFiles?.length">
                      <span class="block mt-2 mb-1 ml-1 text-md font-semibold text-gray-700">
                        Прикрепленные файлы ({{ editableCard.attachedFiles.length }})
                      </span>
                      <div class="flex flex-col gap-1">
                        <FileItem
                          v-for="file in editableCard.attachedFiles"
                          :file="file"
                          :key="`attached-file-id-${file._id}`"
                          @delete="onDeleteFile($event)"
                        />
                      </div>
                    </template>
                  </div>

                  <AlertBox
                    v-if="errorMessage"
                    alertType="danger"
                    class="mt-3"
                  >
                    {{ errorMessage }}
                  </AlertBox>
                </div>

                <!-- Right column - actions -->
                <div class="px-5 pt-0 pb-5 bg-white sm:w-48">
                  <h3 class="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Действия
                  </h3>
                  <CustomButton
                    icon="material-symbols:check-circle-rounded"
                    :isDisabled="isDisabled"
                    class="w-full mb-1"
                    @click="onClickSave"
                  >
                    Сохранить
                  </CustomButton>
                  <CustomButton
                    :icon="isUploading ? `svg-spinners:3-dots-scale` : `ic:round-cloud-upload`"
                    :isDisabled="isDisabled"
                    class="w-full mb-1"
                    @click="() => fileInputRef!.click()"
                  >
                    Прикрепить
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
                  <CustomButton
                    icon="material-symbols:delete"
                    :isDisabled="true"
                    class="w-full"
                  >
                    Удалить
                  </CustomButton>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
