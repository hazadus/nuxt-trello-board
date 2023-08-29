<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { formatTimeAgo } from "@vueuse/core";
import { ITask } from "types";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "closeModal", closeModal: boolean): void;
  (e: "taskSelected", selectedTask: ITask): void;
}>();

const taskStore = useTaskStore();
const searchText = ref("");
const resultsRefs = ref<Element[]>([]);
const selectedIndex = ref(0);

const searchResults = computed(() => {
  const searchTextTrimmed = searchText.value.trim();

  if (searchTextTrimmed.length)
    return taskStore.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTextTrimmed.toLowerCase()),
    );
  else return [];
});

/**
 * Used to navigate search results with up and down keyboard keys.
 * @param event Keyboard event from `@keydown`
 */
const navigateResults = (event: KeyboardEvent) => {
  switch (event.code) {
    case "ArrowDown":
      if (selectedIndex.value === searchResults.value.length - 1) selectedIndex.value = 0;
      else selectedIndex.value += 1;
      break;
    case "ArrowUp":
      if (selectedIndex.value === 0) selectedIndex.value = searchResults.value.length - 1;
      else selectedIndex.value -= 1;
      break;
  }

  if (selectedIndex.value < resultsRefs.value.length && resultsRefs.value[selectedIndex.value]) {
    resultsRefs.value[selectedIndex.value].scrollIntoView(false);
  }
};

const onSearchInputKeyDown = (event: KeyboardEvent) => {
  if (["ArrowUp", "ArrowDown"].includes(event.code)) {
    event.preventDefault();
    navigateResults(event);
  }
};

watch(searchText, () => {
  selectedIndex.value = 0;
});

onMounted(() => taskStore.getAll());
</script>

<template>
  <TransitionRoot
    as="template"
    :show="isOpen"
  >
    <Dialog
      class="fixed inset-0 z-50 flex justify-center items-start"
      :open="isOpen"
      @close="() => emit('closeModal', true)"
      @keydown="navigateResults"
    >
      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-black bg-opacity-70"></DialogOverlay>
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <div
          class="flex flex-col w-full max-w-2xl bg-white rounded-lg mx-4 max-h-[80vh] mt-[10vh] relative"
        >
          <form
            action="#"
            class="flex items-center relative"
            @submit.prevent="
              () => {
                if (searchResults.length) emit('taskSelected', searchResults[selectedIndex]);
              }
            "
          >
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Icon
                name="material-symbols:search"
                class="w-5 h-5 text-gray-700"
              />
            </div>

            <input
              v-model="searchText"
              type="text"
              placeholder="Найти..."
              class="w-full overflow-hidden py-4 pl-12 outline-none border-b focus:border-b border-gray-100 focus:border-gray-100 ring-0 focus:ring-0 rounded-lg placeholder-gray-400"
              @keydown="onSearchInputKeyDown"
            />

            <div class="absolute inset-y-0 right-0 flex items-center pr-4">
              <button
                type="button"
                class="flex items-center p-1.5 text-sm uppercase font-semibold tracking-wider text-gray-700 rounded-md border border-gray-200 focus:outline-none focus:border-gray-300"
                @click="() => emit('closeModal', true)"
              >
                Esc
              </button>
            </div>
          </form>

          <div class="overflow-auto">
            <ul
              v-if="searchResults.length"
              class="divide-y divide-gray-100"
            >
              <li
                v-for="(task, index) in searchResults"
                :key="`result-id-${task._id}`"
                :ref="
                  (el) => {
                    resultsRefs[index] = el as Element;
                  }
                "
                class="flex items-center px-4 py-2.5 cursor-pointer rounded-lg"
                :class="selectedIndex === index ? 'bg-gray-100' : ''"
                @click="() => emit('taskSelected', task)"
                @mousemove="selectedIndex = index"
              >
                <div>
                  <div
                    class="font-semibold text-gray-600 mb-1"
                    :class="task.isCompleted ? 'line-through' : ''"
                  >
                    {{ task.title }}
                  </div>
                  <div class="text-xs text-gray-400 flex items-center">
                    <Icon
                      v-if="task.isFavorite"
                      name="material-symbols:star"
                      class="text-yellow-400 mr-1"
                    />
                    <Icon
                      v-if="task.attachedFiles?.length"
                      name="material-symbols:attach-file"
                      class="text-gray-400 mr-1"
                    />
                    Создана {{ formatTimeAgo(new Date(task.createdAt!)) }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
