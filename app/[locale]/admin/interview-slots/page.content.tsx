import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const interviewSlotsPageContent = {
  key: "admin-interview-slots-page",
  content: {
    title: t({
      en: "Interview Slots",
      pt: "Horários de Entrevista",
    }),
    description: t({
      en: "Manage available time slots for applicant interviews. Applicants in the interview stage can book from these slots.",
      pt: "Gerir horários disponíveis para entrevistas. Candidatos em fase de entrevista podem reservar a partir destes horários.",
    }),
    addSlot: {
      title: t({
        en: "Add Interview Slots",
        pt: "Adicionar Horários",
      }),
      date: t({
        en: "Date",
        pt: "Data",
      }),
      startTime: t({
        en: "Start Time",
        pt: "Hora de Início",
      }),
      endTime: t({
        en: "End Time",
        pt: "Hora de Fim",
      }),
      duration: t({
        en: "Duration (minutes)",
        pt: "Duração (minutos)",
      }),
      add: t({
        en: "Add Slot",
        pt: "Adicionar Horário",
      }),
      addMultiple: t({
        en: "Add Multiple Slots",
        pt: "Adicionar Vários Horários",
      }),
    },
    slots: {
      title: t({
        en: "Available Slots",
        pt: "Horários Disponíveis",
      }),
      empty: t({
        en: "No interview slots configured. Add some slots above.",
        pt: "Nenhum horário de entrevista configurado. Adicione alguns horários acima.",
      }),
      available: t({
        en: "Available",
        pt: "Disponível",
      }),
      booked: t({
        en: "Booked",
        pt: "Reservado",
      }),
      delete: t({
        en: "Delete",
        pt: "Eliminar",
      }),
      deleteAll: t({
        en: "Delete All Unbooked",
        pt: "Eliminar Todos Não Reservados",
      }),
    },
    toasts: {
      slotAdded: t({
        en: "Interview slot added",
        pt: "Horário de entrevista adicionado",
      }),
      slotsAdded: t({
        en: "Interview slots added",
        pt: "Horários de entrevista adicionados",
      }),
      slotDeleted: t({
        en: "Interview slot deleted",
        pt: "Horário de entrevista eliminado",
      }),
      allDeleted: t({
        en: "All unbooked slots deleted",
        pt: "Todos os horários não reservados eliminados",
      }),
      error: t({
        en: "An error occurred",
        pt: "Ocorreu um erro",
      }),
    },
  },
} satisfies Dictionary;

export default interviewSlotsPageContent;
