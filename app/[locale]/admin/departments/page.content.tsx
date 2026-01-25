import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "admin-departments-page",
  content: {
    title: t({
      en: "Departments",
      pt: "Departamentos",
    }),
    description: t({
      en: "Manage team departments for user registration",
      pt: "Gerir departamentos da equipa para registo de utilizadores",
    }),
    list: {
      title: t({
        en: "All Departments",
        pt: "Todos os Departamentos",
      }),
      description: t({
        en: "Departments available for team members to join",
        pt: "Departamentos disponiveis para os membros da equipa",
      }),
      empty: t({
        en: "No departments created yet. Add your first department to get started.",
        pt: "Ainda nao existem departamentos. Adicione o primeiro departamento para comecar.",
      }),
      dragHint: t({
        en: "Drag to reorder departments",
        pt: "Arraste para reordenar os departamentos",
      }),
    },
    actions: {
      add: t({
        en: "Add Department",
        pt: "Adicionar Departamento",
      }),
      edit: t({
        en: "Edit",
        pt: "Editar",
      }),
      delete: t({
        en: "Delete",
        pt: "Eliminar",
      }),
    },
    dialog: {
      addTitle: t({
        en: "Add Department",
        pt: "Adicionar Departamento",
      }),
      editTitle: t({
        en: "Edit Department",
        pt: "Editar Departamento",
      }),
    },
    form: {
      name: t({
        en: "Department Name",
        pt: "Nome do Departamento",
      }),
      namePlaceholder: t({
        en: "e.g. Propulsion",
        pt: "ex. Propulsao",
      }),
      code: t({
        en: "Department Code",
        pt: "Codigo do Departamento",
      }),
      codePlaceholder: t({
        en: "e.g. PRO",
        pt: "ex. PRO",
      }),
      codeDescription: t({
        en: "A short code (2-5 characters) to identify the department",
        pt: "Um codigo curto (2-5 caracteres) para identificar o departamento",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      save: t({
        en: "Save Changes",
        pt: "Guardar Alteracoes",
      }),
      create: t({
        en: "Create Department",
        pt: "Criar Departamento",
      }),
    },
    confirmDelete: {
      title: t({
        en: "Delete Department",
        pt: "Eliminar Departamento",
      }),
      description: t({
        en: "Are you sure you want to delete this department? This action cannot be undone.",
        pt: "Tem a certeza que deseja eliminar este departamento? Esta acao nao pode ser revertida.",
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
      created: t({
        en: "Department created successfully",
        pt: "Departamento criado com sucesso",
      }),
      updated: t({
        en: "Department updated successfully",
        pt: "Departamento atualizado com sucesso",
      }),
      deleted: t({
        en: "Department deleted successfully",
        pt: "Departamento eliminado com sucesso",
      }),
      reordered: t({
        en: "Departments reordered successfully",
        pt: "Departamentos reordenados com sucesso",
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
