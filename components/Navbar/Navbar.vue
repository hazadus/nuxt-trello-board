<script setup lang="ts">
import NavbarBoardsMenu from "./NavbarBoardsMenu.vue";
import NavbarSearchButton from "./Search/NavbarSearchButton.vue";

const authStore = useAuthStore();

const isHamburgerOpen = ref(false);

const activeMenuClasses =
  "block py-2 pl-3 pr-4 text-gray-100 underline rounded bg-transparent md:p-0";
const menuClasses =
  "block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0";

interface IMenuItem {
  title: string;
  route: string;
  classes: string;
}

const menu = computed((): IMenuItem[] => [
  {
    title: "Главная",
    route: "/",
    classes: useRoute().path == "/" ? activeMenuClasses : menuClasses,
  },
  {
    title: "Регистрация",
    route: "/signup/",
    classes: useRoute().path == "/signup/" ? activeMenuClasses : menuClasses,
  },
  {
    title: "Вход",
    route: "/login/",
    classes: useRoute().path == "/login/" ? activeMenuClasses : menuClasses,
  },
  {
    title: "О сайте",
    route: "/about/",
    classes: useRoute().path == "/about/" ? activeMenuClasses : menuClasses,
  },
  {
    title: "Контакты",
    route: "/contact/",
    classes: useRoute().path == "/contact/" ? activeMenuClasses : menuClasses,
  },
]);
</script>

<template>
  <nav class="sticky top-0 z-10 bg-teal-600 border-gray-200 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <div class="flex items-middle items-center p-0">
        <Icon
          name="material-symbols:space-dashboard"
          class="text-3xl mr-2 text-gray-700 drop-shadow-lg"
        />
        <RouterLink
          to="/"
          class="text-xl mr-10 font-semibold text-gray-300 whitespace-nowrap drop-shadow-lg hidden md:block"
          style="line-height: 1.8rem"
        >
          Трололо
        </RouterLink>

        <NavbarBoardsMenu v-if="authStore.isAuthenticated" />
      </div>

      <div class="flex items-center md:order-2">
        <NavbarSearchButton class="mr-4" />
        <NavbarUserMenu />

        <!-- Hamburger button - show only to not authenticated users on small screens  -->
        <template v-if="!authStore.isAuthenticated">
          <button
            @click="isHamburgerOpen = !isHamburgerOpen"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </template>
      </div>

      <template v-if="!authStore.isAuthenticated">
        <!-- Navbar pages menu for not-authenticated users for large screens / toggled by hamburger for small screens-->
        <div
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
          :class="isHamburgerOpen ? 'flex' : 'hidden'"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent w-full md:flex-row md:space-x-8 md:mt-0 md:border-0"
          >
            <li
              v-for="(item, index) in menu"
              :key="`menu-item-${index}`"
            >
              <RouterLink
                :to="item.route"
                :class="item.classes"
                @click="isHamburgerOpen = false"
              >
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </nav>
</template>
