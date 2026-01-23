import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "sign-in-page",
  content: {
    authRequired: t({
      en: "Authentication Required",
      pt: "Autenticação Necessária",
    }),
    title: t({
      en: "Sign In",
      pt: "Entrar",
    }),
    description: t({
      en: "Enter your credentials to access the admin panel",
      pt: "Insira as suas credenciais para aceder ao painel de administração",
    }),
    form: {
      emailLabel: t({
        en: "Email Address",
        pt: "Endereço de Email",
      }),
      emailPlaceholder: t({
        en: "up202600000@up.pt",
        pt: "up202600000@up.pt",
      }),
      emailError: t({
        en: "Must be a valid email address",
        pt: "Deve ser um endereço de email válido",
      }),
      passwordLabel: t({
        en: "Password",
        pt: "Palavra-passe",
      }),
      passwordMinError: t({
        en: "Password must be at least 6 characters long",
        pt: "A palavra-passe deve ter pelo menos 6 caracteres",
      }),
      passwordMaxError: t({
        en: "Password can't be longer than 32 characters",
        pt: "A palavra-passe não pode ter mais de 32 caracteres",
      }),
      forgotPassword: t({
        en: "Forgot Password?",
        pt: "Esqueceu a palavra-passe?",
      }),
      submitButton: t({
        en: "Sign In",
        pt: "Entrar",
      }),
      submitting: t({
        en: "Signing in...",
        pt: "A entrar...",
      }),
      or: t({
        en: "OR",
        pt: "OU",
      }),
      newMember: t({
        en: "New team member?",
        pt: "Novo membro da equipa?",
      }),
      requestAccess: t({
        en: "Request Access",
        pt: "Pedir Acesso",
      }),
    },
    errors: {
      invalidCredentials: t({
        en: "Invalid email or password",
        pt: "Email ou palavra-passe inválidos",
      }),
      accountNotApproved: t({
        en: "Your account is pending approval. Please wait for an administrator to approve your access request.",
        pt: "A sua conta está pendente de aprovação. Por favor aguarde que um administrador aprove o seu pedido de acesso.",
      }),
      emailNotVerified: t({
        en: "Please verify your email address before signing in",
        pt: "Por favor verifique o seu endereço de email antes de entrar",
      }),
      genericError: t({
        en: "An error occurred. Please try again.",
        pt: "Ocorreu um erro. Por favor tente novamente.",
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
