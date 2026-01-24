import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "sponsors-metadata",
  content: {
    title: t({
      en: "Porto Space Team | Sponsors",
      pt: "Porto Space Team | Patrocinadores",
    }),
    description: t({
      en: "Meet the sponsors and partners supporting Porto Space Team's mission to reach the stars",
      pt: "Conhea os patrocinadores e parceiros que apoiam a misso do Porto Space Team de alcanar as estrelas",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
