import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const footerContent = {
  key: "footer",
  content: {
    description: t({
      en: "STUDENT POWER. Aerospace Engineering. REAL IMPACT.",
      pt: "PODER ESTUDANTIL. Engenharia Aeroespacial. IMPACTO REAL.",
    }),
    nav: {
      about: t({
        en: "About",
        pt: "Sobre",
      }),
      project: t({
        en: "Project",
        pt: "Projeto",
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
      contact: t({
        en: "Contact",
        pt: "Contacto",
      }),
    },
    sections: {
      navigation: t({
        en: "Navigation",
        pt: "Navegação",
      }),
      social: t({
        en: "Social",
        pt: "Redes Sociais",
      }),
      legal: t({
        en: "Legal",
        pt: "Legal",
      }),
    },
    legal: {
      privacy: t({
        en: "Privacy Policy",
        pt: "Política de Privacidade",
      }),
      terms: t({
        en: "Terms of Use",
        pt: "Termos de Uso",
      }),
    },
    copyright: t({
      en: "All rights reserved.",
      pt: "Todos os direitos reservados.",
    }),
  },
} satisfies Dictionary;

export default footerContent;
