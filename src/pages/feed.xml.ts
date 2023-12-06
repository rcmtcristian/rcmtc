import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type {APIContext} from "astro"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"


const parser = new MarkdownIt()
export async function GET(context: APIContext) {
  const posts = await getCollection('blog')
  return rss({
    title: "cristian richrads blog",
    description: "I write about web development and other things I find interesting.",
    site: context.site?.toString() || "https://rcmtc-blog.vercel.app/",
    items: posts.map((post) => ({
      title: post.data.title,
      // description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}`,
      content: sanitizeHtml( parser.render(post.body)),
    })),
  })
}