import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const fileUploadContent = {
  key: "file-upload",
  content: {
    cv: {
      label: t({
        en: "Curriculum Vitae (CV) *",
        pt: "Curriculum Vitae (CV) *",
      }),
      placeholder: t({
        en: "Drop your CV here",
        pt: "Larga o teu CV aqui",
      }),
    },
    letter: {
      label: t({
        en: "Motivation Letter *",
        pt: "Carta de Motivação *",
      }),
      placeholder: t({
        en: "Drop your letter here",
        pt: "Larga a tua carta aqui",
      }),
    },
    browse: t({
      en: "or click to browse",
      pt: "ou clica para procurar",
    }),
    fileTypes: t({
      en: "PDF, DOC or DOCX (max 5mb)",
      pt: "PDF, DOC ou DOCX (máx 5mb)",
    }),
    remove: t({
      en: "Remove",
      pt: "Remover",
    }),
    validation: {
      invalidType: t({
        en: "Invalid file type. Please upload PDF, DOC or DOCX.",
        pt: "Tipo de ficheiro inválido. Por favor carrega PDF, DOC ou DOCX.",
      }),
      tooLarge: t({
        en: "File too large. Maximum size is 5MB.",
        pt: "Ficheiro demasiado grande. O tamanho máximo é 5MB.",
      }),
    },
    tips: {
      title: t({
        en: "TIPS FOR YOUR MOTIVATION LETTER",
        pt: "DICAS PARA A TUA CARTA DE MOTIVAÇÃO",
      }),
      tip1: t({
        en: "Explain why you're passionate about aerospace and rocketry",
        pt: "Explica porque és apaixonado por aeroespacial e foguetões",
      }),
      tip2: t({
        en: "Describe relevant skills or projects you've worked on",
        pt: "Descreve competências ou projetos relevantes em que trabalhaste",
      }),
      tip3: t({
        en: "Tell us what you hope to learn and contribute to the team",
        pt: "Diz-nos o que esperas aprender e contribuir para a equipa",
      }),
      tip4: t({
        en: "Keep it concise (1-2 pages recommended)",
        pt: "Sê conciso (1-2 páginas recomendado)",
      }),
    },
    back: t({
      en: "Back",
      pt: "Voltar",
    }),
    continue: t({
      en: "Continue",
      pt: "Continuar",
    }),
  },
} satisfies Dictionary;

export default fileUploadContent;
