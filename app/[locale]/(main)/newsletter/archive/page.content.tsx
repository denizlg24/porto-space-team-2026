import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const archivePageContent = {
  key: "newsletter-archive-page",
  content: {
    meta: {
      title: t({
        en: "Newsletter Archive - Porto Space Team",
        pt: "Arquivo de Newsletters - Porto Space Team",
      }),
      description: t({
        en: "Browse all past editions of the Porto Space Team newsletter.",
        pt: "Navega por todas as edições anteriores da newsletter da Porto Space Team.",
      }),
    },
    hero: {
      label: t({
        en: "// Complete Archive",
        pt: "// Arquivo Completo",
      }),
      title: t({
        en: "Newsletter Archive",
        pt: "Arquivo de Newsletters",
      }),
      description: t({
        en: "Browse through all our past newsletter editions. Each edition captures our team's journey, technical achievements, and mission updates.",
        pt: "Navega por todas as nossas edições anteriores. Cada edição captura a jornada da nossa equipa, conquistas técnicas e atualizações da missão.",
      }),
    },
    backToNewsletter: t({
      en: "Back to Newsletter",
      pt: "Voltar à Newsletter",
    }),
    noNewsletters: t({
      en: "No newsletters have been published yet.",
      pt: "Ainda não foram publicadas newsletters.",
    }),
  },
} satisfies Dictionary;

export default archivePageContent;
