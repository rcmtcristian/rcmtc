import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import tailwindTypography from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://rcmtc-blog.com",
  integrations: [tailwind(), tailwindTypography(), sitemap({
    filter: page => !/https:\/\/rcmtc-blog\.com\/blog\/[0-9]+/.test(page),
    customPages: ["https://rcmtc-blog.com/twitter", "https://rcmtc-blog.com/github", "https://rcmtc-blog.com/instagram", "https://rcmtc-blog.com/linkedin", "https://rcmtc-blog.com/youtube"],
    changefreq: "weekly",
    lastmod: new Date(),
    priority: 0.85,
    serialize: item => {
      if (item.url.endsWith("/")) {
        item.url = item.url.slice(0, -1);
      }
      return item;
    },
    i18n: {
      defaultLocale: "en",
      locales: ["en", "ja"]
    }
  }),,],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});