import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    hero: {
      label: t({
        en: "// Our Story",
        pt: "// A Nossa História",
      }),
      title: t({
        en: "About Porto Space Team",
        pt: "Sobre a Porto Space Team",
      }),
      description: t({
        en: "A student-led aerospace initiative pushing the boundaries of space technology at the University of Porto.",
        pt: "Uma iniciativa aeroespacial liderada por estudantes que expande os limites da tecnologia espacial na Universidade do Porto.",
      }),
    },
    mission: {
      label: t({
        en: "// Our Mission",
        pt: "// A Nossa Missão",
      }),
      title: t({
        en: "Inspiring the Next Generation",
        pt: "Inspirar a Próxima Geração",
      }),
      paragraph1: t({
        en: "Bringing together students from the Faculty of Engineering (FEUP) and the Faculty of Sciences (FCUP) of the University of Porto, our mission is to produce high-impact aerospace research while training professionals of excellence.",
        pt: "Unindo estudantes da Faculdade de Engenharia (FEUP) e da Faculdade de Ciências (FCUP) da Universidade do Porto, a nossa missão é produzir investigação de alto impacto na área aeroespacial, enquanto formamos profissionais de excelência.",
      }),
      paragraph2: t({
        en: "At Porto Space Team, we see each day as an opportunity to push ourselves further. We believe that true innovation is born from challenge: from developing hybrid rockets and nanosatellites, to training the next wave of space pioneers.",
        pt: "Na Porto Space Team, encaramos cada dia como uma oportunidade para nos superarmos. Acreditamos que é no desafio que nasce a verdadeira inovação: desde o desenvolvimento de rockets híbridos e nanossatélites, até à formação da próxima vaga de pioneiros do espaço.",
      }),
      paragraph3: t({
        en: "Every day at Porto Space Team is a new day where we try to push ourselves further, because we believe that challenge is the only way to create something groundbreaking.",
        pt: "Todos os dias na Porto Space Team são um novo dia onde tentamos superar-nos, porque acreditamos que o desafio é a única forma de criar algo inovador.",
      }),
    },
    timeline: {
      label: t({
        en: "// Our Journey",
        pt: "// A Nossa Jornada",
      }),
      title: t({
        en: "Porto Space Team Through the Years",
        pt: "Porto Space Team ao Longo dos Anos",
      }),
      empty: t({
        en: "Our journey is just beginning. Check back soon for updates!",
        pt: "A nossa jornada está apenas a começar. Volte em breve para atualizações!",
      }),
    },
    team: {
      label: t({
        en: "// Our Team",
        pt: "// A Nossa Equipa",
      }),
      title: t({
        en: "Meet the Team",
        pt: "Conheça a Equipa",
      }),
      imageAlt: t({
        en: "Porto Space Team group photo",
        pt: "Foto de grupo da Porto Space Team",
      }),
    },
  },
} satisfies Dictionary;

export default aboutPageContent;
