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
