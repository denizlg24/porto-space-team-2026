import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const newsletterPageContent = {
  key: "newsletter-page",
  content: {
    hero: {
      label: t({
        en: "// Mission Dispatches",
        pt: "// Updates da Missão",
      }),
      title: t({
        en: "Our Newsletter",
        pt: "Nossa Newsletter",
      }),
      description: t({
        en: "Monthly updates from mission control. Technical insights, team progress, and behind-the-scenes of building hybrid rockets at the University of Porto.",
        pt: "Atualizações mensais do centro de comando. Insights técnicos, progresso da equipa e bastidores da construção de foguetes híbridos na Universidade do Porto.",
      }),
    },
    subscribe: {
      label: t({
        en: "Join many subscribers to stay informed",
        pt: "Junta-te a vários subscritores para te manteres informado",
      }),
      cta: t({
        en: "Get mission updates delivered to your inbox. No spam, just rockets.",
        pt: "Recebe atualizações da missão diretamente na tua caixa de entrada. Sem spam, só foguetes.",
      }),
      subscribeButton: t({
        en: "Subscribe",
        pt: "Subscrever",
      }),
      emailPlaceholder: t({
        en: "Your email address",
        pt: "O teu endereço de email",
      }),
      unsubscribeButton: t({
        en: "Unsubscribe",
        pt: "Cancelar subscrição",
      }),
    },
    dialog: {
      title: t({
        en: "Join Our Newsletter",
        pt: "Junta-te à Nossa Newsletter",
      }),
      description: t({
        en: "Stay updated with the latest news from Porto Space Team.",
        pt: "Fica atualizado com as últimas novidades da Porto Space Team.",
      }),
      nameLabel: t({
        en: "Name",
        pt: "Nome",
      }),
      namePlaceholder: t({
        en: "Your name",
        pt: "O teu nome",
      }),
      emailLabel: t({
        en: "Email",
        pt: "Email",
      }),
      dateOfBirthLabel: t({
        en: "Date of Birth",
        pt: "Data de Nascimento",
      }),
      dateOfBirthPlaceholder: t({
        en: "Select your date of birth",
        pt: "Seleciona a tua data de nascimento",
      }),
      submitButton: t({
        en: "Subscribe",
        pt: "Subscrever",
      }),
      cancelButton: t({
        en: "Cancel",
        pt: "Cancelar",
      }),
    },
    messages: {
      subscribeSuccess: t({
        en: "Successfully subscribed to the newsletter!",
        pt: "Subscrito com sucesso na newsletter!",
      }),
      unsubscribeSuccess: t({
        en: "Successfully unsubscribed from the newsletter.",
        pt: "Subscrição cancelada com sucesso.",
      }),
      error: t({
        en: "Something went wrong. Please try again.",
        pt: "Algo correu mal. Por favor, tenta novamente.",
      }),
    },
    editions: {
      label: t({
        en: "// Past Editions",
        pt: "// Edições Anteriores",
      }),
      title: t({
        en: "Newsletter Archive",
        pt: "Arquivo de Newsletters",
      }),
      latest: t({
        en: "Latest Edition",
        pt: "Última Edição",
      }),
      pastEditions: t({
        en: "Past Editions",
        pt: "Edições Anteriores",
      }),
      viewPdf: t({
        en: "Read Newsletter",
        pt: "Ler Newsletter",
      }),
      viewAll: t({
        en: "View All Newsletters",
        pt: "Ver Todas as Newsletters",
      }),
      noNewsletters: t({
        en: "No newsletters published yet. Subscribe to be notified when our first edition is released!",
        pt: "Ainda não foram publicadas newsletters. Subscreve para seres notificado quando a primeira edição for lançada!",
      }),
      publishedOn: t({
        en: "Published on",
        pt: "Publicado em",
      }),
      latestTile: t({
        en: "Enjoy our most recent newsletter!",
        pt: "Desfruta da nossa newsletter mais recente!",
      }),
      readNow: t({
        en: "// Read Now",
        pt: "// Ler Agora",
      }),
    },
  },
} satisfies Dictionary;

export default newsletterPageContent;
