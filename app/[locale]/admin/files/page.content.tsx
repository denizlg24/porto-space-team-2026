import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const filesPageContent = {
  key: "admin-files-page",
  content: {
    title: t({
      en: "Files",
      pt: "Ficheiros",
    }),
    description: t({
      en: "Manage uploaded files and media.",
      pt: "Gerir ficheiros e media carregados.",
    }),
    searchPlaceholder: t({
      en: "Search files...",
      pt: "Pesquisar ficheiros...",
    }),
    upload: t({
      en: "Upload File",
      pt: "Carregar Ficheiro",
    }),
    table: {
      preview: t({
        en: "Preview",
        pt: "Pré-visualização",
      }),
      file: t({
        en: "File",
        pt: "Ficheiro",
      }),
      uploadedBy: t({
        en: "Uploaded By",
        pt: "Carregado Por",
      }),
      uploadedAt: t({
        en: "Uploaded At",
        pt: "Data de Upload",
      }),
      actions: t({
        en: "Actions",
        pt: "Ações",
      }),
      noFiles: t({
        en: "No files found.",
        pt: "Nenhum ficheiro encontrado.",
      }),
    },
    actions: {
      copy: t({
        en: "Copy URL",
        pt: "Copiar URL",
      }),
      open: t({
        en: "Open in New Tab",
        pt: "Abrir em Nova Aba",
      }),
      delete: t({
        en: "Delete",
        pt: "Eliminar",
      }),
    },
    confirmDelete: {
      title: t({
        en: "Delete File",
        pt: "Eliminar Ficheiro",
      }),
      description: t({
        en: "Are you sure you want to delete this file? This action cannot be undone.",
        pt: "Tem a certeza que deseja eliminar este ficheiro? Esta ação não pode ser desfeita.",
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
        en: "File uploaded successfully",
        pt: "Ficheiro carregado com sucesso",
      }),
      deleteSuccess: t({
        en: "File deleted successfully",
        pt: "Ficheiro eliminado com sucesso",
      }),
      copySuccess: t({
        en: "URL copied to clipboard",
        pt: "URL copiado para a área de transferência",
      }),
      error: t({
        en: "An error occurred. Please try again.",
        pt: "Ocorreu um erro. Por favor, tente novamente.",
      }),
    },
    preview: {
      noPreview: t({
        en: "No preview",
        pt: "Sem pré-visualização",
      }),
      image: t({
        en: "Image",
        pt: "Imagem",
      }),
      video: t({
        en: "Video",
        pt: "Vídeo",
      }),
      audio: t({
        en: "Audio",
        pt: "Áudio",
      }),
      document: t({
        en: "Document",
        pt: "Documento",
      }),
    },
  },
} satisfies Dictionary;

export default filesPageContent;
