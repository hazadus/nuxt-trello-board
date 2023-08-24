<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import type { ITask } from "@/types";

const props = defineProps<{
  card: ITask | null;
  onClose: () => void;
}>();

const taskStore = useTaskStore();
const boardStore = useBoardStore();

const isFetching = ref(false);
const errorMessage = ref("");
const editableCard: Ref<Partial<ITask> | null> = props.card
  ? ref({
      _id: props.card._id,
      title: props.card.title,
      details: props.card.details,
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
    if (editableCard.value.title?.length && editableCard.value.title.trim().length < 3) {
      errorMessage.value = "Заголовок карточки должен содержать не менее трёх символов";
      return;
    }

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
                  <input
                    v-model="editableCard.title"
                    :disabled="isFetching"
                    class="block w-full text-xl font-semibold rounded-md bg-transparent border-none focus:ring-gray-300 hover:bg-gray-50"
                  />
                </div>
                <button
                  @click="onClose"
                  class="text-xl text-gray-900 bg-transparent px-3 py-0 rounded hover:bg-gray-300 hover:bg-opacity-20"
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
                      :disabled="isFetching"
                      class="block w-full text-sm mb-2 rounded-md bg-gray-50 border-none focus:ring-gray-300 focus:bg-white"
                      name="description"
                      rows="10"
                    >
                    </textarea>

                    <span class="block mb-1 ml-1 text-md font-semibold text-gray-700">
                      Статус
                    </span>
                    <input
                      type="checkbox"
                      id="checkboxFavorite"
                      v-model="editableCard.isFavorite"
                      :disabled="isFetching"
                      class="mx-2 rounded-md"
                    />
                    <label for="checkboxFavorite">Избранная</label>

                    <input
                      type="checkbox"
                      id="checkboxCompleted"
                      v-model="editableCard.isCompleted"
                      :disabled="isFetching"
                      class="mx-2 rounded-md"
                    />
                    <label for="checkboxCompleted">Завершенная</label>
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
                    :isDisabled="isFetching"
                    icon="material-symbols:check-circle-rounded"
                    class="w-full mb-1"
                    @click="onClickSave"
                  >
                    Сохранить
                  </CustomButton>
                  <CustomButton
                    :isDisabled="true"
                    icon="material-symbols:delete"
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
