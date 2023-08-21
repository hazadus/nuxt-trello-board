<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

const authStore = useAuthStore();
const router = useRouter();

async function onClickLogOut() {
  await authStore.logOut();
  if (!authStore.isAuthenticated) router.push("/login/");
}
</script>

<template>
  <Menu v-if="authStore.isAuthenticated" as="div" class="relative">
    <MenuButton class="focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-white rounded-full">
      <img class="w-10 h-10 inline rounded-full" src="/images/default-profile-pic.jpg" alt="Profile image">
    </MenuButton>

    <Transition enterActiveClass="transition transform duration-100 ease-out" enterFromClass="opacity-0 scale-90"
      enterToClass="opacity-100 scale-100" leaveActiveClass="transition transform duration-100 ease-in"
      leaveFromClass="opacity-100 scale-100" leaveToClass="opacity-0 scale-90">
      <MenuItems
        class="absolute right-0 origin-top-right mt-2 bg-white rounded-md shadow-lg border w-48 focus:outline-none divide-y divide-gray-100">
        <div class="px-1 py-1">
          <MenuItem v-slot="{ disabled }" disabled>
          <a href="#" :class="{ 'opacity-40': disabled }" class="block px-4 py-3 text-sm text-gray-700">
            {{ authStore.user?.email }}
          </a>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active, disabled }" disabled>
          <a href="#" :class="{ 'bg-gray-100': active, 'opacity-40': disabled }"
            class="block px-4 py-3 text-md text-gray-700">
            Профиль
          </a>
          </MenuItem>
          <MenuItem v-slot="{ active, disabled }" disabled>
          <a href="#" :class="{ 'bg-gray-100': active, 'opacity-40': disabled }"
            class="block px-4 py-3 text-md text-gray-700">
            Настройки
          </a>
          </MenuItem>
          <MenuItem v-slot="{ active, disabled }" disabled>
          <a href="#" :class="{ 'bg-gray-100': active, 'opacity-40': disabled }"
            class="block px-4 py-3 text-md text-gray-700">
            Помощь
          </a>
          </MenuItem>
        </div>

        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
          <a href="#" @click.prevent="onClickLogOut" :class="{ 'bg-gray-100': active }"
            class="block px-4 py-3 text-md text-gray-700">
            Выйти
          </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>