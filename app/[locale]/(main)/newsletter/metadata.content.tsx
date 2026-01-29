import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const aboutMetadata = {
  key: "newsletter-metadata",
  content: {
    title: t({
      en: "Newsletter | Porto Space Team",
      pt: "Notícias | Porto Space Team",
    }),
    description: t({
      en: "Read our latest newsletter to stay updated on Porto Space Team's projects, events, and achievements in aerospace engineering.",
      pt: "Leia as nossas últimas notícias para se manter atualizado sobre os projetos, eventos e conquistas do Porto Space Team em engenharia aeroespacial.",
    }),
  },
} satisfies Dictionary;

export default aboutMetadata;
