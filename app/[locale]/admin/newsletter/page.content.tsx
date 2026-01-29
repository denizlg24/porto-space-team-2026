import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const adminNewsletterPageContent = {
  key: "admin-newsletter-page",
  content: {
    title: t({
      en: "Newsletter Management",
      pt: "Gestão da Newsletter",
    }),
    description: t({
      en: "Manage newsletters and subscribers.",
      pt: "Gerir newsletters e subscritores.",
    }),
    tabs: {
      newsletters: t({
        en: "Newsletters",
        pt: "Newsletters",
      }),
      subscribers: t({
        en: "Subscribers",
        pt: "Subscritores",
      }),
    },
    newsletters: {
      title: t({
        en: "Newsletters",
        pt: "Newsletters",
      }),
      upload: t({
        en: "Upload Newsletter",
        pt: "Carregar Newsletter",
      }),
      uploadDescription: t({
        en: "Upload a PDF newsletter and add a title.",
        pt: "Carregue uma newsletter em PDF e adicione um título.",
      }),
      titleLabelEn: t({
        en: "Title (English)",
        pt: "Título (Inglês)",
      }),
      titleLabelPt: t({
        en: "Title (Portuguese)",
        pt: "Título (Português)",
      }),
      titlePlaceholderEn: t({
        en: "Newsletter title in English...",
        pt: "Título da newsletter em inglês...",
      }),
      titlePlaceholderPt: t({
        en: "Newsletter title in Portuguese...",
        pt: "Título da newsletter em português...",
      }),
      fileLabel: t({
        en: "PDF File",
        pt: "Ficheiro PDF",
      }),
      filePlaceholder: t({
        en: "Select a PDF file",
        pt: "Selecione um ficheiro PDF",
      }),
      uploadButton: t({
        en: "Upload",
        pt: "Carregar",
      }),
      table: {
        title: t({
          en: "Title",
          pt: "Título",
        }),
        file: t({
          en: "File",
          pt: "Ficheiro",
        }),
        status: t({
          en: "Status",
          pt: "Estado",
        }),
        sentCount: t({
          en: "Sent To",
          pt: "Enviado a",
        }),
        createdAt: t({
          en: "Created",
          pt: "Criado em",
        }),
        actions: t({
          en: "Actions",
          pt: "Ações",
        }),
        noNewsletters: t({
          en: "No newsletters found.",
          pt: "Nenhuma newsletter encontrada.",
        }),
      },
      status: {
        draft: t({
          en: "Draft",
          pt: "Rascunho",
        }),
        sent: t({
          en: "Sent",
          pt: "Enviado",
        }),
      },
      actions: {
        view: t({
          en: "View PDF",
          pt: "Ver PDF",
        }),
        send: t({
          en: "Send to Subscribers",
          pt: "Enviar para Subscritores",
        }),
        delete: t({
          en: "Delete",
          pt: "Eliminar",
        }),
      },
      sendDialog: {
        title: t({
          en: "Send Newsletter",
          pt: "Enviar Newsletter",
        }),
        description: t({
          en: "Write a message to include in the email. Subscribers will receive this message along with a link to view the newsletter.",
          pt: "Escreva uma mensagem para incluir no email. Os subscritores receberão esta mensagem junto com um link para ver a newsletter.",
        }),
        contentLabel: t({
          en: "Email Message",
          pt: "Mensagem do Email",
        }),
        contentPlaceholder: t({
          en: "Write your message here...",
          pt: "Escreva a sua mensagem aqui...",
        }),
        preview: t({
          en: "Preview Email",
          pt: "Pré-visualizar Email",
        }),
        cancel: t({
          en: "Cancel",
          pt: "Cancelar",
        }),
        send: t({
          en: "Send to All Subscribers",
          pt: "Enviar para Todos os Subscritores",
        }),
        sending: t({
          en: "Sending...",
          pt: "A enviar...",
        }),
        subscribersCount: t({
          en: "subscribers",
          pt: "subscritores",
        }),
      },
      confirmDelete: {
        title: t({
          en: "Delete newsletter?",
          pt: "Eliminar newsletter?",
        }),
        description: t({
          en: "This action cannot be undone. This will permanently delete the newsletter.",
          pt: "Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a newsletter.",
        }),
        cancel: t({
          en: "Cancel",
          pt: "Cancelar",
        }),
        confirm: t({
          en: "Delete",
          pt: "Eliminar",
        }),
      },
      toast: {
        uploadSuccess: t({
          en: "Newsletter uploaded successfully",
          pt: "Newsletter carregada com sucesso",
        }),
        deleteSuccess: t({
          en: "Newsletter deleted successfully",
          pt: "Newsletter eliminada com sucesso",
        }),
        sendSuccess: t({
          en: "Newsletter sent successfully",
          pt: "Newsletter enviada com sucesso",
        }),
        error: t({
          en: "An error occurred",
          pt: "Ocorreu um erro",
        }),
      },
    },
    subscribers: {
      searchPlaceholder: t({
        en: "Search by name or email...",
        pt: "Pesquisar por nome ou email...",
      }),
      filters: {
        allStatuses: t({
          en: "All statuses",
          pt: "Todos os estados",
        }),
        subscribed: t({
          en: "Subscribed",
          pt: "Subscrito",
        }),
        unsubscribed: t({
          en: "Unsubscribed",
          pt: "Cancelado",
        }),
      },
      table: {
        subscriber: t({
          en: "Subscriber",
          pt: "Subscritor",
        }),
        dateOfBirth: t({
          en: "Date of Birth",
          pt: "Data de Nascimento",
        }),
        status: t({
          en: "Status",
          pt: "Estado",
        }),
        subscribedAt: t({
          en: "Subscribed",
          pt: "Subscrito em",
        }),
        actions: t({
          en: "Actions",
          pt: "Ações",
        }),
        noSubscribers: t({
          en: "No subscribers found.",
          pt: "Nenhum subscritor encontrado.",
        }),
      },
      status: {
        subscribed: t({
          en: "Subscribed",
          pt: "Subscrito",
        }),
        unsubscribed: t({
          en: "Unsubscribed",
          pt: "Cancelado",
        }),
      },
      actions: {
        delete: t({
          en: "Delete",
          pt: "Eliminar",
        }),
      },
      confirmDelete: {
        title: t({
          en: "Delete subscriber?",
          pt: "Eliminar subscritor?",
        }),
        description: t({
          en: "This action cannot be undone. This will permanently delete the subscriber from the database.",
          pt: "Esta ação não pode ser desfeita. Isto irá eliminar permanentemente o subscritor da base de dados.",
        }),
        cancel: t({
          en: "Cancel",
          pt: "Cancelar",
        }),
        confirm: t({
          en: "Delete",
          pt: "Eliminar",
        }),
      },
      toast: {
        deleteSuccess: t({
          en: "Subscriber deleted successfully",
          pt: "Subscritor eliminado com sucesso",
        }),
        error: t({
          en: "An error occurred",
          pt: "Ocorreu um erro",
        }),
      },
      stats: {
        total: t({
          en: "Total",
          pt: "Total",
        }),
        active: t({
          en: "Active",
          pt: "Ativos",
        }),
        unsubscribed: t({
          en: "Unsubscribed",
          pt: "Cancelados",
        }),
      },
    },
  },
} satisfies Dictionary;

export default adminNewsletterPageContent;
