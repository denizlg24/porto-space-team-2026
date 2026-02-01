import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const applicationReviewContent = {
  key: "application-review",
  content: {
    sections: {
      departments: {
        title: t({
          en: "Selected Departments",
          pt: "Departamentos Selecionados",
        }),
        edit: t({
          en: "Edit",
          pt: "Editar",
        }),
      },
      documents: {
        title: t({
          en: "Uploaded Documents",
          pt: "Documentos Carregados",
        }),
        cv: t({
          en: "CV",
          pt: "CV",
        }),
        motivationLetter: t({
          en: "Motivation Letter",
          pt: "Carta de Motivação",
        }),
      },
      personalInfo: {
        title: t({
          en: "Personal Information",
          pt: "Informação Pessoal",
        }),
        name: t({
          en: "Name",
          pt: "Nome",
        }),
        email: t({
          en: "Email",
          pt: "Email",
        }),
        course: t({
          en: "Course",
          pt: "Curso",
        }),
        yearOfStudy: t({
          en: "Year of Study",
          pt: "Ano de Estudo",
        }),
        linkedin: t({
          en: "LinkedIn",
          pt: "LinkedIn",
        }),
        github: t({
          en: "GitHub / Portfolio",
          pt: "GitHub / Portfólio",
        }),
        experience: t({
          en: "Relevant Experience",
          pt: "Experiência Relevante",
        }),
        notProvided: t({
          en: "Not provided",
          pt: "Não fornecido",
        }),
      },
    },
    consent: {
      label: t({
        en: "I confirm that all information provided is accurate and I agree to the processing of my personal data for the purpose of this application.",
        pt: "Confirmo que todas as informações fornecidas são precisas e concordo com o processamento dos meus dados pessoais para fins desta candidatura.",
      }),
    },
    back: t({
      en: "Back",
      pt: "Voltar",
    }),
    submit: t({
      en: "Submit Application",
      pt: "Submeter Candidatura",
    }),
    submitting: t({
      en: "Submitting...",
      pt: "A submeter...",
    }),
    success: {
      title: t({
        en: "Application Submitted!",
        pt: "Candidatura Submetida!",
      }),
      description: t({
        en: "Thank you for applying to Porto Space Team. We have received your application and will review it carefully.",
        pt: "Obrigado por te candidatares à Porto Space Team. Recebemos a tua candidatura e iremos analisá-la cuidadosamente.",
      }),
      applicationIdLabel: t({
        en: "Your application ID:",
        pt: "O teu ID de candidatura:",
      }),
      emailNote: t({
        en: "A confirmation email has been sent to your inbox.",
        pt: "Um email de confirmação foi enviado para a tua caixa de entrada.",
      }),
      nextSteps: {
        title: t({
          en: "What's Next?",
          pt: "Próximos Passos?",
        }),
        step1: t({
          en: "Our team will review your application",
          pt: "A nossa equipa irá analisar a tua candidatura",
        }),
        step2: t({
          en: "We may contact you for an interview",
          pt: "Poderemos contactar-te para uma entrevista",
        }),
        step3: t({
          en: "You'll receive our decision via email",
          pt: "Receberás a nossa decisão por email",
        }),
      },
      applyAgain: t({
        en: "Submit Another Application",
        pt: "Submeter Outra Candidatura",
      }),
    },
    error: {
      title: t({
        en: "Something Went Wrong",
        pt: "Algo Correu Mal",
      }),
      description: t({
        en: "We could not submit your application. Please try again.",
        pt: "Não foi possível submeter a tua candidatura. Por favor tenta novamente.",
      }),
      tryAgain: t({
        en: "Try Again",
        pt: "Tentar Novamente",
      }),
    },
  },
} satisfies Dictionary;

export default applicationReviewContent;
