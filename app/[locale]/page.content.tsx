import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "home-page",
  content: {
    title: t({
      en: "PORTO SPACE TEAM",
      pt: "PORTO SPACE TEAM",
    }),
    subtitle: t({
      en: "Reaching for the stars",
      pt: "A alcançar as estrelas",
    }),
    welcome: t({
      en: "Welcome to Porto Space Team",
      pt: "Bem-vindo ao Porto Space Team",
    }),
  },
} satisfies Dictionary;

export default pageContent;
