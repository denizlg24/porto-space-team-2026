import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "home-page",
  content: {
    hero: {
      titleLine1: t({
        en: "We are",
        pt: "Estamos",
      }),
      titleLine2: t({
        en: "Ready for",
        pt: "Prontos para o",
      }),
      titleLine3: t({
        en: "Launch",
        pt: "Lançamento",
      }),
      tagline: {
        student: t({
          en: "STUDENT",
          pt: "PODER",
        }),
        power: t({
          en: "POWER",
          pt: "ESTUDANTIL",
        }),
        aerospace: t({
          en: "Aerospace Engineering.",
          pt: "Engenharia Aeroespacial.",
        }),
        real: t({
          en: "REAL",
          pt: "IMPACTO",
        }),
        impact: t({
          en: "IMPACT",
          pt: "REAL",
        }),
      },
      teamName: t({
        en: "Porto Space Team",
        pt: "Porto Space Team",
      }),
      teamDescription: t({
        en: "A student-led aerospace initiative at the University of Porto.",
        pt: "Uma iniciativa aeroespacial liderada por estudantes na Universidade do Porto.",
      }),
      viewProjects: t({
        en: "View Our Projects",
        pt: "Ver Projetos",
      }),
      ourMission: t({
        en: "Our Mission",
        pt: "Nossa Missão",
      }),
    },
    image: {
      alt: t({
        en: "Porto Space Team members standing with their hybrid rocket",
        pt: "Membros do Porto Space Team com o seu foguete híbrido",
      }),
      badge: t({
        en: "INVICTUS // 2025",
        pt: "INVICTUS // 2025",
      }),
      event: t({
        en: "EUROC 2025",
        pt: "EUROC 2025",
      }),
    },
    countdown: {
      prefix: t({
        en: "T-Minus to",
        pt: "T-Minus para",
      }),
      noEventTitle: t({
        en: "No Upcoming Events",
        pt: "Sem Próximos Eventos",
      }),
      days: t({
        en: "Days",
        pt: "Dias",
      }),
      hours: t({
        en: "Hours",
        pt: "Horas",
      }),
      minutes: t({
        en: "Min",
        pt: "Min",
      }),
      seconds: t({
        en: "Sec",
        pt: "Seg",
      }),
      completed: t({
        en: "The competition has begun!",
        pt: "A competição começou!",
      }),
      noCompetition: t({
        en: "Stay tuned for updates",
        pt: "Fique atento para novidades",
      }),
    },
    stats: {
      founded: t({
        en: "Founded",
        pt: "Fundado",
      }),
      teamMembers: t({
        en: "Team Members",
        pt: "Membros",
      }),
      projects: t({
        en: "Projects",
        pt: "Projetos",
      }),
    },
    about: {
      label: t({
        en: "// Who are we?",
        pt: "// Quem somos?",
      }),
      title: t({
        en: "About Us",
        pt: "Sobre Nós",
      }),
      paragraph1: t({
        en: "We are an association made up of university students, from FEUP (Faculty of Engineering of the University of Porto) and FCUP (Faculty of Sciences of the University of Porto).",
        pt: "Somos uma associação composta por estudantes universitários, da FEUP (Faculdade de Engenharia da Universidade do Porto) e da FCUP (Faculdade de Ciências da Universidade do Porto).",
      }),
      paragraph2: t({
        en: "Our mission is to produce meaningful research, while teaching aspiring engineers to become even better professionals.",
        pt: "A nossa missão é produzir investigação significativa, enquanto ensinamos engenheiros aspirantes a tornarem-se profissionais ainda melhores.",
      }),
      paragraph3: t({
        en: "Every day at Space Team is a new day where we try to push ourselves further, because we believe that challenge is the only way to create something groundbreaking, let it be a hybrid-propellant rocket, a nano satellite or the next generation of space pioneers.",
        pt: "Todos os dias no Space Team são um novo dia onde tentamos superar-nos, porque acreditamos que o desafio é a única forma de criar algo inovador, seja um foguete de propulsão híbrida, um nano satélite ou a próxima geração de pioneiros espaciais.",
      }),
      imageAlt: t({
        en: "Porto Space Team 2025",
        pt: "Porto Space Team 2025",
      }),
    },
    sponsors: {
      label: t({
        en: "// Our Partners",
        pt: "// Nossos Parceiros",
      }),
      title: t({
        en: "Sponsors",
        pt: "Patrocinadores",
      }),
      viewAll: t({
        en: "View All Sponsors",
        pt: "Ver Todos os Patrocinadores",
      }),
      noSponsors: t({
        en: "Sponsorship opportunities available",
        pt: "Oportunidades de patrocínio disponíveis",
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
