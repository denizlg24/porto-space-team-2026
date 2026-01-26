import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const aboutMetadata = {
  key: "about-metadata",
  content: {
    title: t({
      en: "About Us | Porto Space Team",
      pt: "Sobre Nós | Porto Space Team",
    }),
    description: t({
      en: "Learn about Porto Space Team, a student-led aerospace initiative at the University of Porto. Discover our mission, values, and journey.",
      pt: "Saiba mais sobre o Porto Space Team, uma iniciativa aeroespacial liderada por estudantes na Universidade do Porto. Descubra a nossa missão, valores e jornada.",
    }),
  },
} satisfies Dictionary;

export default aboutMetadata;
