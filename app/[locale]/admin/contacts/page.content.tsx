import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const adminContactsPageContent = {
  key: "admin-contacts-page",
  content: {
    title: t({
      en: "Contacts",
      pt: "Contactos",
    }),
    description: t({
      en: "Manage contact form submissions and inquiries.",
      pt: "Gira as submissoes do formulario de contacto e consultas.",
    }),
    stats: {
      total: t({
        en: "Total Messages",
        pt: "Total de Mensagens",
      }),
      new: t({
        en: "New",
        pt: "Novas",
      }),
      read: t({
        en: "Read",
        pt: "Lidas",
      }),
      replied: t({
        en: "Replied",
        pt: "Respondidas",
      }),
      archived: t({
        en: "Archived",
        pt: "Arquivadas",
      }),
    },
    table: {
      ticketId: t({
        en: "Ticket ID",
        pt: "ID do Ticket",
      }),
      name: t({
        en: "Name",
        pt: "Nome",
      }),
      email: t({
        en: "Email",
        pt: "Email",
      }),
      subject: t({
        en: "Subject",
        pt: "Assunto",
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
        pt: "Acoes",
      }),
      empty: t({
        en: "No contact messages yet.",
        pt: "Ainda nao ha mensagens de contacto.",
      }),
    },
    subjects: {
      sponsorship: t({
        en: "Sponsorship",
        pt: "Patrocinio",
      }),
      partnership: t({
        en: "Partnership",
        pt: "Parceria",
      }),
      media: t({
        en: "Media & Press",
        pt: "Media",
      }),
      other: t({
        en: "Other",
        pt: "Outro",
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
      replied: t({
        en: "Replied",
        pt: "Respondida",
      }),
      archived: t({
        en: "Archived",
        pt: "Arquivada",
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
      markAsReplied: t({
        en: "Mark as Replied",
        pt: "Marcar como Respondida",
      }),
      archive: t({
        en: "Archive",
        pt: "Arquivar",
      }),
      copyEmail: t({
        en: "Copy Email",
        pt: "Copiar Email",
      }),
    },
    dialog: {
      title: t({
        en: "Contact Details",
        pt: "Detalhes do Contacto",
      }),
      from: t({
        en: "From",
        pt: "De",
      }),
      subject: t({
        en: "Subject",
        pt: "Assunto",
      }),
      message: t({
        en: "Message",
        pt: "Mensagem",
      }),
      received: t({
        en: "Received",
        pt: "Recebido",
      }),
      close: t({
        en: "Close",
        pt: "Fechar",
      }),
      reply: t({
        en: "Reply via Email",
        pt: "Responder via Email",
      }),
    },
  },
} satisfies Dictionary;

export default adminContactsPageContent;
