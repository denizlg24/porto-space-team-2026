import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const projectsPageContent = {
  key: "projects-page",
  content: {
    hero: {
      label: t({
        en: "// Our Work",
        pt: "// O Nosso Trabalho",
      }),
      title: t({
        en: "Our Projects",
        pt: "Os Nossos Projetos",
      }),
      description: t({
        en: "From hybrid rockets to nanosatellites, discover the cutting-edge aerospace projects our team is developing.",
        pt: "Desde foguetes híbridos a nanossatélites, descubra os projetos aeroespaciais de vanguarda que a nossa equipa está a desenvolver.",
      }),
    },
    projects: {
      label: t({
        en: "// Active Projects",
        pt: "// Projetos Ativos",
      }),
      title: t({
        en: "What We're Building",
        pt: "O Que Estamos a Construir",
      }),
      empty: t({
        en: "Projects are coming soon. Stay tuned!",
        pt: "Os projetos estão a chegar em breve. Fica atento!",
      }),
      learnMore: t({
        en: "Learn more",
        pt: "Saber mais",
      }),
    },
  },
} satisfies Dictionary;

export default projectsPageContent;
