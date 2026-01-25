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
        pt: "O seu endereco de email foi verificado com sucesso. A sua conta esta agora pendente de aprovacao por um administrador.",
      }),
      pendingApproval: t({
        en: "You will be notified by email once your account has been approved and you can sign in.",
        pt: "Sera notificado por email assim que a sua conta for aprovada e puder entrar.",
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
        pt: "O link de verificacao e invalido ou expirou. Por favor tente registar-se novamente ou contacte o suporte se o problema persistir.",
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
