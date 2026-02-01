import { type Dictionary, t } from "intlayer";

const notFoundContent = {
  key: "not-found-page",
  content: {
    error: t({
      en:"Error",
      pt:"Erro"
    }),
    heading: t({
      en: "404",
      pt: "404",
    }),
    title: t({
      en: "Page Not Found",
      pt: "Página Não Encontrada",
    }),
    description: t({
      en: "Sorry, we couldn't find the page you're looking for.",
      pt: "Desculpa, não conseguimos encontrar a página que procuras.",
    }),
    backHome: t({
      en: "Back to Home",
      pt: "Voltar ao Início",
    }),
  },
} satisfies Dictionary;

export default notFoundContent;
