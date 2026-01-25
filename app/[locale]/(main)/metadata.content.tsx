import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "home-metadata",
  content: {
    title: t({
      en: "Porto Space Team | Ready for Launch",
      pt: "Porto Space Team | Prontos para Lançar",
    }),
    description: t({
      en: "Porto Space Team is a student-led aerospace initiative at the University of Porto, designing and building rockets for the European Rocketry Challenge.",
      pt: "O Porto Space Team é uma iniciativa aeroespacial liderada por estudantes na Universidade do Porto, projetando e construindo foguetes para o European Rocketry Challenge.",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
