import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "sign-in-metadata",
  content: {
    title: t({
      en: "Porto Space Team | Sign In",
      pt: "Porto Space Team | Entrar",
    }),
    description: t({
      en: "Sign in to access the Porto Space Team admin panel",
      pt: "Entre para aceder ao painel de administração do Porto Space Team",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
