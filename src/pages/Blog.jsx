import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Clock } from "lucide-react";
import Seo from "@/components/seo/Seo";
import Footer from "@/components/layout/Footer";
import { SITE_URL, DEFAULT_OG_IMAGE, bookPath } from "@/lib/seo";
import { BLOG_POSTS } from "@/content/blogPosts";
import { READ_PAGES } from "@/content/readPages";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Blog - Free Book Guides & Public Domain Reading Tips | onlinknow.co.za"
        description="Guides, reading lists and explanations from onlinknow.co.za: the best public domain books, what public domain means, and how to read more books free and legally."
        keywords="public domain books blog, free book guides, best self development books, how to read free books legally"
        canonical={`${SITE_URL}/blog`}
        image={DEFAULT_OG_IMAGE}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "onlinknow.co.za Blog",
          url: `${SITE_URL}/blog`,
          description: "Guides and reading lists for free public domain books.",
          inLanguage: "en",
          publisher: { "@type": "Organization", name: "onlinknow.co.za" },
        }}
      />

      <div className="mx-auto w-full max-w-[750px] px-4 pb-14">
        <nav className="flex items-center gap-1 border-b border-border py-3">
          <Link
            to="/"
            className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Library
          </Link>
        </nav>

        <header className="pt-6">
          <h1 className="font-heading text-[26px] font-extrabold leading-tight tracking-tight sm:text-[32px]">
            The onlinknow.co.za Blog
          </h1>
          <p className="mt-2 font-reading text-[15px] leading-relaxed text-muted-foreground">
            Reading lists, plain-language explanations and guides to reading more without paying for
            it. Written by the onlinknow.co.za Team.
          </p>
        </header>

        <div className="mt-7 space-y-6">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="border-b border-border pb-6">
              <Link to={`/blog/${post.slug}`} className="group block">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
                <h2 className="mt-3 font-heading text-[18px] font-bold leading-snug group-hover:underline">
                  {post.h1}
                </h2>
              </Link>
              <p className="mt-1.5 font-reading text-[14px] leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <p className="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readMinutes} min read
                </span>
              </p>
            </article>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="font-heading text-[18px] font-bold">Free book reading guides</h2>
          <p className="mt-1 font-reading text-[13px] text-muted-foreground">
            Short summaries and direct links to the full text.
          </p>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {READ_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  to={`/read/${page.slug}`}
                  className="block py-2.5 font-reading text-[14px] hover:underline"
                >
                  {page.bookTitle} by {page.author}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-reading text-[13px] text-muted-foreground">
            Or start with{" "}
            <Link to={bookPath({ slug: "as-a-man-thinketh" })} className="underline hover:text-foreground">
              As a Man Thinketh
            </Link>
            .
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}