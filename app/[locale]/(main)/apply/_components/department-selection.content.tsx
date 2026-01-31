import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const departmentSelectionContent = {
  key: "department-selection",
  content: {
    selected: t({
      en: "department",
      pt: "departamento",
    }),
    selectedPlural: t({
      en: "departments",
      pt: "departamentos",
    }),
    selectedSuffix: t({
      en: "selected",
      pt: "selecionado",
    }),
    selectedPluralSuffix: t({
      en: "selected",
      pt: "selecionados",
    }),
    continue: t({
      en: "Continue",
      pt: "Continuar",
    }),
  },
} satisfies Dictionary;

export default departmentSelectionContent;
