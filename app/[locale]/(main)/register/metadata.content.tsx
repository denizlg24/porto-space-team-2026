import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "register-metadata",
  content: {
    title: t({
      en: "Porto Space Team | Register",
      pt: "Porto Space Team | Registar",
    }),
    description: t({
      en: "Request access to the Porto Space Team admin panel",
      pt: "Peça acesso ao painel de administração do Porto Space Team",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
