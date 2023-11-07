<script setup lang="ts"></script>

<template>
  <Title> Трололо </Title>

  <!-- Hero section -->
  <section class="hero bg-primary-50 flex flex-col items-center justify-center">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <a
        href="https://hazadus.ru/blog/nuxt-board-deploy"
        class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
        role="alert"
      >
        <span class="text-2xl bg-primary-600 rounded-full text-white px-4 py-0 mr-3"> 🚀 </span>
        <span class="text-sm font-medium">
          Приложение запущено! Узнайте детали последнего обновления
        </span>
        <svg
          class="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl"
      >
        Самые лучшие доски в сети
      </h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
        Мы предлагаем вам удобный и современный инструмент для создания канбан-досок онлайн.
        Полностью бесплатно!
      </p>
      <div
        class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
      >
        <RouterLink
          to="/login/"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
        >
          Попробовать
          <svg
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </RouterLink>
        <a
          href="https://github.com/hazadus/nuxt-trello-board"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
        >
          <svg
            class="mr-2 -ml-1 w-5 h-5"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="32.77"
            height="32"
            viewBox="0 0 256 250"
          >
            <path
              d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403Z"
            />
          </svg>
          Исходники на GitHub
        </a>
      </div>
      <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
        <span class="font-semibold text-gray-400 uppercase"> Сделано с ❤️ и при помощи: </span>
        <div
          class="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between"
        >
          <a
            href="#"
            class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 text-4xl"
          >
            <Icon name="logos:nuxt-icon" />
            Nuxt
          </a>
          <a
            href="#"
            class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 text-4xl"
          >
            <Icon name="logos:typescript-icon" />
            TypeScript
          </a>
          <a
            href="#"
            class="mr-5 mb-5 lg:mb-0 hover:text-gray-800 text-4xl"
          >
            <Icon name="logos:mongodb-icon" />
            MongoDB
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Content section -->
  <section class="content bg-primary-100 flex flex-col items-center justify-center">
    <div
      class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
    >
      <div class="font-light text-gray-500 sm:text-lg">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Мы не изобретали колесо заново
        </h2>
        <p class="mb-4">
          Доска Канбан — это инструмент управления Agile-проектами, который помогает наглядно
          представить задачи, ограничить объем незавершенной работы и добиться максимальной
          эффективности (или скорости). Она может помочь командам Agile и DevOps упорядочить
          повседневную работу. С помощью карточек и столбцов на доске Канбан команды могут понять,
          какой объем работы следует взять на себя, и выполнить этот объем, придерживаясь принципов
          непрерывного совершенствования.
        </p>
        <p class="mb-4">
          Методика Канбан проделала долгий путь от своих истоков в сфере бережливого производства,
          за что стоит поблагодарить небольшую, но эффективную группу ее сторонников.
        </p>
        <p>
          Сегодня, у вас есть надёный инструмент для реализации методики Канбан прямо в браузере!
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img
          class="w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
          alt="office content 1"
        />
        <img
          class="mt-4 w-full lg:mt-10 rounded-lg"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
          alt="office content 2"
        />
      </div>
    </div>
  </section>

  <!-- Features section -->
  <section class="features bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Все возможности канбан для вас
        </h2>
        <p class="text-gray-500 sm:text-xl">
          Мы предлагаем самую передовую реализацию инструмента, применяемого в методологиях Scrum и
          Agile.
        </p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        <div>
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <svg
              class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">Планирование</h3>
          <p class="text-gray-500">
            Планируй, создавай, запускай. Организуйте свои дела и достигайте целей, каждый день.
          </p>
        </div>
        <div>
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <svg
              class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">Открытый код</h3>
          <p class="text-gray-500">
            Код проекта доступен для всех. Никаких подводных камней! Вы даже можете запустить его на
            своём сайте.
          </p>
        </div>
        <div>
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <svg
              class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
              <path
                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">Используйте в бизнесе</h3>
          <p class="text-gray-500">Презентуйте свои планы коллегам на канбан-доске!</p>
        </div>
        <div>
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <svg
              class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
              ></path>
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">Бесплатно</h3>
          <p class="text-gray-500">
            Использование сервиса не стоит для вас не копейки, и всегда останется бесплатным.
          </p>
        </div>
        <div>
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <svg
              class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">Современный UI</h3>
          <p class="text-gray-500">
            Отзывчивый и современный интерфейс позволит вам с комфортом планировать работу как на
            десктопе, так и на смартфоне.
          </p>
        </div>
        <div>
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12"
          >
            <svg
              class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">Настройки</h3>
          <p class="text-gray-500">
            Выбирайте такой внешний вид досок, какой удобен лично вам (опция пока на стадии
            проектирования).
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats section -->
  <section class="bg-white">
    <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3">
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold">2+</dt>
          <dd class="font-light text-gray-500">пользователей</dd>
        </div>
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold">10+</dt>
          <dd class="font-light text-gray-500">досок</dd>
        </div>
        <div class="flex flex-col items-center justify-center">
          <dt class="mb-2 text-3xl md:text-4xl font-extrabold">44+</dt>
          <dd class="font-light text-gray-500">карточек</dd>
        </div>
      </dl>
    </div>
  </section>

  <!-- CTA section -->
  <section class="cta bg-primary-100">
    <div
      class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
    >
      <img
        class="w-full"
        src="/images/screenshot1.png"
        alt="Kanban board"
      />
      <div class="mt-4 md:mt-0">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Создавайте новое и приводите свои идеи в жизнь при помощи современного инструмента.
        </h2>
        <p class="mb-6 font-light text-gray-500 md:text-lg">
          Трололо поможет вам качественно спланировать выполнение любых задач, и с удовольсвием
          довести свои идеи до реализации.
        </p>
        <RouterLink
          to="/login/"
          class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Приступим
          <svg
            class="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Testimonials section -->
  <section class="testimonial bg-white">
    <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <figure class="max-w-screen-md mx-auto">
        <svg
          class="h-12 mx-auto mb-3 text-gray-400"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <blockquote>
          <p class="text-2xl font-medium text-gray-900">
            "Трололо очень крут. Я не знаю, для чего это нужно, и сам не пользуюсь, но парни
            говорят, что штука рабочая. И я придумал название!"
          </p>
        </blockquote>
        <figcaption class="flex items-center justify-center mt-6 space-x-3">
          <img
            class="w-6 h-6 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
            alt="profile picture"
          />
          <div class="flex items-center divide-x-2 divide-gray-500">
            <div class="pr-3 font-medium text-gray-900">Александр Флоренцев</div>
            <div class="pl-3 text-sm font-light text-gray-500">
              Руководитель в крупнейшей транспортной компании
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero,
.content {
  min-height: calc(100vh - 54px);
}
</style>
