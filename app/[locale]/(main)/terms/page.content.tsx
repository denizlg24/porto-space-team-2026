import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const termsPageContent = {
  key: "terms-page",
  content: {
    hero: {
      label: t({
        en: "// Legal",
        pt: "// Legal",
      }),
      title: t({
        en: "Terms of Service",
        pt: "Termos de Serviço",
      }),
      description: t({
        en: "Please read these terms carefully before using our website and services.",
        pt: "Por favor leia estes termos atentamente antes de utilizar o nosso website e serviços.",
      }),
      lastUpdated: t({
        en: "Last updated: January 2025",
        pt: "Última atualização: Janeiro 2025",
      }),
    },
    acceptance: {
      label: t({
        en: "// Acceptance",
        pt: "// Aceitacao",
      }),
      title: t({
        en: "Acceptance of Terms",
        pt: "Aceitação dos Termos",
      }),
      paragraph1: t({
        en: "By accessing and using the Porto Space Team website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.",
        pt: "Ao aceder e utilizar o website da Porto Space Team, aceita e concorda em ficar vinculado a estes Termos de Serviço. Se não concordar com estes termos, por favor não utilize o nosso website.",
      }),
      paragraph2: t({
        en: "We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.",
        pt: "Reservamo-nos o direito de modificar estes termos a qualquer momento. A utilização continuada do website após alterações constitui aceitação dos novos termos.",
      }),
    },
    use: {
      label: t({
        en: "// Use of Website",
        pt: "// Utilização do Website",
      }),
      title: t({
        en: "Permitted Use",
        pt: "Utilização Permitida",
      }),
      intro: t({
        en: "You agree to use this website only for lawful purposes and in a way that does not:",
        pt: "Concorda em utilizar este website apenas para fins legais e de forma que não:",
      }),
      items: {
        rights: t({
          en: "Infringe the rights of others",
          pt: "Infrinja os direitos de terceiros",
        }),
        restrict: t({
          en: "Restrict or inhibit anyone else's use of the website",
          pt: "Restrinja ou iniba a utilização do website por terceiros",
        }),
        harm: t({
          en: "Attempt to harm, disrupt, or damage the website or its infrastructure",
          pt: "Tente prejudicar, perturbar ou danificar o website ou a sua infraestrutura",
        }),
        illegal: t({
          en: "Violate any applicable laws or regulations",
          pt: "Viole quaisquer leis ou regulamentos aplicáveis",
        }),
      },
    },
    intellectual: {
      label: t({
        en: "// Intellectual Property",
        pt: "// Propriedade Intelectual",
      }),
      title: t({
        en: "Content and Ownership",
        pt: "Conteúdo e Propriedade",
      }),
      paragraph1: t({
        en: "All content on this website, including text, graphics, logos, images, and software, is the property of Porto Space Team or its content suppliers and is protected by intellectual property laws.",
        pt: "Todo o conteúdo deste website, incluindo texto, gráficos, logotipos, imagens e software, é propriedade da Porto Space Team ou dos seus fornecedores de conteúdo e está protegido por leis de propriedade intelectual.",
      }),
      paragraph2: t({
        en: "You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.",
        pt: "Não pode reproduzir, distribuir, modificar ou criar obras derivadas de qualquer conteúdo sem o nosso consentimento prévio por escrito.",
      }),
    },
    services: {
      label: t({
        en: "// Services",
        pt: "// Serviços",
      }),
      title: t({
        en: "Our Services",
        pt: "Os Nossos Serviços",
      }),
      newsletter: {
        title: t({
          en: "Newsletter",
          pt: "Newsletter",
        }),
        description: t({
          en: "By subscribing to our newsletter, you consent to receive periodic emails about Porto Space Team activities, events, and news. You can unsubscribe at any time.",
          pt: "Ao subscrever a nossa newsletter, consente em receber emails periódicos sobre atividades, eventos e notícias da Porto Space Team. Pode cancelar a subscrição a qualquer momento.",
        }),
      },
      contact: {
        title: t({
          en: "Contact Form",
          pt: "Formulário de Contacto",
        }),
        description: t({
          en: "When submitting inquiries through our contact form, you agree to provide accurate information and understand that we may use this information to respond to your inquiry.",
          pt: "Ao submeter consultas através do nosso formulário de contacto, concorda em fornecer informações precisas e compreende que podemos utilizar estas informações para responder a sua consulta.",
        }),
      },
      membership: {
        title: t({
          en: "Membership Applications",
          pt: "Candidaturas de Membro",
        }),
        description: t({
          en: "Applications to join Porto Space Team are subject to review and approval. Submission of an application does not guarantee membership.",
          pt: "As candidaturas para aderir a Porto Space Team estão sujeitas a revisão e aprovação. A submissão de uma candidatura não garante a adesão.",
        }),
      },
    },
    disclaimer: {
      label: t({
        en: "// Disclaimer",
        pt: "// Aviso Legal",
      }),
      title: t({
        en: "Limitation of Liability",
        pt: "Limitação de Responsabilidade",
      }),
      paragraph1: t({
        en: "The information on this website is provided on an 'as is' basis. Porto Space Team makes no warranties, expressed or implied, and disclaims all other warranties including implied warranties of merchantability or fitness for a particular purpose.",
        pt: "A informação neste website é fornecida numa base 'tal como está'. A Porto Space Team não oferece garantias, expressas ou implícitas, e renuncia a todas as outras garantias, incluindo garantias implícitas de comercialização ou adequação a um propósito específico.",
      }),
      paragraph2: t({
        en: "In no event shall Porto Space Team be liable for any damages arising out of the use or inability to use the website or its content.",
        pt: "Em caso algum a Porto Space Team será responsável por quaisquer danos decorrentes da utilização ou incapacidade de utilizar o website ou o seu conteúdo.",
      }),
    },
    links: {
      label: t({
        en: "// External Links",
        pt: "// Links Externos",
      }),
      title: t({
        en: "Third-Party Links",
        pt: "Links de Terceiros",
      }),
      description: t({
        en: "Our website may contain links to third-party websites. These links are provided for convenience only. Porto Space Team has no control over the content of these sites and is not responsible for their content or privacy practices.",
        pt: "O nosso website pode conter links para websites de terceiros. Estes links são fornecidos apenas por conveniência. A Porto Space Team não tem controlo sobre o conteúdo destes sites e não é responsável pelo seu conteúdo ou práticas de privacidade.",
      }),
    },
    governing: {
      label: t({
        en: "// Governing Law",
        pt: "// País Legal",
      }),
      title: t({
        en: "Applicable Law",
        pt: "Lei Aplicável",
      }),
      description: t({
        en: "These terms shall be governed by and construed in accordance with the laws of Portugal. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Portugal.",
        pt: "Estes termos serão regidos e interpretados de acordo com as leis de Portugal. Quaisquer disputas relativas a estes termos estarão sujeitas a jurisdição exclusiva dos tribunais de Portugal.",
      }),
    },
    contact: {
      label: t({
        en: "// Contact",
        pt: "// Contacto",
      }),
      title: t({
        en: "Questions About Terms",
        pt: "Questões sobre os Termos",
      }),
      description: t({
        en: "If you have any questions about these Terms of Service, please contact us.",
        pt: "Se tiver alguma questão sobre estes Termos de Serviço, por favor contacte-nos.",
      }),
    },
  },
} satisfies Dictionary;

export default termsPageContent;
