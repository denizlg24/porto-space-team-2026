import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const notFoundMetadataContent = {
  key: "not-found-metadata",
  content: {
    title: t({
      en: "Page Not Found | Porto Space Team",
      pt: "Página Não Encontrada | Porto Space Team",
    }),
    description: t({
      en: "The page you are looking for does not exist.",
      pt: "A página que procura não existe.",
    }),
  },
} satisfies Dictionary<Metadata>;

export default notFoundMetadataContent;
