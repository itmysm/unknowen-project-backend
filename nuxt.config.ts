import en from "./locales/en.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n"],

  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
