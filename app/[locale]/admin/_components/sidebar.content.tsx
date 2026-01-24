import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const adminSidebarContent = {
  key: "admin-sidebar",
  content: {
    title: t({
      en: "Admin Panel",
      pt: "Painel Admin",
    }),
    breadcrumbTitle: t({
      en: "Admin",
      pt: "Painel Admin",
    }),
    nav: {
      dashboard: t({
        en: "Dashboard",
        pt: "Dashboard",
      }),
      users: t({
        en: "Users",
        pt: "Utilizadores",
      }),
      approvals: t({
        en: "Approvals",
        pt: "Aprovações",
      }),
      sponsors: t({
        en: "Sponsors",
        pt: "Patrocinadores",
      }),
      newsletter: t({
        en: "Newsletter",
        pt: "Newsletter",
      }),
      settings: t({
        en: "Settings",
        pt: "Definições",
      }),
    },
    sections: {
      main: t({
        en: "Main",
        pt: "Principal",
      }),
      management: t({
        en: "Management",
        pt: "Gestão",
      }),
      system: t({
        en: "System",
        pt: "Sistema",
      }),
    },
    footer: {
      backToSite: t({
        en: "Back to Site",
        pt: "Voltar ao Site",
      }),
      signOut: t({
        en: "Sign Out",
        pt: "Terminar Sessão",
      }),
    },
  },
} satisfies Dictionary;

export default adminSidebarContent;
