<script setup lang="ts">
import { IError } from "@/types";

const props = defineProps({
  // Reference: https://nuxt.com/docs/getting-started/error-handling#rendering-an-error-page 
  error: Object as PropType<IError>,
});

function onClearError() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <Title>
    Ошибка
  </Title>

  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
          {{ props.error?.statusCode }}
        </h1>
        <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
          {{ props.error?.message }}
        </p>
        <p class="mb-4 text-lg font-light text-gray-500">
          Извините, произошла ошибка.
        </p>
        <a @click="onClearError"
          class="inline-flex text-white bg-indigo-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 cursor-pointer hover:bg-indigo-600">
          Вернуться на главную
        </a>
      </div>
    </div>
  </section>
</template>