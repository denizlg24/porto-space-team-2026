import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const adminHeaderContent = {
  key: "admin-header",
  content: {
    toggleSidebar: t({
      en: "Toggle Sidebar",
      pt: "Alternar Menu Lateral",
    }),
    search: t({
      en: "Search...",
      pt: "Pesquisar...",
    }),
  },
} satisfies Dictionary;

export default adminHeaderContent;
