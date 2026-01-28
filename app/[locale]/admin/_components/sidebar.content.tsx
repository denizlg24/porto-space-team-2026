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
        pt: "Aprovacoes",
      }),
      departments: t({
        en: "Departments",
        pt: "Departamentos",
      }),
      files: t({
        en: "Files",
        pt: "Ficheiros",
      }),
      content: t({
        en: "Content",
        pt: "Conteudo",
      }),
      timeline: t({
        en: "Timeline",
        pt: "Cronologia",
      }),
      projects: t({
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
      settings: t({
        en: "Settings",
        pt: "Definicoes",
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
