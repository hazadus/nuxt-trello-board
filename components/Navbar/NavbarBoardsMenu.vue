<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";

const route = useRoute();
const boardStore = useBoardStore();

const menuTitle = computed(() => {
  if (route.path === "/boards/") return { icon: "ic:sharp-home", title: "Все доски" };
  if (route.path === "/table/") return { icon: "ph:table-fill", title: "Все карточки" };

  if (route.path.startsWith("/boards/")) {
    const boardId = route.path.split("/")[2];
    const board = boardStore.boards.find((item) => item._id === boardId);
    if (board) return { icon: "material-symbols:dashboard", title: board.title };
  }

  return { icon: "", title: "Ваши доски" };
});

if (!boardStore.boards.length) {
  boardStore.getAll();
}
</script>

<template>
  <Menu
    as="div"
    class="relative"
  >
    <MenuButton
      class="w-40 md:w-56 lg:w-72 py-1.5 px-3 bg-opacity-50 bg-teal-500 focus:outline-none hover:bg-opacity-70 rounded-lg"
    >
      <div class="flex items-center space-x-2">
        <Icon
          v-if="menuTitle.icon"
          :name="menuTitle.icon"
          class="shrink-0"
        />
        <span class="inline-block whitespace-nowrap overflow-hidden flex-1">{{
          menuTitle.title
        }}</span>
        <Icon
          name="mdi:chevron-down"
          class="shrink-0"
        />
      </div>
    </MenuButton>

    <Transition
      enterActiveClass="transition transform duration-100 ease-out"
      enterFromClass="opacity-0 scale-90"
      enterToClass="opacity-100 scale-100"
      leaveActiveClass="transition transform duration-100 ease-in"
      leaveFromClass="opacity-100 scale-100"
      leaveToClass="opacity-0 scale-90"
    >
      <MenuItems
        class="absolute left-0 origin-top-left w-48 md:w-56 lg:w-72 mt-2 bg-white rounded-md shadow-lg border focus:outline-none divide-y divide-gray-100"
      >
        <div class="px-1 py-1">
          <CustomMenuItem
            icon="ic:sharp-home"
            link="/boards/"
          >
            Все доски
          </CustomMenuItem>
          <CustomMenuItem
            icon="ph:table-fill"
            link="/table/"
          >
            Все карточки
          </CustomMenuItem>
        </div>
        <div
          v-if="boardStore.boards.length"
          class="px-1 py-1"
        >
          <CustomMenuItem
            icon="material-symbols:dashboard"
            v-for="board in boardStore.boards"
            :key="`board-menu-item-${board._id}`"
            :link="`/boards/${board._id}`"
          >
            {{ board.title }}
          </CustomMenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
