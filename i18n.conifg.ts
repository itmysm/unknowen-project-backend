import en from "./src/locales/en.json";

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "en",
    messages: {
      en,
    },
  };
});
