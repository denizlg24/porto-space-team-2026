import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const projectDetailPageContent = {
  key: "project-detail-page",
  content: {
    backToProjects: t({
      en: "Back to Projects",
      pt: "Voltar aos Projetos",
    }),
    stats: {
      label: t({
        en: "// Key Numbers",
        pt: "// Numeros Chave",
      }),
    },
    departments: {
      label: t({
        en: "// Our Teams",
        pt: "// As Nossas Equipas",
      }),
      title: t({
        en: "Department Work",
        pt: "Trabalho dos Departamentos",
      }),
    },
    media: {
      label: t({
        en: "// Gallery",
        pt: "// Galeria",
      }),
      title: t({
        en: "Project Media",
        pt: "Media do Projeto",
      }),
    },
    notFound: {
      title: t({
        en: "Project Not Found",
        pt: "Projeto Nao Encontrado",
      }),
      description: t({
        en: "The project you're looking for doesn't exist or has been removed.",
        pt: "O projeto que procura nao existe ou foi removido.",
      }),
    },
  },
} satisfies Dictionary;

export default projectDetailPageContent;
