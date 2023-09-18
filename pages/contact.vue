<template>
  <Title> Контакт | Трололо </Title>

  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
    style="height: calc(100vh - 64px)"
  >
    <div class="bg-white p-5 rounded-md shadow-lg w-96 flex flex-col">
      <h1 class="mb-3 text-center">Разработчик проекта</h1>
      <img
        src="/images/amgold-profile-pic.jpg"
        class="rounded-full w-60 mb-3 mx-auto"
      />
      <div class="border-b pb-2">
        <h2 class="text-center font-semibold mb-2 border-b pb-2">Александр Голдовский</h2>
        <span class="block">
          <Icon
            name="material-symbols:location-on-outline"
            class="text-2xl mx-2"
          />Санкт-Петербург, Россия
        </span>
        <span class="block"
          ><Icon
            name="ph:link-simple-bold"
            class="text-2xl mx-2"
          /><a
            href="https://hazadus.ru"
            class="hover:underline"
            >hazadus.ru</a
          ></span
        >
      </div>
      <div class="flex flex-row justify-between px-5 pt-3">
        <a href="https://t.me/Hazadus"
          ><Icon
            name="ic:baseline-telegram"
            size="30"
        /></a>
        <a href="mailto:hazadus7@gmail.com"
          ><Icon
            name="material-symbols:alternate-email"
            size="30"
        /></a>
        <a href="https://github.com/hazadus/"
          ><Icon
            name="octicon:mark-github-16"
            size="30"
        /></a>
      </div>
    </div>
  </div>
</template>
