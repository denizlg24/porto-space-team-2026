import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const competitionsPageContent = {
  key: "competitions-page",
  content: {
    hero: {
      label: t({
        en: "// Competitions & Events",
        pt: "// Competições e Eventos",
      }),
      title: t({
        en: "Pushing Boundaries",
        pt: "Ultrapassar Limites",
      }),
      description: t({
        en: "Porto Space Team participates in prestigious aerospace competitions worldwide, testing our designs and capabilities against the best university teams.",
        pt: "A Porto Space Team participa em prestigiadas competições aeroespaciais em todo o mundo, testando os nossos designs e capacidades contra as melhores equipas universitárias.",
      }),
    },
    empty: {
      title: t({
        en: "Coming Soon",
        pt: "Em Breve",
      }),
      description: t({
        en: "We're preparing content about our competitions. Check back soon for updates!",
        pt: "Estamos a preparar conteúdo sobre as nossas competições. Volte em breve para atualizações!",
      }),
    },
  },
} satisfies Dictionary;

export default competitionsPageContent;
