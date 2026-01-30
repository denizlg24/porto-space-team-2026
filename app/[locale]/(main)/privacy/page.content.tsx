import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const privacyPageContent = {
  key: "privacy-page",
  content: {
    hero: {
      label: t({
        en: "// Legal",
        pt: "// Legal",
      }),
      title: t({
        en: "Privacy Policy",
        pt: "Politica de Privacidade",
      }),
      description: t({
        en: "Your privacy matters to us. This policy explains how we handle your data.",
        pt: "A sua privacidade é importante para nós. Esta política explica como tratamos os seus dados.",
      }),
      lastUpdated: t({
        en: "Last updated: January 2025",
        pt: "Última atualização: Janeiro 2025",
      }),
    },
    overview: {
      label: t({
        en: "// Overview",
        pt: "// Visao Geral",
      }),
      title: t({
        en: "Our Commitment to Privacy",
        pt: "O Nosso Compromisso com a Privacidade",
      }),
      paragraph1: t({
        en: "Porto Space Team is committed to protecting your privacy. We collect minimal data and only when necessary to provide our services.",
        pt: "A Porto Space Team está comprometida em proteger a sua privacidade. Recolhemos dados mínimos e apenas quando necessário para fornecer os nossos serviços.",
      }),
      paragraph2: t({
        en: "By default, browsing our website does not require any personal data collection. We do not use tracking cookies or analytics that identify individual users.",
        pt: "Por defeito, navegar no nosso website não requer qualquer recolha de dados pessoais. Não utilizamos cookies de tracking ou analíticas que identifiquem utilizadores individuais.",
      }),
    },
    dataCollection: {
      label: t({
        en: "// Data Collection",
        pt: "// Recolha de Dados",
      }),
      title: t({
        en: "What Data We Collect",
        pt: "Que Dados Recolhemos",
      }),
      intro: t({
        en: "We only collect personal data when you voluntarily provide it through specific services:",
        pt: "Apenas recolhemos dados pessoais quando os fornece voluntariamente através de serviços específicos:",
      }),
      newsletter: {
        title: t({
          en: "Newsletter Subscription",
          pt: "Subscrição da Newsletter",
        }),
        description: t({
          en: "When you subscribe to our newsletter, we collect:",
          pt: "Quando subscreve a nossa newsletter, recolhemos:",
        }),
        items: {
          name: t({
            en: "Your name",
            pt: "O seu nome",
          }),
          email: t({
            en: "Your email address",
            pt: "O seu endereço de email",
          }),
          dob: t({
            en: "Your date of birth",
            pt: "A sua data de nascimento",
          }),
        },
        purpose: t({
          en: "This information is used solely to send you updates about Porto Space Team activities, events, and news.",
          pt: "Esta informação é utilizada exclusivamente para lhe enviar atualizações sobre atividades, eventos e notícias da Porto Space Team.",
        }),
      },
      contact: {
        title: t({
          en: "Contact Form",
          pt: "Formulario de Contacto",
        }),
        description: t({
          en: "When you submit a message through our contact form, we store your message and contact details to respond to your inquiry.",
          pt: "Quando envia uma mensagem através do nosso formulário de contacto, armazenamos a sua mensagem e dados de contacto para responder à sua consulta.",
        }),
      },
      join: {
        title: t({
          en: "Membership Applications",
          pt: "Candidaturas de Membro",
        }),
        description: t({
          en: "When you apply to join Porto Space Team, we collect and store your application information to process your membership request.",
          pt: "Quando se candidata a membro da Porto Space Team, recolhemos e armazenamos as informações da sua candidatura para processar o seu pedido de adesão.",
        }),
      },
    },
    cookies: {
      label: t({
        en: "// Cookies",
        pt: "// Cookies",
      }),
      title: t({
        en: "Cookies We Use",
        pt: "Cookies que Utilizamos",
      }),
      intro: t({
        en: "We use only essential cookies that are necessary for the website to function properly:",
        pt: "Utilizamos apenas cookies essenciais que são necessários para o funcionamento correto do website:",
      }),
      theme: {
        title: t({
          en: "Theme Preference",
          pt: "Preferência de Tema",
        }),
        description: t({
          en: "Stores your light/dark mode preference for a consistent browsing experience.",
          pt: "Armazena a sua preferência de modo claro/escuro para uma experiência de navegação consistente.",
        }),
      },
      token: {
        title: t({
          en: "Newsletter Token",
          pt: "Token da Newsletter",
        }),
        description: t({
          en: "If you are subscribed to our newsletter, a token is stored to verify your subscription status.",
          pt: "Se estiver subscrito na nossa newsletter, é armazenado um token para verificar o estado da sua subscrição.",
        }),
      },
      noCookies: t({
        en: "We do not use advertising cookies, tracking cookies, or third-party analytics cookies.",
        pt: "Não utilizamos cookies de publicidade, cookies de tracking ou cookies de analítica de terceiros.",
      }),
    },
    rights: {
      label: t({
        en: "// Your Rights",
        pt: "// Os Seus Direitos",
      }),
      title: t({
        en: "Your Data Rights",
        pt: "Os Seus Direitos sobre os Dados",
      }),
      intro: t({
        en: "Under GDPR and applicable data protection laws, you have the right to:",
        pt: "Ao abrigo do RGPD e das leis de proteção de dados aplicáveis, tem o direito de:",
      }),
      items: {
        access: t({
          en: "Access the personal data we hold about you",
          pt: "Aceder aos dados pessoais que temos sobre si",
        }),
        rectification: t({
          en: "Request correction of inaccurate data",
          pt: "Solicitar a correção de dados incorretos",
        }),
        erasure: t({
          en: "Request deletion of your personal data",
          pt: "Solicitar a eliminação dos seus dados pessoais",
        }),
        restriction: t({
          en: "Request restriction of processing",
          pt: "Solicitar a restrição do tratamento",
        }),
        portability: t({
          en: "Request data portability",
          pt: "Solicitar a portabilidade dos dados",
        }),
        object: t({
          en: "Object to processing of your data",
          pt: "Opor-se ao tratamento dos seus dados",
        }),
      },
      unsubscribe: t({
        en: "You can unsubscribe from our newsletter at any time using the unsubscribe link in any email or through the unsubscribe page on our website.",
        pt: "Pode cancelar a subscrição da nossa newsletter a qualquer momento usando o link de cancelamento em qualquer email ou através da página de cancelamento no nosso website.",
      }),
    },
    contact: {
      label: t({
        en: "// Contact Us",
        pt: "// Contacte-nos",
      }),
      title: t({
        en: "Questions About Privacy",
        pt: "Questões sobre Privacidade",
      }),
      description: t({
        en: "If you have any questions about this privacy policy or how we handle your data, please contact us.",
        pt: "Se tiver alguma questão sobre esta política de privacidade ou sobre como tratamos os seus dados, por favor contacte-nos.",
      }),
    },
  },
} satisfies Dictionary;

export default privacyPageContent;
