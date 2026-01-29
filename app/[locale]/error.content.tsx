import { type Dictionary, t } from "intlayer";

const errorContent = {
  key: "error-page",
  content: {
    error: t({
      en: "Error",
      pt: "Erro",
    }),
    heading: t({
      en: "500",
      pt: "500",
    }),
    title: t({
      en: "Something Went Wrong",
      pt: "Algo Correu Mal",
    }),
    description: t({
      en: "An unexpected error occurred. Please try again or return to the home page.",
      pt: "Ocorreu um erro inesperado. Por favor, tente novamente ou volte à página inicial.",
    }),
    tryAgain: t({
      en: "Try Again",
      pt: "Tentar Novamente",
    }),
    backHome: t({
      en: "Back to Home",
      pt: "Voltar ao Início",
    }),
  },
} satisfies Dictionary;

export default errorContent;
