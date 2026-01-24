import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const approvalsPageContent = {
  key: "admin-approvals-page",
  content: {
    title: t({
      en: "Pending Approvals",
      pt: "Aprovações Pendentes",
    }),
    description: t({
      en: "Review and approve new user registration requests.",
      pt: "Reveja e aprove pedidos de registo de novos utilizadores.",
    }),
    emptyState: {
      title: t({
        en: "No pending approvals",
        pt: "Sem aprovações pendentes",
      }),
      description: t({
        en: "All user registration requests have been processed.",
        pt: "Todos os pedidos de registo foram processados.",
      }),
    },
    card: {
      department: t({
        en: "Department",
        pt: "Departamento",
      }),
      requestedOn: t({
        en: "Requested on",
        pt: "Solicitado em",
      }),
      emailVerified: t({
        en: "Email verified",
        pt: "Email verificado",
      }),
      emailNotVerified: t({
        en: "Email not verified",
        pt: "Email não verificado",
      }),
    },
    actions: {
      approve: t({
        en: "Approve",
        pt: "Aprovar",
      }),
      reject: t({
        en: "Reject",
        pt: "Rejeitar",
      }),
      approving: t({
        en: "Approving...",
        pt: "A aprovar...",
      }),
      rejecting: t({
        en: "Rejecting...",
        pt: "A rejeitar...",
      }),
    },
    confirmReject: {
      title: t({
        en: "Reject User",
        pt: "Rejeitar Utilizador",
      }),
      description: t({
        en: "Are you sure you want to reject this user's registration request?",
        pt: "Tem a certeza que deseja rejeitar o pedido de registo deste utilizador?",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      confirm: t({
        en: "Reject",
        pt: "Rejeitar",
      }),
    },
    departments: {
      propulsion: t({
        en: "Propulsion",
        pt: "Propulsão",
      }),
      structures: t({
        en: "Structures",
        pt: "Estruturas",
      }),
      avionics: t({
        en: "Avionics",
        pt: "Aviónica",
      }),
      recovery: t({
        en: "Recovery",
        pt: "Recuperação",
      }),
      operations: t({
        en: "Operations",
        pt: "Operações",
      }),
      business: t({
        en: "Business",
        pt: "Negócios",
      }),
    },
    toast: {
      approveSuccess: t({
        en: "User approved successfully",
        pt: "Utilizador aprovado com sucesso",
      }),
      rejectSuccess: t({
        en: "User rejected successfully",
        pt: "Utilizador rejeitado com sucesso",
      }),
      error: t({
        en: "An error occurred. Please try again.",
        pt: "Ocorreu um erro. Por favor, tente novamente.",
      }),
    },
    stats: {
      pending: t({
        en: "pending requests",
        pt: "pedidos pendentes",
      }),
    },
  },
} satisfies Dictionary;

export default approvalsPageContent;
