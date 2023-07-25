import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((app) => {
  app.vueApp.use(Toast, {
    // Setting the global default position
    position: POSITION.BOTTOM_RIGHT,
  });
});
