import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const personalInfoFormContent = {
  key: "personal-info-form",
  content: {
    fields: {
      name: {
        label: t({
          en: "Full Name *",
          pt: "Nome Completo *",
        }),
        placeholder: t({
          en: "Your full name",
          pt: "O teu nome completo",
        }),
      },
      email: {
        label: t({
          en: "Email *",
          pt: "Email *",
        }),
        placeholder: t({
          en: "your@email.com",
          pt: "o-teu@email.com",
        }),
      },
      course: {
        label: t({
          en: "Course / Degree *",
          pt: "Curso / Grau *",
        }),
        placeholder: t({
          en: "e.g. Aerospace Engineering",
          pt: "ex. Engenharia Aeroespacial",
        }),
      },
      yearOfStudy: {
        label: t({
          en: "Year of Study *",
          pt: "Ano de Estudo *",
        }),
        placeholder: t({
          en: "Select your year",
          pt: "Seleciona o teu ano",
        }),
        options: {
          "1st": t({
            en: "1st Year",
            pt: "1º Ano",
          }),
          "2nd": t({
            en: "2nd Year",
            pt: "2º Ano",
          }),
          "3rd": t({
            en: "3rd Year",
            pt: "3º Ano",
          }),
          "4th": t({
            en: "4th Year",
            pt: "4º Ano",
          }),
          "5th": t({
            en: "5th Year",
            pt: "5º Ano",
          }),
          masters: t({
            en: "Masters",
            pt: "Mestrado",
          }),
          phd: t({
            en: "PhD",
            pt: "Doutoramento",
          }),
        },
      },
      linkedin: {
        label: t({
          en: "LinkedIn (optional)",
          pt: "LinkedIn (opcional)",
        }),
        placeholder: t({
          en: "https://linkedin.com/in/yourprofile",
          pt: "https://linkedin.com/in/o-teu-perfil",
        }),
      },
      github: {
        label: t({
          en: "GitHub / Portfolio (optional)",
          pt: "GitHub / Portfólio (opcional)",
        }),
        placeholder: t({
          en: "https://github.com/yourusername",
          pt: "https://github.com/o-teu-utilizador",
        }),
      },
      experience: {
        label: t({
          en: "Relevant Experience (optional)",
          pt: "Experiência Relevante (opcional)",
        }),
        placeholder: t({
          en: "Describe any relevant projects, skills, or experience that might be useful for the team...",
          pt: "Descreve quaisquer projetos, competências ou experiência relevantes que possam ser úteis para a equipa...",
        }),
        counter: t({
          en: "characters",
          pt: "caracteres",
        }),
      },
    },
    validation: {
      nameMin: t({
        en: "Name must be at least 2 characters",
        pt: "O nome deve ter pelo menos 2 caracteres",
      }),
      nameMax: t({
        en: "Name must be at most 128 characters",
        pt: "O nome deve ter no máximo 128 caracteres",
      }),
      emailInvalid: t({
        en: "Please enter a valid email address",
        pt: "Por favor insere um endereço de email válido",
      }),
      courseMin: t({
        en: "Course/Degree must be at least 2 characters",
        pt: "Curso/Grau deve ter pelo menos 2 caracteres",
      }),
      courseMax: t({
        en: "Course/Degree must be at most 256 characters",
        pt: "Curso/Grau deve ter no máximo 256 caracteres",
      }),
      yearRequired: t({
        en: "Please select your year of study",
        pt: "Por favor seleciona o teu ano de estudo",
      }),
      urlInvalid: t({
        en: "Please enter a valid URL",
        pt: "Por favor insere um URL válido",
      }),
      experienceMax: t({
        en: "Experience must be at most 2000 characters",
        pt: "A experiência deve ter no máximo 2000 caracteres",
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

export default personalInfoFormContent;
