<script setup lang="ts">
const authStore = useAuthStore();

const activeMenuClasses = "block py-2 pl-3 pr-4 text-gray-100 underline rounded bg-transparent md:p-0";
const menuClasses = "block py-2 pl-3 pr-4 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-white md:p-0";

interface IMenuItem {
  title: string;
  route: string;
  classes: string;
}

const menu = computed((): IMenuItem[] => [
  {
    title: "Главная",
    route: "/",
    classes: useRoute().path == '/' ? activeMenuClasses : menuClasses,
  },
  {
    title: "Регистрация",
    route: "/signup/",
    classes: useRoute().path == '/signup/' ? activeMenuClasses : menuClasses,
  },
  {
    title: "Вход",
    route: "/login/",
    classes: useRoute().path == '/login/' ? activeMenuClasses : menuClasses,
  },
  {
    title: "О сайте",
    route: "/about/",
    classes: useRoute().path == '/about/' ? activeMenuClasses : menuClasses,
  },
  {
    title: "Контакты",
    route: "/contact/",
    classes: useRoute().path == '/contact/' ? activeMenuClasses : menuClasses,
  },
]);
</script>

<template>
  <nav class="sticky top-0 z-10 bg-teal-600 border-gray-200 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <div class="flex items-middle">
        <Icon name="material-symbols:space-dashboard" class="text-3xl mr-2 text-gray-700 drop-shadow-lg" />
        <RouterLink to="/" class="text-2xl mr-10 font-semibold text-gray-300 whitespace-nowrap drop-shadow-lg"
          style="line-height: 1.8rem;">
          Трололо
        </RouterLink>

        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/boards/"
            class="hidden md:block py-1 px-3 mr-2 text-gray-100 text-sm rounded-sm hover:text-white hover:bg-gray-100 hover:bg-opacity-20">
            <Icon name="material-symbols:dashboard" />
            Доски
          </RouterLink>
        </template>
      </div>

      <div class="flex items-center md:order-2">
        <NavbarUserMenu />

        <button data-collapse-toggle="navbar-user" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-user" aria-expanded="false">
          <span class="sr-only">
            Open main menu
          </span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <template v-if="!authStore.isAuthenticated">
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
            <li v-for="(item, index) in menu" :key="`menu-item-${index}`">
              <RouterLink :to="item.route" :class="item.classes">
                {{ item.title }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </nav>
</template>