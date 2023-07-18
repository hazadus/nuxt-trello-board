// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon"],
  ssr: false,
  routeRules: {
    "/": { static: true },
  },
  app: {
    baseURL: "/nuxt-trello-board/",
  },
});
