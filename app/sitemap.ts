import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://portospaceteam.pt",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://portospaceteam.pt"),
        "x-default": "https://portospaceteam.pt",
      },
    },
  },
];

export default sitemap;