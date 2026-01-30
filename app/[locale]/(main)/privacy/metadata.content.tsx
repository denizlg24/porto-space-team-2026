import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const privacyMetadata = {
  key: "privacy-metadata",
  content: {
    title: t({
      en: "Privacy Policy | Porto Space Team",
      pt: "Politica de Privacidade | Porto Space Team",
    }),
    description: t({
      en: "Learn how Porto Space Team collects, uses, and protects your personal information. We are committed to transparency and your privacy.",
      pt: "Saiba como a Porto Space Team recolhe, utiliza e protege as suas informacoes pessoais. Estamos comprometidos com a transparencia e a sua privacidade.",
    }),
  },
} satisfies Dictionary;

export default privacyMetadata;
