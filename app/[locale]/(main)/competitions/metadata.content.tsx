import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const competitionsMetadata = {
  key: "competitions-metadata",
  content: {
    title: t({
      en: "Competitions | Porto Space Team",
      pt: "Competições | Porto Space Team",
    }),
    description: t({
      en: "Discover the competitions Porto Space Team participates in, from the European Rocketry Challenge to CanSat. See our achievements and upcoming events.",
      pt: "Descubra as competições em que a Porto Space Team participa, desde o European Rocketry Challenge até ao CanSat. Veja as nossas conquistas e eventos futuros.",
    }),
  },
} satisfies Dictionary;

export default competitionsMetadata;
