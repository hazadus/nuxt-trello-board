<template>
  <Title> Контакт | Трололо </Title>

  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
    style="height: calc(100vh - 64px)"
  >
    <div class="bg-white p-5 rounded-md shadow-lg w-96 flex flex-col">
      <h1 class="font-semibold mb-3 text-center">Разработчик проекта</h1>
      <img
        src="/images/bear-in-sweater.jpg"
        class="rounded-full w-60 mb-3 mx-auto"
      />
      <div class="border-b pb-2">
        <h2 class="text-center mb-2 border-b pb-2">Александр Голдовский</h2>
        <span class="block">Санкт-Петербург, Россия</span>
        <span class="block">hazadus.ru</span>
        <span class="block">Интересы: Python, Django, TypeScript, Vue</span>
      </div>
      <div class="flex flex-row justify-between px-5 py-3">
        <Icon
          name="ic:baseline-telegram"
          size="30"
        />
        <Icon
          name="ic:baseline-telegram"
          size="30"
        />
        <Icon
          name="ic:baseline-telegram"
          size="30"
        />
      </div>
    </div>
  </div>
</template>
