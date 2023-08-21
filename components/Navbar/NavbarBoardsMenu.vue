<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const router = useRouter();
const route = useRoute();
const boardStore = useBoardStore();

const menuTitle = computed(() => {
  if (route.path === "/boards/") return { icon: "ic:sharp-home", title: "Все доски" }

  if (route.path.startsWith("/boards/")) {
    const boardId = route.path.split("/")[2];
    const board = boardStore.boards.find((item) => item._id === boardId);
    if (board) return { icon: "material-symbols:dashboard", title: board.title }
  }

  return { icon: "", title: "Ваши доски" }
});

if (!boardStore.boards.length) {
  boardStore.getAll();
}
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton class="py-1 px-3 bg-opacity-50 bg-teal-500 focus:outline-none hover:bg-opacity-70 rounded-sm">
      <Icon :name="menuTitle.icon" v-if="menuTitle.icon" class="mr-1" />
      {{ menuTitle.title }}
      <Icon name="mdi:chevron-down" />
    </MenuButton>

    <Transition enterActiveClass="transition transform duration-100 ease-out" enterFromClass="opacity-0 scale-90"
      enterToClass="opacity-100 scale-100" leaveActiveClass="transition transform duration-100 ease-in"
      leaveFromClass="opacity-100 scale-100" leaveToClass="opacity-0 scale-90">
      <MenuItems
        class="absolute left-0 origin-top-left mt-2 bg-white rounded-md shadow-lg border w-48 focus:outline-none divide-y divide-gray-100">
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
          <a href="#" :class="{ 'bg-gray-100': active }" class="block px-4 py-3 text-md text-gray-700"
            @click="router.push('/boards/')">
            <Icon name="ic:sharp-home" class="mr-2" />
            Все доски
          </a>
          </MenuItem>
        </div>
        <div class="px-1 py-1" v-if="boardStore.boards.length">
          <MenuItem v-slot="{ active }" v-for="board in boardStore.boards" :key="`board-menu-item-${board._id}`">
          <a href="#" :class="{ 'bg-gray-100': active }" class="block px-4 py-3 text-md text-gray-700"
            @click="router.push(`/boards/${board._id}`)">
            <Icon name="material-symbols:dashboard" class="mr-2" />
            {{ board.title }}
          </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>