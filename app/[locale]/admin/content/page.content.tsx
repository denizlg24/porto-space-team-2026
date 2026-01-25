import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const contentPageContent = {
  key: "admin-content-page",
  content: {
    title: t({
      en: "Site Content",
      pt: "Conteúdo do Site",
    }),
    description: t({
      en: "Manage dynamic content across different pages of the website.",
      pt: "Gerir conteúdo dinâmico nas diferentes páginas do website.",
    }),
    tabs: {
      home: t({
        en: "Home Page",
        pt: "Página Inicial",
      }),
    },
    home: {
      title: t({
        en: "Home Page Content",
        pt: "Conteúdo da Página Inicial",
      }),
      description: t({
        en: "Manage the countdown timer and competition information on the home page.",
        pt: "Gerir o temporizador de contagem regressiva e informação da competição na página inicial.",
      }),
      countdownEnabled: {
        label: t({
          en: "Enable Countdown",
          pt: "Ativar Contagem Regressiva",
        }),
        description: t({
          en: "Show the countdown timer on the home page.",
          pt: "Mostrar o temporizador de contagem regressiva na página inicial.",
        }),
      },
      competitionName: {
        label: t({
          en: "Competition Name",
          pt: "Nome da Competição",
        }),
        description: t({
          en: "The name of the competition (e.g., 'EuRoC 2026'). The 'T-Minus to' prefix is added automatically.",
          pt: "O nome da competição (ex: 'EuRoC 2026'). O prefixo 'T-Minus para' é adicionado automaticamente.",
        }),
        placeholder: t({
          en: "EuRoC 2026",
          pt: "EuRoC 2026",
        }),
      },
      competitionDate: {
        label: t({
          en: "Competition Date",
          pt: "Data da Competição",
        }),
        description: t({
          en: "The target date and time for the countdown. Leave empty to show 'No Upcoming Events' message.",
          pt: "A data e hora alvo para a contagem. Deixe vazio para mostrar mensagem 'Sem Eventos Futuros'.",
        }),
        placeholder: t({
          en: "Select date",
          pt: "Selecionar data",
        }),
      },
      quickStats: {
        title: t({
          en: "Quick Stats",
          pt: "Estatísticas Rápidas",
        }),
        description: t({
          en: "Configure the statistics displayed on the home page.",
          pt: "Configurar as estatísticas exibidas na página inicial.",
        }),
        teamMembers: {
          label: t({
            en: "Team Members",
            pt: "Membros da Equipa",
          }),
          placeholder: t({
            en: "70",
            pt: "70",
          }),
        },
        projectsCount: {
          label: t({
            en: "Projects",
            pt: "Projetos",
          }),
          placeholder: t({
            en: "2",
            pt: "2",
          }),
        },
      },
    },
    form: {
      save: t({
        en: "Save Changes",
        pt: "Guardar Alterações",
      }),
      saving: t({
        en: "Saving...",
        pt: "A guardar...",
      }),
      cancel: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
      clear: t({
        en: "Clear",
        pt: "Limpar",
      }),
    },
    toast: {
      success: t({
        en: "Content updated successfully",
        pt: "Conteúdo atualizado com sucesso",
      }),
      error: t({
        en: "Failed to update content. Please try again.",
        pt: "Falha ao atualizar conteúdo. Por favor, tente novamente.",
      }),
    },
  },
} satisfies Dictionary;

export default contentPageContent;
