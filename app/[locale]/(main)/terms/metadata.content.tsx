import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const termsMetadata = {
  key: "terms-metadata",
  content: {
    title: t({
      en: "Terms of Service | Porto Space Team",
      pt: "Termos de Servico | Porto Space Team",
    }),
    description: t({
      en: "Read the terms and conditions for using the Porto Space Team website and services.",
      pt: "Leia os termos e condicoes para utilizar o website e servicos da Porto Space Team.",
    }),
  },
} satisfies Dictionary;

export default termsMetadata;
