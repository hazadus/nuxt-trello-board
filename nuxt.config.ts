// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon", "@pinia/nuxt"],
  ssr: false,
  runtimeConfig: {
    // NB: don't forget to add `NUXT_` prefix when setting the vat in environment!
    // I.e., use `NUXT_MONGO_DB_ADDRESS` in docker-compose.yml.
    mongoDbAddress: process.env.MONGO_DB_ADDRESS,
  },
  tailwindcss: {
    cssPath: "~/assets/main.css",
  },
  build: {
    transpile: ["@headlessui/tailwindcss", "@headlessui/vue", "vue-toastification"],
  },
});
