// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon", "@pinia/nuxt"],
  ssr: false,
  runtimeConfig: {
    // NB: don't forget to add `NUXT_` prefix when setting the vat in environment!
    // I.e., use `NUXT_MONGO_DB_ADDRESS` in docker-compose.yml.
    mongoDbAddress: process.env.MONGO_DB_ADDRESS,
    uploadDir: process.env.UPLOAD_DIR,
  },
  tailwindcss: {
    cssPath: "~/assets/main.css",
  },
  build: {
    transpile: ["@headlessui/tailwindcss", "@headlessui/vue", "vue-toastification"],
  },
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16x",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      ],
      meta: [
        { name: "apple-mobile-web-app-title", content: "Доскач" },
        { name: "application-name", content: "Доскач" },
        { name: "msapplication-TileColor", content: "#da532c" },
        { name: "theme-color", content: "#ffffff" },
      ],
    },
  },
});
