<script setup lang="ts">
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
  TransitionRoot,
  TransitionChild,
  Switch,
} from "@headlessui/vue";
import type { IBoard } from "@/types";

const props = defineProps<{
  board: IBoard;
}>();

const boardStore = useBoardStore();
const isOpen = ref(false);
const switchHideCompleted = ref(props.board.hideCompletedCards);

const created = useDateFormat(props.board.createdAt, "DD.MM.YYYY HH:mm").value;
const updated = useDateFormat(props.board.updatedAt, "DD.MM.YYYY HH:mm").value;

watch(switchHideCompleted, async (switchHideCompleted, prevSwitchHideCompleted) => {
  await boardStore.update({
    ...props.board,
    hideCompletedCards: switchHideCompleted,
  });
});

function setIsOpen(value: boolean) {
  isOpen.value = value;
}

function placeholder() {
  alert("Эта возможность пока ещё не реализована!");
}
</script>

<template>
  <button
    class="text-gray-100 bg-transparent px-5 py-0 rounded hover:bg-gray-100 hover:bg-opacity-20"
    @click="setIsOpen(true)"
  >
    <Icon name="ph:dots-three-outline-fill" />
  </button>

  <TransitionRoot
    as="template"
    appear
    :show="isOpen"
  >
    <Dialog
      :open="isOpen"
      class="fixed inset-0 overflow-hidden z-10"
      @close="setIsOpen"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="absolute inset-0 bg-black bg-opacity-40" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="transform ease-in-out transition-transform duration-300"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="transform ease-in-out transition-transform duration-300"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
      >
        <div class="bg-gray-100 flex flex-col fixed inset-y-0 right-0 w-full max-w-sm">
          <div class="flex justify-between items-center p-4 shadow">
            <DialogTitle class="text-xl font-semibold"> Меню </DialogTitle>
            <button
              class="text-xl text-gray-900 bg-transparent px-3 py-0 rounded hover:bg-gray-300 hover:bg-opacity-20"
              @click="setIsOpen(false)"
            >
              <Icon name="mdi:close" />
            </button>
          </div>

          <DialogDescription class="p-4">
            Доска &laquo;{{ board.title }}&raquo; &mdash; доступные действия:
          </DialogDescription>

          <div class="flex-1 flex flex-col">
            <div class="flex-1 px-1">
              <div
                class="p-4 font-semibold hover:bg-gray-200 hover:cursor-pointer"
                @click="placeholder()"
              >
                Описание
              </div>
              <div
                class="p-4 font-semibold hover:bg-gray-200 hover:cursor-pointer"
                @click="placeholder()"
              >
                Цвет фона
              </div>

              <div class="p-4">
                <div class="pb-1 font-semibold">Скрывать выполненные</div>
                <div class="flex items-center">
                  <div class="mr-2">
                    <Switch
                      v-model="switchHideCompleted"
                      class="relative inline-flex h-6 w-11 items-center rounded-full"
                      :class="switchHideCompleted ? 'bg-blue-600' : 'bg-gray-200'"
                    >
                      <span class="sr-only">Enable notifications</span>
                      <span
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                        :class="switchHideCompleted ? 'translate-x-6' : 'translate-x-1'"
                      />
                    </Switch>
                  </div>
                  <div class="text-sm text-gray-500">
                    Не показывать на доске карточки вы<wbr />пол<wbr />ненных задач.
                  </div>
                </div>
              </div>

              <div
                class="p-4 font-semibold hover:bg-gray-200 hover:cursor-pointer"
                @click="placeholder()"
              >
                Закрыть доску
              </div>
            </div>

            <div class="flex flex-col text-gray-400">
              <div class="px-4 py-1">Создана: {{ created }}</div>
              <div class="px-4 py-1">Обновлена: {{ updated }}</div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
