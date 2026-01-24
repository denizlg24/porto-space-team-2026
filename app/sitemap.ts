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
  {
    url: "https://portospaceteam.pt/sign-in",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://portospaceteam.pt/sign-in"),
        "x-default": "https://portospaceteam.pt/sign-in",
      },
    },
  },
];

export default sitemap;