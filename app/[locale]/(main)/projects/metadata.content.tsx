import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const projectsMetadataContent = {
  key: "projects-metadata",
  content: {
    title: t({
      en: "Projects | Porto Space Team",
      pt: "Projetos | Porto Space Team",
    }),
    description: t({
      en: "Explore the aerospace projects developed by Porto Space Team, from hybrid rockets to nanosatellites.",
      pt: "Explore os projetos aeroespaciais desenvolvidos pela Porto Space Team, desde foguetes híbridos a nanossatélites.",
    }),
  },
} satisfies Dictionary;

export default projectsMetadataContent;
