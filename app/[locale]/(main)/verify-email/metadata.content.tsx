import { type Dictionary, t } from "intlayer";

const metadata = {
  key: "verify-email-metadata",
  content: {
    title: t({
      en: "Verify Email | Porto Space Team",
      pt: "Verificar Email | Porto Space Team",
    }),
    description: t({
      en: "Verify your email address to complete your registration with Porto Space Team.",
      pt: "Verifique o seu endereco de email para completar o seu registo no Porto Space Team.",
    }),
  },
} satisfies Dictionary;

export default metadata;
