import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const competitionsPageContent = {
  key: "admin-competitions-page",
  content: {
    title: t({
      en: "Competitions",
      pt: "Competições",
    }),
    description: t({
      en: "Build the competitions page with a visual editor. Add sections with flexible content blocks.",
      pt: "Construa a página de competições com um editor visual. Adicione secções com blocos de conteúdo flexíveis.",
    }),
    addSection: t({
      en: "Add Section",
      pt: "Adicionar Secção",
    }),
    addBlock: t({
      en: "Add Block",
      pt: "Adicionar Bloco",
    }),
    emptyState: {
      title: t({
        en: "No sections yet",
        pt: "Sem secções ainda",
      }),
      description: t({
        en: "Start building your competitions page by adding sections.",
        pt: "Comece a construir a página de competições adicionando secções.",
      }),
    },
    sectionTypes: {
      content: t({
        en: "Content Section",
        pt: "Secção de Conteúdo",
      }),
      twoColumn: t({
        en: "Two Column",
        pt: "Duas Colunas",
      }),
      stats: t({
        en: "Statistics",
        pt: "Estatísticas",
      }),
      timeline: t({
        en: "Timeline",
        pt: "Cronologia",
      }),
    },
    sectionDescriptions: {
      content: t({
        en: "Flexible section with any content blocks",
        pt: "Secção flexível com qualquer bloco de conteúdo",
      }),
      twoColumn: t({
        en: "Side by side layout with content blocks",
        pt: "Layout lado a lado com blocos de conteúdo",
      }),
      stats: t({
        en: "Display key statistics",
        pt: "Exiba estatísticas principais",
      }),
      timeline: t({
        en: "Chronological list of events",
        pt: "Lista cronológica de eventos",
      }),
    },
    blockTypes: {
      text: t({
        en: "Text",
        pt: "Texto",
      }),
      image: t({
        en: "Image",
        pt: "Imagem",
      }),
      imageFrame: t({
        en: "Framed Image",
        pt: "Imagem com Moldura",
      }),
      carousel: t({
        en: "Carousel",
        pt: "Carrossel",
      }),
      button: t({
        en: "Button",
        pt: "Botão",
      }),
      buttonGroup: t({
        en: "Button Group",
        pt: "Grupo de Botões",
      }),
      spacer: t({
        en: "Spacer",
        pt: "Espaçador",
      }),
    },
    blockDescriptions: {
      text: t({
        en: "Heading, paragraph, or label",
        pt: "Título, parágrafo ou etiqueta",
      }),
      image: t({
        en: "Simple image",
        pt: "Imagem simples",
      }),
      imageFrame: t({
        en: "Image with decorative frame",
        pt: "Imagem com moldura decorativa",
      }),
      carousel: t({
        en: "Multiple images in a slideshow",
        pt: "Múltiplas imagens em apresentação",
      }),
      button: t({
        en: "Single clickable button",
        pt: "Botão clicável único",
      }),
      buttonGroup: t({
        en: "Multiple buttons together",
        pt: "Múltiplos botões juntos",
      }),
      spacer: t({
        en: "Vertical spacing",
        pt: "Espaçamento vertical",
      }),
    },
    form: {
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
      text: {
        textType: t({
          en: "Text Type",
          pt: "Tipo de Texto",
        }),
        heading: t({
          en: "Heading",
          pt: "Título",
        }),
        paragraph: t({
          en: "Paragraph",
          pt: "Parágrafo",
        }),
        label: t({
          en: "Label",
          pt: "Etiqueta",
        }),
        content: t({
          en: "Content",
          pt: "Conteúdo",
        }),
        contentPlaceholderEn: t({
          en: "Enter text in English...",
          pt: "Enter text in English...",
        }),
        contentPlaceholderPt: t({
          en: "Enter text in Portuguese...",
          pt: "Insira o texto em Português...",
        }),
        size: t({
          en: "Size",
          pt: "Tamanho",
        }),
        align: t({
          en: "Alignment",
          pt: "Alinhamento",
        }),
        left: t({
          en: "Left",
          pt: "Esquerda",
        }),
        center: t({
          en: "Center",
          pt: "Centro",
        }),
        right: t({
          en: "Right",
          pt: "Direita",
        }),
        color: t({
          en: "Color",
          pt: "Cor",
        }),
        colors: {
          default: t({
            en: "Default",
            pt: "Padrão",
          }),
          primary: t({
            en: "Primary",
            pt: "Primário",
          }),
          muted: t({
            en: "Muted",
            pt: "Suave",
          }),
          accent: t({
            en: "Accent",
            pt: "Destaque",
          }),
          destructive: t({
            en: "Destructive",
            pt: "Destrutivo",
          }),
        },
        bold: t({
          en: "Bold",
          pt: "Negrito",
        }),
      },
      image: {
        upload: t({
          en: "Upload Image",
          pt: "Carregar Imagem",
        }),
        uploading: t({
          en: "Uploading...",
          pt: "A carregar...",
        }),
        alt: t({
          en: "Alt Text",
          pt: "Texto Alternativo",
        }),
        altPlaceholderEn: t({
          en: "Describe the image in English...",
          pt: "Describe the image in English...",
        }),
        altPlaceholderPt: t({
          en: "Describe the image in Portuguese...",
          pt: "Descreva a imagem em Português...",
        }),
        aspectRatio: t({
          en: "Aspect Ratio",
          pt: "Proporção",
        }),
        objectFit: t({
          en: "Object Fit",
          pt: "Ajuste da Imagem",
        }),
        objectFitOptions: {
          cover: t({
            en: "Cover",
            pt: "Cobrir",
          }),
          contain: t({
            en: "Contain",
            pt: "Conter",
          }),
          fill: t({
            en: "Fill",
            pt: "Preencher",
          }),
          none: t({
            en: "None",
            pt: "Nenhum",
          }),
        },
        maxWidth: t({
          en: "Max Width",
          pt: "Largura Máxima",
        }),
        rounded: t({
          en: "Rounded Corners",
          pt: "Cantos Arredondados",
        }),
      },
      button: {
        text: t({
          en: "Button Text",
          pt: "Texto do Botão",
        }),
        textPlaceholderEn: t({
          en: "Enter button text in English...",
          pt: "Enter button text in English...",
        }),
        textPlaceholderPt: t({
          en: "Enter button text in Portuguese...",
          pt: "Insira o texto do botão em Português...",
        }),
        url: t({
          en: "URL",
          pt: "URL",
        }),
        urlPlaceholder: t({
          en: "https://example.com",
          pt: "https://exemplo.com",
        }),
        variant: t({
          en: "Style",
          pt: "Estilo",
        }),
        size: t({
          en: "Size",
          pt: "Tamanho",
        }),
        addButton: t({
          en: "Add Button",
          pt: "Adicionar Botão",
        }),
        fullWidth: t({
          en: "Full Width",
          pt: "Largura Total",
        }),
      },
      carousel: {
        image: t({
          en: "Image",
          pt: "Imagem",
        }),
        changeImage: t({
          en: "Change",
          pt: "Alterar",
        }),
        addImage: t({
          en: "Add Image",
          pt: "Adicionar Imagem",
        }),
      },
      spacer: {
        size: t({
          en: "Spacer Size",
          pt: "Tamanho do Espaçador",
        }),
        sizes: {
          xs: t({
            en: "Extra Small",
            pt: "Extra Pequeno",
          }),
          sm: t({
            en: "Small",
            pt: "Pequeno",
          }),
          md: t({
            en: "Medium",
            pt: "Médio",
          }),
          lg: t({
            en: "Large",
            pt: "Grande",
          }),
          xl: t({
            en: "Extra Large",
            pt: "Extra Grande",
          }),
          "2xl": t({
            en: "2X Large",
            pt: "2X Grande",
          }),
        },
      },
      stat: {
        value: t({
          en: "Value",
          pt: "Valor",
        }),
        valuePlaceholder: t({
          en: "e.g., 50+",
          pt: "ex., 50+",
        }),
        label: t({
          en: "Label",
          pt: "Etiqueta",
        }),
        labelPlaceholderEn: t({
          en: "e.g., Team Members",
          pt: "e.g., Team Members",
        }),
        labelPlaceholderPt: t({
          en: "e.g., Membros da Equipa",
          pt: "ex., Membros da Equipa",
        }),
        addStat: t({
          en: "Add Statistic",
          pt: "Adicionar Estatística",
        }),
      },
      timelineItem: {
        year: t({
          en: "Year",
          pt: "Ano",
        }),
        yearPlaceholder: t({
          en: "e.g., 2024",
          pt: "ex., 2024",
        }),
        title: t({
          en: "Title",
          pt: "Título",
        }),
        titlePlaceholderEn: t({
          en: "Event title in English...",
          pt: "Event title in English...",
        }),
        titlePlaceholderPt: t({
          en: "Event title in Portuguese...",
          pt: "Título do evento em Português...",
        }),
        description: t({
          en: "Description",
          pt: "Descrição",
        }),
        descriptionPlaceholderEn: t({
          en: "Event description in English...",
          pt: "Event description in English...",
        }),
        descriptionPlaceholderPt: t({
          en: "Event description in Portuguese...",
          pt: "Descrição do evento em Português...",
        }),
        addItem: t({
          en: "Add Timeline Item",
          pt: "Adicionar Item",
        }),
      },
      layout: {
        label: t({
          en: "Layout",
          pt: "Layout",
        }),
        leftFirst: t({
          en: "Left First",
          pt: "Esquerda Primeiro",
        }),
        rightFirst: t({
          en: "Right First",
          pt: "Direita Primeiro",
        }),
      },
      fullWidth: t({
        en: "Full Width",
        pt: "Largura Total",
      }),
      sectionAlign: t({
        en: "Section Alignment",
        pt: "Alinhamento da Secção",
      }),
      leftColumn: t({
        en: "Left Column",
        pt: "Coluna Esquerda",
      }),
      rightColumn: t({
        en: "Right Column",
        pt: "Coluna Direita",
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
    },
    dialog: {
      addTitle: t({
        en: "Add Section",
        pt: "Adicionar Secção",
      }),
      editTitle: t({
        en: "Edit Section",
        pt: "Editar Secção",
      }),
      deleteTitle: t({
        en: "Delete Section",
        pt: "Eliminar Secção",
      }),
      deleteDescription: t({
        en: "Are you sure you want to delete this section? This action cannot be undone.",
        pt: "Tem certeza de que deseja eliminar esta secção? Esta ação não pode ser desfeita.",
      }),
      selectType: t({
        en: "Select Section Type",
        pt: "Selecionar Tipo de Secção",
      }),
      selectBlockType: t({
        en: "Select Block Type",
        pt: "Selecionar Tipo de Bloco",
      }),
    },
    toast: {
      createSuccess: t({
        en: "Section created successfully",
        pt: "Secção criada com sucesso",
      }),
      createError: t({
        en: "Failed to create section",
        pt: "Falha ao criar secção",
      }),
      updateSuccess: t({
        en: "Section updated successfully",
        pt: "Secção atualizada com sucesso",
      }),
      updateError: t({
        en: "Failed to update section",
        pt: "Falha ao atualizar secção",
      }),
      deleteSuccess: t({
        en: "Section deleted successfully",
        pt: "Secção eliminada com sucesso",
      }),
      deleteError: t({
        en: "Failed to delete section",
        pt: "Falha ao eliminar secção",
      }),
      reorderSuccess: t({
        en: "Sections reordered successfully",
        pt: "Secções reordenadas com sucesso",
      }),
      reorderError: t({
        en: "Failed to reorder sections",
        pt: "Falha ao reordenar secções",
      }),
      visibilitySuccess: t({
        en: "Visibility updated",
        pt: "Visibilidade atualizada",
      }),
      visibilityError: t({
        en: "Failed to update visibility",
        pt: "Falha ao atualizar visibilidade",
      }),
    },
    actions: {
      edit: t({
        en: "Edit",
        pt: "Editar",
      }),
      duplicate: t({
        en: "Duplicate",
        pt: "Duplicar",
      }),
      hide: t({
        en: "Hide",
        pt: "Ocultar",
      }),
      show: t({
        en: "Show",
        pt: "Mostrar",
      }),
      moveUp: t({
        en: "Move Up",
        pt: "Mover para Cima",
      }),
      moveDown: t({
        en: "Move Down",
        pt: "Mover para Baixo",
      }),
    },
    preview: {
      title: t({
        en: "Preview",
        pt: "Pré-visualização",
      }),
      description: t({
        en: "See how your page will look to visitors",
        pt: "Veja como a sua página ficará para os visitantes",
      }),
      showPreview: t({
        en: "Show Preview",
        pt: "Mostrar Pré-visualização",
      }),
      hidePreview: t({
        en: "Hide Preview",
        pt: "Ocultar Pré-visualização",
      }),
      language: t({
        en: "Preview Language",
        pt: "Idioma da Pré-visualização",
      }),
      emptyState: t({
        en: "Add sections to see the preview",
        pt: "Adicione secções para ver a pré-visualização",
      }),
    },
  },
} satisfies Dictionary;

export default competitionsPageContent;
