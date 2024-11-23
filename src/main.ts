import { createApp } from "vue";
import App from "./App.vue";
import { vuetify } from "@/core/plugins/vuetify";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { queryClient } from "@/core/plugins/query-client";
import { setLuxonDefaults } from "@/core/plugins/luxon";

setLuxonDefaults();

createApp(App)
  .use(vuetify)
  .use(VueQueryPlugin, {queryClient})
  .use(createPinia())
  .mount("#app");
