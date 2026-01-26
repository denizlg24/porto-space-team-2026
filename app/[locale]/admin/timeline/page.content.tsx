import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const timelinePageContent = {
  key: "admin-timeline-page",
  content: {
    title: t({
      en: "Timeline",
      pt: "Cronologia",
    }),
    description: t({
      en: "Manage the timeline items displayed on the About page.",
      pt: "Gerir os itens da cronologia exibidos na página Sobre.",
    }),
    addButton: t({
      en: "Add Timeline Item",
      pt: "Adicionar Item",
    }),
    emptyState: {
      title: t({
        en: "No timeline items",
        pt: "Sem itens na cronologia",
      }),
      description: t({
        en: "Get started by creating your first timeline item.",
        pt: "Comece por criar o primeiro item da cronologia.",
      }),
    },
    form: {
      year: {
        label: t({
          en: "Year",
          pt: "Ano",
        }),
        placeholder: t({
          en: "2024",
          pt: "2024",
        }),
      },
      title: {
        label: t({
          en: "Title",
          pt: "Título",
        }),
        placeholderEn: t({
          en: "Milestone achievement",
          pt: "Milestone achievement",
        }),
        placeholderPt: t({
          en: "Conquista importante",
          pt: "Conquista importante",
        }),
      },
      subtitle: {
        label: t({
          en: "Description",
          pt: "Descrição",
        }),
        placeholderEn: t({
          en: "Brief description of the event",
          pt: "Brief description of the event",
        }),
        placeholderPt: t({
          en: "Breve descrição do evento",
          pt: "Breve descrição do evento",
        }),
      },
      imageUrls: {
        label: t({
          en: "Images",
          pt: "Imagens",
        }),
        description: t({
          en: "Upload one or more images. Multiple images will display as a carousel.",
          pt: "Carregue uma ou mais imagens. Múltiplas imagens serão exibidas em carrossel.",
        }),
      },
      languages: {
        english: t({
          en: "English",
          pt: "Inglês",
        }),
        portuguese: t({
          en: "Portuguese",
          pt: "Português",
        }),
      },
      uploading: t({
        en: "Uploading...",
        pt: "A carregar...",
      }),
      uploadImages: t({
        en: "Upload Images",
        pt: "Carregar Imagens",
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
        en: "Add Timeline Item",
        pt: "Adicionar Item à Cronologia",
      }),
      editTitle: t({
        en: "Edit Timeline Item",
        pt: "Editar Item da Cronologia",
      }),
      deleteTitle: t({
        en: "Delete Timeline Item",
        pt: "Eliminar Item da Cronologia",
      }),
      deleteDescription: t({
        en: "Are you sure you want to delete this timeline item? This action cannot be undone.",
        pt: "Tem certeza de que deseja eliminar este item da cronologia? Esta ação não pode ser desfeita.",
      }),
    },
    toast: {
      createSuccess: t({
        en: "Timeline item created successfully",
        pt: "Item da cronologia criado com sucesso",
      }),
      createError: t({
        en: "Failed to create timeline item",
        pt: "Falha ao criar item da cronologia",
      }),
      updateSuccess: t({
        en: "Timeline item updated successfully",
        pt: "Item da cronologia atualizado com sucesso",
      }),
      updateError: t({
        en: "Failed to update timeline item",
        pt: "Falha ao atualizar item da cronologia",
      }),
      deleteSuccess: t({
        en: "Timeline item deleted successfully",
        pt: "Item da cronologia eliminado com sucesso",
      }),
      deleteError: t({
        en: "Failed to delete timeline item",
        pt: "Falha ao eliminar item da cronologia",
      }),
      reorderSuccess: t({
        en: "Timeline reordered successfully",
        pt: "Cronologia reordenada com sucesso",
      }),
      reorderError: t({
        en: "Failed to reorder timeline",
        pt: "Falha ao reordenar cronologia",
      }),
    },
  },
} satisfies Dictionary;

export default timelinePageContent;
