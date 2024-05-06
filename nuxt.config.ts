import { NuxtConfig } from "nuxt/schema";

export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n"],
  srcDir: "src",
  i18n: {
    locales: [{ code: "en", iso: "en_US", file: "en.json" }],
    defaultLocale: "en",
    langDir: "locales/",
    lazy: true,
    customRoutes: "config",
  } satisfies NuxtConfig["i18n"],
});
