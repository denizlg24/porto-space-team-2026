import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const projectContentPageContent = {
  key: "admin-project-content-page",
  content: {
    backToProjects: t({
      en: "Back to Projects",
      pt: "Voltar aos Projetos",
    }),
    title: t({
      en: "Edit Project Content",
      pt: "Editar Conteudo do Projeto",
    }),
    description: t({
      en: "Manage the detailed content for this project's page.",
      pt: "Gerir o conteudo detalhado da pagina deste projeto.",
    }),
    tabs: {
      hero: t({
        en: "Hero",
        pt: "Hero",
      }),
      stats: t({
        en: "Statistics",
        pt: "Estatisticas",
      }),
      departments: t({
        en: "Departments",
        pt: "Departamentos",
      }),
      image: t({
        en: "Project Image",
        pt: "Imagem do Projeto",
      }),
      media: t({
        en: "Media",
        pt: "Media",
      }),
      sections: t({
        en: "Custom Sections",
        pt: "Secoes Personalizadas",
      }),
    },
    hero: {
      title: t({
        en: "Hero Description",
        pt: "Descricao do Hero",
      }),
      description: t({
        en: "The extended description shown on the project's detail page. Supports multiple paragraphs.",
        pt: "A descricao extendida mostrada na pagina de detalhe do projeto. Suporta multiplos paragrafos.",
      }),
      placeholderEn: t({
        en: "Enter the detailed project description...",
        pt: "Enter the detailed project description...",
      }),
      placeholderPt: t({
        en: "Insira a descricao detalhada do projeto...",
        pt: "Insira a descricao detalhada do projeto...",
      }),
    },
    stats: {
      title: t({
        en: "Project Statistics",
        pt: "Estatisticas do Projeto",
      }),
      description: t({
        en: "Key numbers and metrics for the project.",
        pt: "Numeros e metricas chave do projeto.",
      }),
      addStat: t({
        en: "Add Statistic",
        pt: "Adicionar Estatistica",
      }),
      value: t({
        en: "Value",
        pt: "Valor",
      }),
      valuePlaceholder: t({
        en: "e.g. 50+, 100km, 2024",
        pt: "ex. 50+, 100km, 2024",
      }),
      label: t({
        en: "Label",
        pt: "Etiqueta",
      }),
      labelPlaceholderEn: t({
        en: "e.g. Team Members",
        pt: "e.g. Team Members",
      }),
      labelPlaceholderPt: t({
        en: "ex. Membros da Equipa",
        pt: "ex. Membros da Equipa",
      }),
    },
    projectImage: {
      title: t({
        en: "Project Image",
        pt: "Imagem do Projeto",
      }),
      description: t({
        en: "The main image of the rocket/project shown alongside department cards.",
        pt: "A imagem principal do foguete/projeto mostrada ao lado dos cartoes de departamento.",
      }),
      upload: t({
        en: "Upload Image",
        pt: "Carregar Imagem",
      }),
      altLabel: t({
        en: "Alt Text",
        pt: "Texto Alternativo",
      }),
      altPlaceholderEn: t({
        en: "Describe the image...",
        pt: "Describe the image...",
      }),
      altPlaceholderPt: t({
        en: "Descreva a imagem...",
        pt: "Descreva a imagem...",
      }),
    },
    departments: {
      title: t({
        en: "Departments",
        pt: "Departamentos",
      }),
      description: t({
        en: "The departments working on this project and their contributions.",
        pt: "Os departamentos que trabalham neste projeto e as suas contribuicoes.",
      }),
      addDepartment: t({
        en: "Add Department",
        pt: "Adicionar Departamento",
      }),
      departmentTitle: t({
        en: "Department Title",
        pt: "Titulo do Departamento",
      }),
      departmentTitlePlaceholderEn: t({
        en: "e.g. Propulsion",
        pt: "e.g. Propulsion",
      }),
      departmentTitlePlaceholderPt: t({
        en: "ex. Propulsao",
        pt: "ex. Propulsao",
      }),
      departmentDescription: t({
        en: "Description",
        pt: "Descricao",
      }),
      departmentDescriptionPlaceholderEn: t({
        en: "Describe the department's work...",
        pt: "Describe the department's work...",
      }),
      departmentDescriptionPlaceholderPt: t({
        en: "Descreva o trabalho do departamento...",
        pt: "Descreva o trabalho do departamento...",
      }),
      bulletPoints: t({
        en: "Bullet Points (optional)",
        pt: "Pontos (opcional)",
      }),
      addBulletPoint: t({
        en: "Add Bullet Point",
        pt: "Adicionar Ponto",
      }),
      bulletPointPlaceholderEn: t({
        en: "Key responsibility or achievement...",
        pt: "Key responsibility or achievement...",
      }),
      bulletPointPlaceholderPt: t({
        en: "Responsabilidade ou conquista chave...",
        pt: "Responsabilidade ou conquista chave...",
      }),
      gallery: t({
        en: "Gallery (optional)",
        pt: "Galeria (opcional)",
      }),
      addImage: t({
        en: "Add Image",
        pt: "Adicionar Imagem",
      }),
    },
    media: {
      title: t({
        en: "Project Media",
        pt: "Media do Projeto",
      }),
      description: t({
        en: "Images and videos showcasing the project. These will be displayed in a carousel on the project page.",
        pt: "Imagens e videos que mostram o projeto. Serao exibidos num carrossel na pagina do projeto.",
      }),
      addMedia: t({
        en: "Add Media",
        pt: "Adicionar Media",
      }),
      uploadImage: t({
        en: "Upload Image",
        pt: "Carregar Imagem",
      }),
      uploadVideo: t({
        en: "Upload Video",
        pt: "Carregar Video",
      }),
      videoUrl: t({
        en: "Video URL",
        pt: "URL do Video",
      }),
      videoUrlPlaceholder: t({
        en: "Enter video URL...",
        pt: "Insira o URL do video...",
      }),
      altLabel: t({
        en: "Alt Text / Caption",
        pt: "Texto Alternativo / Legenda",
      }),
      altPlaceholderEn: t({
        en: "Describe this media...",
        pt: "Describe this media...",
      }),
      altPlaceholderPt: t({
        en: "Descreva esta media...",
        pt: "Descreva esta media...",
      }),
      tags: t({
        en: "Tags (optional)",
        pt: "Tags (opcional)",
      }),
      addTag: t({
        en: "Add Tag",
        pt: "Adicionar Tag",
      }),
      tagPlaceholderEn: t({
        en: "e.g. Launch Day",
        pt: "e.g. Launch Day",
      }),
      tagPlaceholderPt: t({
        en: "ex. Dia do Lancamento",
        pt: "ex. Dia do Lancamento",
      }),
      typeImage: t({
        en: "Image",
        pt: "Imagem",
      }),
      typeVideo: t({
        en: "Video",
        pt: "Video",
      }),
    },
    sections: {
      title: t({
        en: "Custom Sections",
        pt: "Secoes Personalizadas",
      }),
      description: t({
        en: "Add custom content sections to the project page. Use sections for detailed information, timelines, stats, and more.",
        pt: "Adicione secoes de conteudo personalizadas a pagina do projeto. Use secoes para informacoes detalhadas, cronologias, estatisticas e mais.",
      }),
      addSection: t({
        en: "Add Section",
        pt: "Adicionar Secao",
      }),
      addBlock: t({
        en: "Add Block",
        pt: "Adicionar Bloco",
      }),
      emptyState: {
        title: t({
          en: "No custom sections yet",
          pt: "Sem secoes personalizadas",
        }),
        description: t({
          en: "Add sections to include additional content on the project page.",
          pt: "Adicione secoes para incluir conteudo adicional na pagina do projeto.",
        }),
      },
      sectionTypes: {
        content: t({
          en: "Content Section",
          pt: "Secao de Conteudo",
        }),
        twoColumn: t({
          en: "Two Column",
          pt: "Duas Colunas",
        }),
        stats: t({
          en: "Statistics",
          pt: "Estatisticas",
        }),
        timeline: t({
          en: "Timeline",
          pt: "Cronologia",
        }),
      },
      sectionDescriptions: {
        content: t({
          en: "Flexible section with any content blocks",
          pt: "Secao flexivel com qualquer bloco de conteudo",
        }),
        twoColumn: t({
          en: "Side by side layout with content blocks",
          pt: "Layout lado a lado com blocos de conteudo",
        }),
        stats: t({
          en: "Display key statistics",
          pt: "Exiba estatisticas principais",
        }),
        timeline: t({
          en: "Chronological list of events",
          pt: "Lista cronologica de eventos",
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
          pt: "Botao",
        }),
        buttonGroup: t({
          en: "Button Group",
          pt: "Grupo de Botoes",
        }),
        spacer: t({
          en: "Spacer",
          pt: "Espacador",
        }),
      },
      blockDescriptions: {
        text: t({
          en: "Heading, paragraph, or label",
          pt: "Titulo, paragrafo ou etiqueta",
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
          pt: "Multiplas imagens em apresentacao",
        }),
        button: t({
          en: "Single clickable button",
          pt: "Botao clicavel unico",
        }),
        buttonGroup: t({
          en: "Multiple buttons together",
          pt: "Multiplos botoes juntos",
        }),
        spacer: t({
          en: "Vertical spacing",
          pt: "Espacamento vertical",
        }),
      },
      text: {
        heading: t({
          en: "Heading",
          pt: "Titulo",
        }),
        paragraph: t({
          en: "Paragraph",
          pt: "Paragrafo",
        }),
        label: t({
          en: "Label",
          pt: "Etiqueta",
        }),
        contentPlaceholderEn: t({
          en: "Enter text in English...",
          pt: "Enter text in English...",
        }),
        contentPlaceholderPt: t({
          en: "Enter text in Portuguese...",
          pt: "Insira o texto em Portugues...",
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
        colors: {
          default: t({
            en: "Default",
            pt: "Padrao",
          }),
          primary: t({
            en: "Primary",
            pt: "Primario",
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
      },
      image: {
        upload: t({
          en: "Upload Image",
          pt: "Carregar Imagem",
        }),
        altPlaceholderEn: t({
          en: "Describe the image...",
          pt: "Describe the image...",
        }),
        altPlaceholderPt: t({
          en: "Descreva a imagem...",
          pt: "Descreva a imagem...",
        }),
        objectFit: {
          cover: t({
            en: "Cover",
            pt: "Cobrir",
          }),
          contain: t({
            en: "Contain",
            pt: "Conter",
          }),
        },
      },
      button: {
        textPlaceholderEn: t({
          en: "Button text in English...",
          pt: "Button text in English...",
        }),
        textPlaceholderPt: t({
          en: "Texto do botao em Portugues...",
          pt: "Texto do botao em Portugues...",
        }),
        urlPlaceholder: t({
          en: "https://example.com",
          pt: "https://exemplo.com",
        }),
        variants: {
          default: t({
            en: "Default",
            pt: "Padrao",
          }),
          outline: t({
            en: "Outline",
            pt: "Contorno",
          }),
          secondary: t({
            en: "Secondary",
            pt: "Secundario",
          }),
          ghost: t({
            en: "Ghost",
            pt: "Fantasma",
          }),
        },
        addButton: t({
          en: "Add Button",
          pt: "Adicionar Botao",
        }),
      },
      carousel: {
        addImage: t({
          en: "Add Image",
          pt: "Adicionar Imagem",
        }),
        noImages: t({
          en: "No images added yet",
          pt: "Nenhuma imagem adicionada",
        }),
      },
      spacer: {
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
            pt: "Medio",
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
      statItem: {
        value: t({
          en: "Value",
          pt: "Valor",
        }),
        valuePlaceholder: t({
          en: "e.g. 50+, 100km",
          pt: "ex. 50+, 100km",
        }),
        label: t({
          en: "Label",
          pt: "Etiqueta",
        }),
        labelPlaceholderEn: t({
          en: "e.g. Team Members",
          pt: "e.g. Team Members",
        }),
        labelPlaceholderPt: t({
          en: "ex. Membros da Equipa",
          pt: "ex. Membros da Equipa",
        }),
        addStat: t({
          en: "Add Statistic",
          pt: "Adicionar Estatistica",
        }),
      },
      timelineItem: {
        year: t({
          en: "Year",
          pt: "Ano",
        }),
        yearPlaceholder: t({
          en: "e.g. 2024",
          pt: "ex. 2024",
        }),
        title: t({
          en: "Title",
          pt: "Titulo",
        }),
        titlePlaceholderEn: t({
          en: "Event title in English...",
          pt: "Event title in English...",
        }),
        titlePlaceholderPt: t({
          en: "Titulo do evento em Portugues...",
          pt: "Titulo do evento em Portugues...",
        }),
        description: t({
          en: "Description",
          pt: "Descricao",
        }),
        descriptionPlaceholderEn: t({
          en: "Event description in English...",
          pt: "Event description in English...",
        }),
        descriptionPlaceholderPt: t({
          en: "Descricao do evento em Portugues...",
          pt: "Descricao do evento em Portugues...",
        }),
        addItem: t({
          en: "Add Timeline Item",
          pt: "Adicionar Item",
        }),
      },
      layout: {
        imageLeft: t({
          en: "Image Left",
          pt: "Imagem a Esquerda",
        }),
        imageRight: t({
          en: "Image Right",
          pt: "Imagem a Direita",
        }),
        leftColumn: t({
          en: "Left Column",
          pt: "Coluna Esquerda",
        }),
        rightColumn: t({
          en: "Right Column",
          pt: "Coluna Direita",
        }),
      },
      dialog: {
        addTitle: t({
          en: "Add Section",
          pt: "Adicionar Secao",
        }),
        editTitle: t({
          en: "Edit Section",
          pt: "Editar Secao",
        }),
        selectType: t({
          en: "Select Section Type",
          pt: "Selecionar Tipo de Secao",
        }),
        selectBlockType: t({
          en: "Select Block Type",
          pt: "Selecionar Tipo de Bloco",
        }),
        save: t({
          en: "Save Section",
          pt: "Guardar Secao",
        }),
        cancel: t({
          en: "Cancel",
          pt: "Cancelar",
        }),
        deleteTitle: t({
          en: "Delete Section",
          pt: "Eliminar Secao",
        }),
        deleteDescription: t({
          en: "Are you sure you want to delete this section? This action cannot be undone.",
          pt: "Tem a certeza que pretende eliminar esta secao? Esta acao nao pode ser desfeita.",
        }),
        deleteConfirm: t({
          en: "Delete",
          pt: "Eliminar",
        }),
      },
    },
    form: {
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
      save: t({
        en: "Save Changes",
        pt: "Guardar Alteracoes",
      }),
      saving: t({
        en: "Saving...",
        pt: "A guardar...",
      }),
      uploading: t({
        en: "Uploading...",
        pt: "A carregar...",
      }),
      unsavedChanges: t({
        en: "You have unsaved changes",
        pt: "Tem alteracoes por guardar",
      }),
      noChanges: t({
        en: "No changes to save",
        pt: "Sem alteracoes para guardar",
      }),
    },
    toast: {
      saveSuccess: t({
        en: "Project content saved successfully",
        pt: "Conteudo do projeto guardado com sucesso",
      }),
      saveError: t({
        en: "Failed to save project content",
        pt: "Falha ao guardar conteudo do projeto",
      }),
    },
    notFound: {
      title: t({
        en: "Project Not Found",
        pt: "Projeto Nao Encontrado",
      }),
      description: t({
        en: "The project you're looking for doesn't exist.",
        pt: "O projeto que procura nao existe.",
      }),
    },
  },
} satisfies Dictionary;

export default projectContentPageContent;
