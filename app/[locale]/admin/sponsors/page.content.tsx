import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const sponsorsPageContent = {
  key: "admin-sponsors-page",
  content: {
    title: t({
      en: "Sponsors",
      pt: "Patrocinadores",
    }),
    description: t({
      en: "Manage sponsor categories and sponsors.",
      pt: "Gerir categorias de patrocinadores e patrocinadores.",
    }),
    tabs: {
      categories: t({
        en: "Categories",
        pt: "Categorias",
      }),
      sponsors: t({
        en: "Sponsors",
        pt: "Patrocinadores",
      }),
    },
    categories: {
      title: t({
        en: "Categories",
        pt: "Categorias",
      }),
      description: t({
        en: "Organize sponsors into hierarchical categories.",
        pt: "Organize patrocinadores em categorias hierárquicas.",
      }),
      addCategory: t({
        en: "Add Category",
        pt: "Adicionar Categoria",
      }),
      empty: t({
        en: "No categories yet. Create your first category to get started.",
        pt: "Ainda não há categorias. Crie a primeira categoria para começar.",
      }),
      dragHint: t({
        en: "Drag to reorder categories",
        pt: "Arraste para reordenar categorias",
      }),
    },
    sponsors: {
      title: t({
        en: "Sponsors",
        pt: "Patrocinadores",
      }),
      description: t({
        en: "Manage individual sponsors and their details.",
        pt: "Gerir patrocinadores individuais e os seus detalhes.",
      }),
      addSponsor: t({
        en: "Add Sponsor",
        pt: "Adicionar Patrocinador",
      }),
      empty: t({
        en: "No sponsors yet. Add your first sponsor to get started.",
        pt: "Ainda não há patrocinadores. Adicione o primeiro patrocinador para começar.",
      }),
      noCategoriesHint: t({
        en: "Create a category first before adding sponsors.",
        pt: "Crie uma categoria primeiro antes de adicionar patrocinadores.",
      }),
      filterByCategory: t({
        en: "Filter by category",
        pt: "Filtrar por categoria",
      }),
      allCategories: t({
        en: "All categories",
        pt: "Todas as categorias",
      }),
    },
    form: {
      name: t({
        en: "Name",
        pt: "Nome",
      }),
      namePlaceholder: t({
        en: "Enter name",
        pt: "Introduza o nome",
      }),
      category: t({
        en: "Category",
        pt: "Categoria",
      }),
      selectCategory: t({
        en: "Select a category",
        pt: "Selecione uma categoria",
      }),
      link: t({
        en: "Website Link",
        pt: "Link do Website",
      }),
      linkPlaceholder: t({
        en: "https://example.com",
        pt: "https://exemplo.com",
      }),
      image: t({
        en: "Logo Image",
        pt: "Imagem do Logo",
      }),
      imagePlaceholder: t({
        en: "Select or upload an image",
        pt: "Selecione ou carregue uma imagem",
      }),
      description: t({
        en: "Description",
        pt: "Descrição",
      }),
      descriptionPlaceholder: t({
        en: "Brief description of what they do or their contribution",
        pt: "Breve descrição do que fazem ou da sua contribuição",
      }),
      project: t({
        en: "Associated Project",
        pt: "Projeto Associado",
      }),
      selectProject: t({
        en: "Select a project (optional)",
        pt: "Selecione um projeto (opcional)",
      }),
      noProject: t({
        en: "No project",
        pt: "Sem projeto",
      }),
      titleStyle: t({
        en: "Title Style",
        pt: "Estilo do Título",
      }),
      fontSize: t({
        en: "Font Size",
        pt: "Tamanho da Fonte",
      }),
      fontWeight: t({
        en: "Font Weight",
        pt: "Peso da Fonte",
      }),
      color: t({
        en: "Color",
        pt: "Cor",
      }),
      colorLight: t({
        en: "Light Theme",
        pt: "Tema Claro",
      }),
      colorDark: t({
        en: "Dark Theme",
        pt: "Tema Escuro",
      }),
      preview: t({
        en: "Preview",
        pt: "Pré-visualização",
      }),
      save: t({
        en: "Save",
        pt: "Guardar",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      create: t({
        en: "Create",
        pt: "Criar",
      }),
    },
    actions: {
      edit: t({
        en: "Edit",
        pt: "Editar",
      }),
      delete: t({
        en: "Delete",
        pt: "Eliminar",
      }),
      viewSite: t({
        en: "Visit Website",
        pt: "Visitar Website",
      }),
    },
    confirmDelete: {
      categoryTitle: t({
        en: "Delete Category",
        pt: "Eliminar Categoria",
      }),
      categoryDescription: t({
        en: "Are you sure you want to delete this category? This action cannot be undone.",
        pt: "Tem a certeza que deseja eliminar esta categoria? Esta ação não pode ser desfeita.",
      }),
      sponsorTitle: t({
        en: "Delete Sponsor",
        pt: "Eliminar Patrocinador",
      }),
      sponsorDescription: t({
        en: "Are you sure you want to delete this sponsor? This action cannot be undone.",
        pt: "Tem a certeza que deseja eliminar este patrocinador? Esta ação não pode ser desfeita.",
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
      categoryCreated: t({
        en: "Category created successfully",
        pt: "Categoria criada com sucesso",
      }),
      categoryUpdated: t({
        en: "Category updated successfully",
        pt: "Categoria atualizada com sucesso",
      }),
      categoryDeleted: t({
        en: "Category deleted successfully",
        pt: "Categoria eliminada com sucesso",
      }),
      categoryHasSponsors: t({
        en: "Cannot delete category with sponsors",
        pt: "Não é possível eliminar categoria com patrocinadores",
      }),
      sponsorCreated: t({
        en: "Sponsor created successfully",
        pt: "Patrocinador criado com sucesso",
      }),
      sponsorUpdated: t({
        en: "Sponsor updated successfully",
        pt: "Patrocinador atualizado com sucesso",
      }),
      sponsorDeleted: t({
        en: "Sponsor deleted successfully",
        pt: "Patrocinador eliminado com sucesso",
      }),
      reorderSuccess: t({
        en: "Order updated successfully",
        pt: "Ordem atualizada com sucesso",
      }),
      error: t({
        en: "An error occurred. Please try again.",
        pt: "Ocorreu um erro. Por favor, tente novamente.",
      }),
      uploadSuccess: t({
        en: "Image uploaded successfully",
        pt: "Imagem carregada com sucesso",
      }),
    },
    fontWeights: {
      normal: t({
        en: "Normal",
        pt: "Normal",
      }),
      medium: t({
        en: "Medium",
        pt: "Médio",
      }),
      semibold: t({
        en: "Semi Bold",
        pt: "Semi Negrito",
      }),
      bold: t({
        en: "Bold",
        pt: "Negrito",
      }),
      extrabold: t({
        en: "Extra Bold",
        pt: "Extra Negrito",
      }),
    },
  },
} satisfies Dictionary;

export default sponsorsPageContent;
