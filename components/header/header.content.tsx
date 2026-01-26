import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const headerContent = {
  key: "header",
  content: {
    nav: {
      about: t({
        en: "About",
        pt: "Sobre",
      }),
      project: t({
        en: "Projects",
        pt: "Projetos",
      }),
      sponsors: t({
        en: "Sponsors",
        pt: "Patrocinadores",
      }),
      competitions: t({
        en: "Competitions",
        pt: "Competições",
      }),
      newsletter: t({
        en: "Newsletter",
        pt: "Newsletter",
      }),
    },
    cta: t({
      en: "Join Us",
      pt: "Junta-te",
    }),
    menu: t({
      en: "Menu",
      pt: "Menu",
    }),
    closeMenu: t({
      en: "Close menu",
      pt: "Fechar menu",
    }),
  },
} satisfies Dictionary;

export default headerContent;
