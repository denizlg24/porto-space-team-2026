import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const unsubscribePageContent = {
  key: "newsletter-unsubscribe-page",
  content: {
    success: {
      title: t({
        en: "Successfully Unsubscribed",
        pt: "Subscrição Cancelada",
      }),
      description: t({
        en: "You have been unsubscribed from our newsletter. You will no longer receive emails from us.",
        pt: "A sua subscrição foi cancelada. Não receberá mais emails nossos.",
      }),
    },
    error: {
      title: t({
        en: "Unsubscribe Failed",
        pt: "Falha ao Cancelar",
      }),
      invalidToken: t({
        en: "The unsubscribe link is invalid or has expired.",
        pt: "O link de cancelamento é inválido ou expirou.",
      }),
      missingToken: t({
        en: "No unsubscribe token was provided.",
        pt: "Nenhum token de cancelamento foi fornecido.",
      }),
      serverError: t({
        en: "An error occurred while processing your request. Please try again later.",
        pt: "Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente mais tarde.",
      }),
    },
    backToHome: t({
      en: "Back to Home",
      pt: "Voltar ao Início",
    }),
  },
} satisfies Dictionary;

export default unsubscribePageContent;
