import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const applyPageContent = {
  key: "apply-page",
  content: {
    hero: {
      tag: t({
        en: "// JOIN THE MISSION",
        pt: "// JUNTE-SE À MISSÃO",
      }),
      title: t({
        en: "Launch Your",
        pt: "Impulsione a Sua",
      }),
      titleHighlight: t({
        en: "Career",
        pt: "Carreira",
      }),
      description: t({
        en: "No prior rocketry experience required. Just bring your curiosity, dedication, and willingness to learn.",
        pt: "Não é necessária experiência prévia em foguetões. Traga apenas a sua curiosidade, dedicação e vontade de aprender.",
      }),
      contactLink: t({
        en: "Looking for the",
        pt: "Procura o",
      }),
      contactLinkText: t({
        en: "contact form?",
        pt: "formulário de contacto?",
      }),
    },
    steps: {
      step1: {
        title: t({
          en: "Choose Your Department",
          pt: "Escolha o Seu Departamento",
        }),
        description: t({
          en: "Select one or more departments you'd like to join. You can apply to multiple areas.",
          pt: "Selecione um ou mais departamentos aos quais gostaria de se juntar. Pode candidatar-se a múltiplas áreas.",
        }),
      },
      step2: {
        title: t({
          en: "Upload Documents",
          pt: "Carregar Documentos",
        }),
        description: t({
          en: "Please upload your CV and a motivation letter explaining why you want to join Porto Space Team.",
          pt: "Por favor carregue o seu CV e uma carta de motivação explicando porque quer juntar-se à Porto Space Team.",
        }),
      },
      step3: {
        title: t({
          en: "Personal Information",
          pt: "Informação Pessoal",
        }),
        description: t({
          en: "Almost there! Just a few more details about yourself.",
          pt: "Quase lá! Apenas mais alguns detalhes sobre si.",
        }),
      },
      step4: {
        title: t({
          en: "Review & Submit",
          pt: "Rever & Submeter",
        }),
        description: t({
          en: "Please review your application before submitting.",
          pt: "Por favor reveja a sua candidatura antes de submeter.",
        }),
      },
    },
    stepLabels: {
      step1: t({
        en: "Select Department",
        pt: "Escolher Departamento",
      }),
      step2: t({
        en: "Upload Documents",
        pt: "Carregar Documentos",
      }),
      step3: t({
        en: "Personal Info",
        pt: "Info Pessoal",
      }),
      step4: t({
        en: "Review & Submit",
        pt: "Rever & Submeter",
      }),
    },
  },
} satisfies Dictionary;

export default applyPageContent;
