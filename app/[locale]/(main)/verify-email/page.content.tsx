import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "verify-email-page",
  content: {
    success: {
      subtitle: t({
        en: "Email Verified",
        pt: "Email Verificado",
      }),
      title: t({
        en: "Verification Complete",
        pt: "Verificacao Completa",
      }),
      description: t({
        en: "Your email address has been successfully verified. Your account is now pending approval by an administrator.",
        pt: "O teu endereço de email foi verificado com sucesso. A tua conta está agora pendente de aprovação por um administrador.",
      }),
      pendingApproval: t({
        en: "You will be notified by email once your account has been approved and you can sign in.",
        pt: "Serás notificado por email assim que a tua conta for aprovada e puderes entrar.",
      }),
      signIn: t({
        en: "Go to Sign In",
        pt: "Ir para Entrar",
      }),
    },
    error: {
      subtitle: t({
        en: "Verification Failed",
        pt: "Verificacao Falhou",
      }),
      title: t({
        en: "Unable to Verify",
        pt: "Impossivel Verificar",
      }),
      description: t({
        en: "The verification link is invalid or has expired. Please try registering again or contact support if the problem persists.",
        pt: "O link de verificação é inválido ou expirou. Por favor tenta registar-te novamente ou contacta o suporte se o problema persistir.",
      }),
      tryAgain: t({
        en: "Register Again",
        pt: "Registar Novamente",
      }),
      signIn: t({
        en: "Sign In",
        pt: "Entrar",
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
