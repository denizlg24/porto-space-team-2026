import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const applyMetadataContent = {
  key: "apply-metadata",
  content: {
    title: t({
      en: "Apply - Porto Space Team",
      pt: "Candidatar - Porto Space Team",
    }),
    description: t({
      en: "Join Porto Space Team! Apply now to be part of Portugal's leading student rocketry team. No prior experience required.",
      pt: "Junte-se à Porto Space Team! Candidate-se agora para fazer parte da principal equipa de foguetões estudantil de Portugal. Não é necessária experiência prévia.",
    }),
  },
} satisfies Dictionary;

export default applyMetadataContent;
