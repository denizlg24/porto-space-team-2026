import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const usersPageContent = {
  key: "admin-users-page",
  content: {
    title: t({
      en: "Users",
      pt: "Utilizadores",
    }),
    description: t({
      en: "Manage all registered users in the system.",
      pt: "Gerir todos os utilizadores registados no sistema.",
    }),
    searchPlaceholder: t({
      en: "Search by name or email...",
      pt: "Pesquisar por nome ou email...",
    }),
    filters: {
      allStatuses: t({
        en: "All Statuses",
        pt: "Todos os Estados",
      }),
      allDepartments: t({
        en: "All Departments",
        pt: "Todos os Departamentos",
      }),
    },
    table: {
      user: t({
        en: "User",
        pt: "Utilizador",
      }),
      email: t({
        en: "Email",
        pt: "Email",
      }),
      department: t({
        en: "Department",
        pt: "Departamento",
      }),
      status: t({
        en: "Status",
        pt: "Estado",
      }),
      joined: t({
        en: "Joined",
        pt: "Registado",
      }),
      actions: t({
        en: "Actions",
        pt: "Ações",
      }),
      noUsers: t({
        en: "No users found.",
        pt: "Nenhum utilizador encontrado.",
      }),
    },
    status: {
      pending: t({
        en: "Pending",
        pt: "Pendente",
      }),
      approved: t({
        en: "Approved",
        pt: "Aprovado",
      }),
      rejected: t({
        en: "Rejected",
        pt: "Rejeitado",
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
    actions: {
      approve: t({
        en: "Approve",
        pt: "Aprovar",
      }),
      reject: t({
        en: "Reject",
        pt: "Rejeitar",
      }),
      delete: t({
        en: "Delete",
        pt: "Eliminar",
      }),
      changeDepartment: t({
        en: "Change Department",
        pt: "Alterar Departamento",
      }),
      viewDetails: t({
        en: "View Details",
        pt: "Ver Detalhes",
      }),
    },
    confirmDelete: {
      title: t({
        en: "Delete User",
        pt: "Eliminar Utilizador",
      }),
      description: t({
        en: "Are you sure you want to delete this user? This action cannot be undone.",
        pt: "Tem a certeza que deseja eliminar este utilizador? Esta ação não pode ser desfeita.",
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
      approveSuccess: t({
        en: "User approved successfully",
        pt: "Utilizador aprovado com sucesso",
      }),
      rejectSuccess: t({
        en: "User rejected successfully",
        pt: "Utilizador rejeitado com sucesso",
      }),
      deleteSuccess: t({
        en: "User deleted successfully",
        pt: "Utilizador eliminado com sucesso",
      }),
      departmentSuccess: t({
        en: "Department updated successfully",
        pt: "Departamento atualizado com sucesso",
      }),
      error: t({
        en: "An error occurred. Please try again.",
        pt: "Ocorreu um erro. Por favor, tente novamente.",
      }),
    },
  },
} satisfies Dictionary;

export default usersPageContent;
