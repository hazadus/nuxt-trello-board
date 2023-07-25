<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
</script>

<template>
  <nav class="sticky top-0 bg-teal-600 border-gray-200 shadow-md">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <RouterLink to="/" class="flex items-baseline">
        <span class="self-center text-2xl font-semibold text-gray-300 whitespace-nowrap">
          <Icon name="material-symbols:space-dashboard" class="text-3xl" />
          Доскач
        </span>
      </RouterLink>
      <div class="flex items-center md:order-2">
        <!-- Dropdown user menu -->
        <Menu as="div" class="relative">
          <MenuButton class="focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-white rounded-full">
            <img class="w-10 h-10 inline rounded-full" src="/images/default-profile-pic.jpg" alt="Profile image">
          </MenuButton>

          <Transition enterActiveClass="transition transform duration-100 ease-out" enterFromClass="opacity-0 scale-90"
            enterToClass="opacity-100 scale-100" leaveActiveClass="transition transform duration-100 ease-in"
            leaveFromClass="opacity-100 scale-100" leaveToClass="opacity-0 scale-90">
            <MenuItems
              class="absolute right-0 origin-top-right mt-2 bg-white rounded-md shadow-lg border w-48 focus:outline-none divide-y divide-gray-100">
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                <a href="#" :class="{ 'bg-gray-100': active }" class="block px-4 py-3 text-md text-gray-700">Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#" :class="{ 'bg-gray-100': active }" class="block px-4 py-3 text-md text-gray-700">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active, disabled }" disabled>
                <a href="#" :class="{ 'bg-gray-100': active, 'opacity-40': disabled }"
                  class="block px-4 py-3 text-md text-gray-700">Help</a>
                </MenuItem>
              </div>

              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                <a href="#" :class="{ 'bg-gray-100': active }" class="block px-4 py-3 text-md text-gray-700">Logout</a>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>

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
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
          <li>
            <RouterLink to="/" class="block py-2 pl-3 pr-4 text-gray-300 rounded bg-transparent md:p-0">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/signup/"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-200 md:p-0">
              Sign Up
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/login/"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-200 md:p-0">
              Log In
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/about/"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-200 md:p-0">
              About
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/contact/"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-200 md:p-0">
              Contact
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>