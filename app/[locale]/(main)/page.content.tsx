import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "home-page",
  content: {
    welcome: t({
      en: "Welcome to Porto Space Team",
      pt: "Bem-vindo à Porto Space Team",
    }),
  },
} satisfies Dictionary;

export default pageContent;
