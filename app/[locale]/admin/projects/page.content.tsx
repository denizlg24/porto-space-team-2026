import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const projectsPageContent = {
  key: "admin-projects-page",
  content: {
    title: t({
      en: "Projects",
      pt: "Projetos",
    }),
    description: t({
      en: "Manage the projects displayed on the Projects page.",
      pt: "Gerir os projetos exibidos na pagina Projetos.",
    }),
    addButton: t({
      en: "Add Project",
      pt: "Adicionar Projeto",
    }),
    emptyState: {
      title: t({
        en: "No projects",
        pt: "Sem projetos",
      }),
      description: t({
        en: "Get started by creating your first project.",
        pt: "Comece por criar o primeiro projeto.",
      }),
    },
    form: {
      name: {
        label: t({
          en: "Name",
          pt: "Nome",
        }),
        placeholderEn: t({
          en: "Project name",
          pt: "Project name",
        }),
        placeholderPt: t({
          en: "Nome do projeto",
          pt: "Nome do projeto",
        }),
      },
      description: {
        label: t({
          en: "Description",
          pt: "Descricao",
        }),
        placeholderEn: t({
          en: "Brief description of the project",
          pt: "Brief description of the project",
        }),
        placeholderPt: t({
          en: "Breve descricao do projeto",
          pt: "Breve descricao do projeto",
        }),
      },
      logo: {
        label: t({
          en: "Logo",
          pt: "Logo",
        }),
        description: t({
          en: "Upload a logo image for the project.",
          pt: "Carregue uma imagem de logo para o projeto.",
        }),
      },
      languages: {
        english: t({
          en: "English",
          pt: "Ingles",
        }),
        portuguese: t({
          en: "Portuguese",
          pt: "Portugues",
        }),
      },
      uploading: t({
        en: "Uploading...",
        pt: "A carregar...",
      }),
      uploadLogo: t({
        en: "Upload Logo",
        pt: "Carregar Logo",
      }),
      save: t({
        en: "Save",
        pt: "Guardar",
      }),
      saving: t({
        en: "Saving...",
        pt: "A guardar...",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      delete: t({
        en: "Delete",
        pt: "Eliminar",
      }),
      deleting: t({
        en: "Deleting...",
        pt: "A eliminar...",
      }),
      edit: t({
        en: "Edit",
        pt: "Editar",
      }),
    },
    dialog: {
      addTitle: t({
        en: "Add Project",
        pt: "Adicionar Projeto",
      }),
      editTitle: t({
        en: "Edit Project",
        pt: "Editar Projeto",
      }),
      deleteTitle: t({
        en: "Delete Project",
        pt: "Eliminar Projeto",
      }),
      deleteDescription: t({
        en: "Are you sure you want to delete this project? This action cannot be undone.",
        pt: "Tem certeza de que deseja eliminar este projeto? Esta acao nao pode ser desfeita.",
      }),
    },
    visibility: {
      visible: t({
        en: "Visible",
        pt: "Visivel",
      }),
      hidden: t({
        en: "Hidden",
        pt: "Oculto",
      }),
    },
    toast: {
      createSuccess: t({
        en: "Project created successfully",
        pt: "Projeto criado com sucesso",
      }),
      createError: t({
        en: "Failed to create project",
        pt: "Falha ao criar projeto",
      }),
      updateSuccess: t({
        en: "Project updated successfully",
        pt: "Projeto atualizado com sucesso",
      }),
      updateError: t({
        en: "Failed to update project",
        pt: "Falha ao atualizar projeto",
      }),
      deleteSuccess: t({
        en: "Project deleted successfully",
        pt: "Projeto eliminado com sucesso",
      }),
      deleteError: t({
        en: "Failed to delete project",
        pt: "Falha ao eliminar projeto",
      }),
      reorderSuccess: t({
        en: "Projects reordered successfully",
        pt: "Projetos reordenados com sucesso",
      }),
      reorderError: t({
        en: "Failed to reorder projects",
        pt: "Falha ao reordenar projetos",
      }),
      visibilitySuccess: t({
        en: "Project visibility updated",
        pt: "Visibilidade do projeto atualizada",
      }),
      visibilityError: t({
        en: "Failed to update visibility",
        pt: "Falha ao atualizar visibilidade",
      }),
    },
  },
} satisfies Dictionary;

export default projectsPageContent;
