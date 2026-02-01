import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const adminApplicationsPageContent = {
  key: "admin-applications-page",
  content: {
    title: t({
      en: "Applications",
      pt: "Candidaturas",
    }),
    description: t({
      en: "Manage job applications and recruitment.",
      pt: "Gere candidaturas e recrutamento.",
    }),
    toggle: {
      label: t({
        en: "Accept Applications",
        pt: "Aceitar Candidaturas",
      }),
      statusOpen: t({
        en: "Applications are currently open. New applicants can submit their applications.",
        pt: "As candidaturas estão atualmente abertas. Novos candidatos podem submeter as suas candidaturas.",
      }),
      statusClosed: t({
        en: "Applications are currently closed. The application form is hidden from visitors.",
        pt: "As candidaturas estão atualmente fechadas. O formulário de candidatura está oculto para os visitantes.",
      }),
      openedSuccess: t({
        en: "Applications are now open",
        pt: "As candidaturas estão agora abertas",
      }),
      closedSuccess: t({
        en: "Applications are now closed",
        pt: "As candidaturas estão agora fechadas",
      }),
      error: t({
        en: "Failed to update applications status",
        pt: "Falha ao atualizar o estado das candidaturas",
      }),
    },
    stats: {
      total: t({
        en: "Total Applications",
        pt: "Total de Candidaturas",
      }),
      new: t({
        en: "New",
        pt: "Novas",
      }),
      read: t({
        en: "Read",
        pt: "Lidas",
      }),
      interview: t({
        en: "Interview",
        pt: "Entrevista",
      }),
      accepted: t({
        en: "Accepted",
        pt: "Aceites",
      }),
      rejected: t({
        en: "Rejected",
        pt: "Rejeitadas",
      }),
    },
    table: {
      applicationId: t({
        en: "Application ID",
        pt: "ID da Candidatura",
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
      year: t({
        en: "Year",
        pt: "Ano",
      }),
      status: t({
        en: "Status",
        pt: "Estado",
      }),
      date: t({
        en: "Date",
        pt: "Data",
      }),
      actions: t({
        en: "Actions",
        pt: "Ações",
      }),
      empty: t({
        en: "No applications yet.",
        pt: "Ainda não há candidaturas.",
      }),
      hasAvailability: t({
        en: "Available",
        pt: "Disponível",
      }),
    },
    statuses: {
      new: t({
        en: "New",
        pt: "Nova",
      }),
      read: t({
        en: "Read",
        pt: "Lida",
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
        en: "Rejected",
        pt: "Rejeitada",
      }),
    },
    years: {
      "1": t({
        en: "1st Year",
        pt: "1º Ano",
      }),
      "2": t({
        en: "2nd Year",
        pt: "2º Ano",
      }),
      "3": t({
        en: "3rd Year",
        pt: "3º Ano",
      }),
      "4": t({
        en: "4th Year",
        pt: "4º Ano",
      }),
      "5": t({
        en: "5th Year",
        pt: "5º Ano",
      }),
      "6": t({
        en: "Masters",
        pt: "Mestrado",
      }),
      "7": t({
        en: "PhD",
        pt: "Doutoramento",
      }),
    },
    actions: {
      view: t({
        en: "View Details",
        pt: "Ver Detalhes",
      }),
      markAsRead: t({
        en: "Mark as Read",
        pt: "Marcar como Lida",
      }),
      scheduleInterview: t({
        en: "Schedule Interview",
        pt: "Agendar Entrevista",
      }),
      accept: t({
        en: "Accept",
        pt: "Aceitar",
      }),
      reject: t({
        en: "Reject",
        pt: "Rejeitar",
      }),
      copyEmail: t({
        en: "Copy Email",
        pt: "Copiar Email",
      }),
      downloadCV: t({
        en: "Download CV",
        pt: "Descarregar CV",
      }),
      downloadLetter: t({
        en: "Download Motivation Letter",
        pt: "Descarregar Carta de Motivação",
      }),
      delete: t({
        en: "Delete Application",
        pt: "Eliminar Candidatura",
      }),
    },
    dialog: {
      title: t({
        en: "Application Details",
        pt: "Detalhes da Candidatura",
      }),
      applicant: t({
        en: "Applicant",
        pt: "Candidato",
      }),
      course: t({
        en: "Course",
        pt: "Curso",
      }),
      year: t({
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
      documents: t({
        en: "Documents",
        pt: "Documentos",
      }),
      cv: t({
        en: "Curriculum Vitae",
        pt: "Curriculum Vitae",
      }),
      motivationLetter: t({
        en: "Motivation Letter",
        pt: "Carta de Motivação",
      }),
      notProvided: t({
        en: "Not provided",
        pt: "Não fornecido",
      }),
      close: t({
        en: "Close",
        pt: "Fechar",
      }),
      contactApplicant: t({
        en: "Contact Applicant",
        pt: "Contactar Candidato",
      }),
      openInNewTab: t({
        en: "Open in new tab",
        pt: "Abrir em nova aba",
      }),
      interviewScheduled: t({
        en: "Interview scheduled",
        pt: "Entrevista agendada",
      }),
      meetMeeting: t({
        en: "Google Meet",
        pt: "Google Meet",
      }),
      copyMeetLink: t({
        en: "Copy Link",
        pt: "Copiar Link",
      }),
      joinMeet: t({
        en: "Join",
        pt: "Entrar",
      }),
      availabilitySubmitted: t({
        en: "Applicant's Availability",
        pt: "Disponibilidade do Candidato",
      }),
    },
    interviewDialog: {
      title: t({
        en: "Schedule Interview",
        pt: "Agendar Entrevista",
      }),
      description: t({
        en: "Select a date and time for the interview. An email will be sent to the applicant with the interview details.",
        pt: "Selecione uma data e hora para a entrevista. Um email será enviado ao candidato com os detalhes da entrevista.",
      }),
      applicantAvailability: t({
        en: "Applicant's Availability",
        pt: "Disponibilidade do Candidato",
      }),
      clickToSelect: t({
        en: "Click a time slot to select it",
        pt: "Clique num horário para o selecionar",
      }),
      orCustom: t({
        en: "or enter custom time",
        pt: "ou insira horário personalizado",
      }),
      dateLabel: t({
        en: "Interview Date & Time",
        pt: "Data e Hora da Entrevista",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      confirm: t({
        en: "Schedule & Send Email",
        pt: "Agendar e Enviar Email",
      }),
    },
    deleteDialog: {
      title: t({
        en: "Delete Application",
        pt: "Eliminar Candidatura",
      }),
      description: t({
        en: "This action cannot be undone. The applicant will receive an email informing them that their application has been archived.",
        pt: "Esta ação não pode ser desfeita. O candidato receberá um email a informar que a sua candidatura foi arquivada.",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      confirm: t({
        en: "Delete & Notify",
        pt: "Eliminar e Notificar",
      }),
    },
    toasts: {
      statusUpdated: t({
        en: "Status updated successfully",
        pt: "Estado atualizado com sucesso",
      }),
      statusUpdateFailed: t({
        en: "Failed to update status",
        pt: "Falha ao atualizar estado",
      }),
      interviewScheduled: t({
        en: "Interview scheduled and email sent",
        pt: "Entrevista agendada e email enviado",
      }),
      interviewScheduleFailed: t({
        en: "Failed to schedule interview",
        pt: "Falha ao agendar entrevista",
      }),
      applicationDeleted: t({
        en: "Application deleted and applicant notified",
        pt: "Candidatura eliminada e candidato notificado",
      }),
      applicationDeleteFailed: t({
        en: "Failed to delete application",
        pt: "Falha ao eliminar candidatura",
      }),
      emailCopied: t({
        en: "Email copied to clipboard",
        pt: "Email copiado para a área de transferência",
      }),
      meetLinkCopied: t({
        en: "Meeting link copied to clipboard",
        pt: "Link da reunião copiado para a área de transferência",
      }),
    },
  },
} satisfies Dictionary;

export default adminApplicationsPageContent;
