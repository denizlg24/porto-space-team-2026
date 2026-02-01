import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const contactFormContent = {
  key: "contact-form",
  content: {
    fields: {
      name: {
        label: t({
          en: "Your Name",
          pt: "O Teu Nome",
        }),
        placeholder: t({
          en: "Your name",
          pt: "O teu nome",
        }),
      },
      email: {
        label: t({
          en: "Your Email",
          pt: "O Teu Email",
        }),
        placeholder: t({
          en: "Your email",
          pt: "O teu email",
        }),
      },
      subject: {
        label: t({
          en: "Subject",
          pt: "Assunto",
        }),
        placeholder: t({
          en: "Select a subject",
          pt: "Seleciona um assunto",
        }),
        options: {
          sponsorship: t({
            en: "Sponsorship Inquiry",
            pt: "Pedido de Patrocínio",
          }),
          partnership: t({
            en: "Academic Collaboration",
            pt: "Colaboração Académica",
          }),
          media: t({
            en: "Media & Press",
            pt: "Media e Imprensa",
          }),
          other: t({
            en: "Other",
            pt: "Outro",
          }),
        },
      },
      message: {
        label: t({
          en: "Message",
          pt: "Mensagem",
        }),
        placeholder: t({
          en: "Tell us more...",
          pt: "Conta-nos mais...",
        }),
        counter: t({
          en: "characters",
          pt: "caracteres",
        }),
      },
    },
    validation: {
      nameMin: t({
        en: "Name is too short.",
        pt: "O nome é demasiado curto.",
      }),
      nameMax: t({
        en: "Name is too long.",
        pt: "O nome é demasiado longo.",
      }),
      emailInvalid: t({
        en: "Invalid email address.",
        pt: "Endereço de email inválido.",
      }),
      subjectRequired: t({
        en: "Please select a subject.",
        pt: "Por favor seleciona um assunto.",
      }),
      messageMin: t({
        en: "Message must be at least 10 characters.",
        pt: "A mensagem deve ter pelo menos 10 caracteres.",
      }),
      messageMax: t({
        en: "Message must be at most 5000 characters.",
        pt: "A mensagem deve ter no máximo 5000 caracteres.",
      }),
    },
    submit: t({
      en: "Send Message",
      pt: "Enviar Mensagem",
    }),
    submitting: t({
      en: "Sending...",
      pt: "A enviar...",
    }),
    success: {
      title: t({
        en: "Message Sent!",
        pt: "Mensagem Enviada!",
      }),
      description: t({
        en: "Thank you for reaching out. We have received your message and will get back to you soon.",
        pt: "Obrigado por nos contactares. Recebemos a tua mensagem e responderemos em breve.",
      }),
      ticketLabel: t({
        en: "Your ticket ID:",
        pt: "O teu ID de ticket:",
      }),
      ticketNote: t({
        en: "A confirmation email has been sent to your inbox.",
        pt: "Um email de confirmação foi enviado para a tua caixa de entrada.",
      }),
      sendAnother: t({
        en: "Send Another Message",
        pt: "Enviar Outra Mensagem",
      }),
    },
    error: {
      title: t({
        en: "Something Went Wrong",
        pt: "Algo Correu Mal",
      }),
      description: t({
        en: "We could not send your message. Please try again later.",
        pt: "Não foi possível enviar a tua mensagem. Por favor tenta mais tarde.",
      }),
      tryAgain: t({
        en: "Try Again",
        pt: "Tentar Novamente",
      }),
    },
  },
} satisfies Dictionary;

export default contactFormContent;
