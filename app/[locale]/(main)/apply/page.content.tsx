import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const applyPageContent = {
  key: "apply-page",
  content: {
    hero: {
      tag: t({
        en: "// JOIN THE MISSION",
        pt: "// JUNTA-TE À MISSÃO",
      }),
      title: t({
        en: "Launch Your",
        pt: "Impulsiona a Tua",
      }),
      titleHighlight: t({
        en: "Career",
        pt: "Carreira",
      }),
      description: t({
        en: "No prior rocketry experience required. Just bring your curiosity, dedication, and willingness to learn.",
        pt: "Não é necessária experiência prévia em foguetões. Traz apenas a tua curiosidade, dedicação e vontade de aprender.",
      }),
      contactLink: t({
        en: "Looking for the",
        pt: "Procuras o",
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
          pt: "Escolhe o Teu Departamento",
        }),
        description: t({
          en: "Select one or more departments you'd like to join. You can apply to multiple areas.",
          pt: "Seleciona um ou mais departamentos aos quais gostarias de te juntar. Podes candidatar-te a múltiplas áreas.",
        }),
      },
      step2: {
        title: t({
          en: "Upload Documents",
          pt: "Carregar Documentos",
        }),
        description: t({
          en: "Please upload your CV and a motivation letter explaining why you want to join Porto Space Team.",
          pt: "Por favor carrega o teu CV e uma carta de motivação explicando porque queres juntar-te à Porto Space Team.",
        }),
      },
      step3: {
        title: t({
          en: "Personal Information",
          pt: "Informação Pessoal",
        }),
        description: t({
          en: "Almost there! Just a few more details about yourself.",
          pt: "Quase lá! Apenas mais alguns detalhes sobre ti.",
        }),
      },
      step4: {
        title: t({
          en: "Review & Submit",
          pt: "Rever & Submeter",
        }),
        description: t({
          en: "Please review your application before submitting.",
          pt: "Por favor revê a tua candidatura antes de submeter.",
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
    applicationStatus: {
      alreadyApplied: t({
        en: "Already Applied?",
        pt: "Já te candidataste?",
      }),
      label: t({
        en: "// APPLICATION STATUS",
        pt: "// ESTADO DA CANDIDATURA",
      }),
      description: t({
        en: "Check the status of your application by entering your application ID below.",
        pt: "Verifica o estado da tua candidatura inserindo o ID da tua candidatura abaixo.",
      }),
      search: t({
        en: "Search",
        pt: "Pesquisar",
      }),
      notFound: t({
        en: "Application not found. Please check your application ID.",
        pt: "Candidatura não encontrada. Por favor verifica o ID da candidatura.",
      }),
      rateLimited: t({
        en: "Too many requests. Please wait before trying again.",
        pt: "Demasiadas tentativas. Por favor aguarda antes de tentar novamente.",
      }),
    },
    statusPage: {
      title: t({
        en: "Application Status",
        pt: "Estado da Candidatura",
      }),
      applicationId: t({
        en: "Application ID",
        pt: "ID da Candidatura",
      }),
      submittedOn: t({
        en: "Submitted on",
        pt: "Submetido em",
      }),
      course: t({
        en: "Course",
        pt: "Curso",
      }),
      roadmap: {
        title: t({
          en: "Application Progress",
          pt: "Progresso da Candidatura",
        }),
        new: t({
          en: "Submitted",
          pt: "Submetida",
        }),
        read: t({
          en: "Under Review",
          pt: "Em Análise",
        }),
        interview: t({
          en: "Interview",
          pt: "Entrevista",
        }),
        accepted: t({
          en: "Accepted",
          pt: "Aceite",
        }),
        rejected: t({
          en: "Not Selected",
          pt: "Não Selecionado",
        }),
        newDesc: t({
          en: "Your application has been received",
          pt: "A tua candidatura foi recebida",
        }),
        readDesc: t({
          en: "Our team is reviewing your application",
          pt: "A nossa equipa está a analisar a tua candidatura",
        }),
        interviewDesc: t({
          en: "You've been selected for an interview",
          pt: "Foste selecionado para entrevista",
        }),
        acceptedDesc: t({
          en: "Welcome to the team!",
          pt: "Bem-vindo à equipa!",
        }),
        rejectedDesc: t({
          en: "Thank you for your interest",
          pt: "Obrigado pelo teu interesse",
        }),
      },
      interview: {
        scheduled: t({
          en: "Interview Scheduled",
          pt: "Entrevista Agendada",
        }),
        date: t({
          en: "Date & Time",
          pt: "Data & Hora",
        }),
        meetLink: t({
          en: "Meeting Link",
          pt: "Link da Reunião",
        }),
        copyLink: t({
          en: "Copy Link",
          pt: "Copiar Link",
        }),
        joinMeeting: t({
          en: "Join Meeting",
          pt: "Entrar na Reunião",
        }),
        linkCopied: t({
          en: "Meeting link copied to clipboard",
          pt: "Link da reunião copiado",
        }),
        booking: {
          title: t({
            en: "Book Your Interview",
            pt: "Agenda a Tua Entrevista",
          }),
          description: t({
            en: "Select a time slot that works best for you. Once confirmed, you'll receive a meeting link via email.",
            pt: "Seleciona um horário que te seja conveniente. Após confirmação, receberás um link da reunião por email.",
          }),
          noSlots: t({
            en: "No available time slots at the moment. Please check back later.",
            pt: "Não há horários disponíveis de momento. Por favor volta mais tarde.",
          }),
          confirm: t({
            en: "Confirm Interview",
            pt: "Confirmar Entrevista",
          }),
          booked: t({
            en: "Interview booked successfully! Check your email for the meeting link.",
            pt: "Entrevista agendada com sucesso! Verifica o teu email para o link da reunião.",
          }),
        },
      },
      documents: {
        title: t({
          en: "Documents",
          pt: "Documentos",
        }),
        cv: t({
          en: "CV / Resume",
          pt: "CV / Currículo",
        }),
        motivationLetter: t({
          en: "Motivation Letter",
          pt: "Carta de Motivação",
        }),
        view: t({
          en: "View",
          pt: "Ver",
        }),
        update: t({
          en: "Update",
          pt: "Atualizar",
        }),
        upload: t({
          en: "Upload New",
          pt: "Carregar Novo",
        }),
        updated: t({
          en: "Document updated successfully",
          pt: "Documento atualizado com sucesso",
        }),
      },
      backToSearch: t({
        en: "Search Another Application",
        pt: "Pesquisar Outra Candidatura",
      }),
    },
    closed: {
      title: t({
        en: "Applications Currently Closed",
        pt: "Candidaturas Atualmente Fechadas",
      }),
      description: t({
        en: "We are not accepting applications at this time. Please check back later or follow us on social media for updates on when applications will reopen.",
        pt: "Não estamos a aceitar candidaturas neste momento. Por favor volta mais tarde ou segue-nos nas redes sociais para atualizações sobre quando as candidaturas reabrirão.",
      }),
    },
  },
} satisfies Dictionary;

export default applyPageContent;
