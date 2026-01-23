import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "register-page",
  content: {
    steps: {
      identity: t({
        en: "Identity",
        pt: "Identidade",
      }),
      security: t({
        en: "Security",
        pt: "Segurança",
      }),
    },
    step1: {
      subtitle: t({
        en: "New account registration",
        pt: "Registo de nova conta",
      }),
      title: t({
        en: "Request Access",
        pt: "Pedir Acesso",
      }),
      description: t({
        en: "Fill in your details to request admin access",
        pt: "Preencha os seus dados para pedir acesso de administrador",
      }),
    },
    step2: {
      subtitle: t({
        en: "New account registration",
        pt: "Registo de nova conta",
      }),
      title: t({
        en: "Set Credentials",
        pt: "Definir Credenciais",
      }),
      description: t({
        en: "Create your secure login credentials",
        pt: "Crie as suas credenciais de acesso seguras",
      }),
    },
    identityForm: {
      fullNameLabel: t({
        en: "Full name",
        pt: "Nome completo",
      }),
      fullNamePlaceholder: t({
        en: "Alice Santos",
        pt: "Alice Santos",
      }),
      fullNameError: t({
        en: "Please provide your full name",
        pt: "Por favor, forneça o seu nome completo",
      }),
      emailLabel: t({
        en: "Institutional Email",
        pt: "Email Institucional",
      }),
      emailPlaceholder: t({
        en: "up202600000@up.pt",
        pt: "up202600000@up.pt",
      }),
      emailDescription: t({
        en: "Must be a valid University of Porto email",
        pt: "Deve ser um email válido da Universidade do Porto",
      }),
      emailError: t({
        en: "Must be a valid email address",
        pt: "Deve ser um endereço de email válido",
      }),
      departmentLabel: t({
        en: "Department",
        pt: "Departamento",
      }),
      departmentError: t({
        en: "Please choose a department",
        pt: "Por favor, escolha um departamento",
      }),
      continueButton: t({
        en: "Continue",
        pt: "Continuar",
      }),
      or: t({
        en: "OR",
        pt: "OU",
      }),
      alreadyHaveAccess: t({
        en: "Already have access?",
        pt: "Já tem acesso?",
      }),
      signIn: t({
        en: "Sign-In",
        pt: "Entrar",
      }),
    },
    securityForm: {
      passwordLabel: t({
        en: "Password",
        pt: "Palavra-passe",
      }),
      confirmPasswordLabel: t({
        en: "Confirm Password",
        pt: "Confirmar Palavra-passe",
      }),
      passwordMinError: t({
        en: "Password must be at least 6 characters long",
        pt: "A palavra-passe deve ter pelo menos 6 caracteres",
      }),
      passwordMaxError: t({
        en: "Password can't be longer than 32 characters",
        pt: "A palavra-passe não pode ter mais de 32 caracteres",
      }),
      passwordUppercaseError: t({
        en: "Password must contain an uppercase character",
        pt: "A palavra-passe deve conter uma letra maiúscula",
      }),
      passwordSpecialError: t({
        en: "Password must contain a special character",
        pt: "A palavra-passe deve conter um caractere especial",
      }),
      confirmPasswordError: t({
        en: "Please confirm your password",
        pt: "Por favor, confirme a sua palavra-passe",
      }),
      passwordsMustMatch: t({
        en: "Passwords must match",
        pt: "As palavras-passe devem corresponder",
      }),
      backButton: t({
        en: "Back",
        pt: "Voltar",
      }),
      submitButton: t({
        en: "Submit Request",
        pt: "Submeter Pedido",
      }),
      submitting: t({
        en: "Submitting...",
        pt: "A submeter...",
      }),
      or: t({
        en: "OR",
        pt: "OU",
      }),
      alreadyHaveAccess: t({
        en: "Already have access?",
        pt: "Já tem acesso?",
      }),
      signIn: t({
        en: "Sign-In",
        pt: "Entrar",
      }),
    },
    departments: {
      propulsion: t({
        en: "Propulsion",
        pt: "Propulsão",
      }),
      structures: t({
        en: "Structures",
        pt: "Estruturas",
      }),
      avionics: t({
        en: "Avionics",
        pt: "Aviónica",
      }),
      recovery: t({
        en: "Recovery",
        pt: "Recuperação",
      }),
      operations: t({
        en: "Operations",
        pt: "Operações",
      }),
      business: t({
        en: "Business",
        pt: "Negócios",
      }),
    },
    errors: {
      emailInUse: t({
        en: "This email address is already registered",
        pt: "Este endereço de email já está registado",
      }),
      invalidEmail: t({
        en: "Email must be a valid University of Porto address (@up.pt)",
        pt: "O email deve ser um endereço válido da Universidade do Porto (@up.pt)",
      }),
      genericError: t({
        en: "An error occurred. Please try again.",
        pt: "Ocorreu um erro. Por favor tente novamente.",
      }),
    },
    success: {
      subtitle: t({
        en: "Request submitted",
        pt: "Pedido submetido",
      }),
      title: t({
        en: "Check Your Email",
        pt: "Verifique o Seu Email",
      }),
      description: t({
        en: "We've sent a verification link to your email address. Please verify your email to complete the registration process.",
        pt: "Enviámos um link de verificação para o seu endereço de email. Por favor verifique o seu email para completar o processo de registo.",
      }),
      pendingApproval: t({
        en: "After verifying your email, your account will be pending approval by an administrator.",
        pt: "Após verificar o seu email, a sua conta ficará pendente de aprovação por um administrador.",
      }),
      backToSignIn: t({
        en: "Back to Sign In",
        pt: "Voltar ao Login",
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
