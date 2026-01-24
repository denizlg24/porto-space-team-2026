import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "admin-metadata",
  content: {
    title: t({
      en: "Porto Space Team | Admin",
      pt: "Porto Space Team | Administracao",
    }),
    description: t({
      en: "Admin dashboard for Porto Space Team",
      pt: "Painel de administracao do Porto Space Team",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
