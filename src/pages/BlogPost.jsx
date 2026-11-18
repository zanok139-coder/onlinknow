import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Clock } from "lucide-react";
import Seo from "@/components/seo/Seo";
import Footer from "@/components/layout/Footer";
import RichText from "@/components/blog/RichText";
import { SITE_URL, bookPath } from "@/lib/seo";
import { BLOG_POSTS, getBlogPost } from "@/content/blogPosts";
import { getBlogExtra } from "@/content/blogSeoExtras";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  useEffect(() => {
    if (post) return undefined;
    const tag = document.createElement("meta");
    tag.setAttribute("name", "prerender-status-code");
    tag.setAttribute("content", "404");
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [post]);

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10">
        <p className="font-reading text-[15px] text-muted-foreground">That article does not exist.</p>
        <Link to="/blog" className="mt-3 inline-block text-[13px] font-medium underline">
          All articles
        </Link>
      </div>
    );
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const extra = getBlogExtra(post.slug);
  const others = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.title} | onlinknow.co.za`}
        description={post.description}
        keywords={`${post.h1}, public domain books, free books online`}
        canonical={canonical}
        image={post.image}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.image,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: "onlinknow.co.za Team" },
          publisher: { "@type": "Organization", name: "onlinknow.co.za" },
          mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
          inLanguage: "en",
        }}
      />

      <div className="mx-auto w-full max-w-[750px] px-4 pb-14">
        <nav className="flex items-center gap-1 border-b border-border py-3">
          <Link
            to="/blog"
            className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Blog
          </Link>
        </nav>

        <article className="pt-6">
          <h1 className="font-heading text-[25px] font-extrabold leading-tight tracking-tight sm:text-[31px]">
            {post.h1}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            <span>By onlinknow.co.za Team</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readMinutes} min read
            </span>
          </p>

          <img
            src={post.image}
            alt={post.h1}
            className="mt-4 aspect-[16/9] w-full object-cover"
          />

          <p className="mt-5 font-reading text-[16px] leading-[1.75] text-foreground/85">
            {post.intro}
          </p>

          <nav className="mt-6 border border-border bg-secondary/40 px-4 py-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Contents
            </h2>
            <ol className="mt-2 space-y-1.5">
              {post.sections.map((section, index) => (
                <li key={section.id} className="font-reading text-[14px]">
                  <a href={`#${section.id}`} className="hover:underline">
                    <span className="mr-1.5 text-[12px] text-muted-foreground">{index + 1}.</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {post.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-8 scroll-mt-24">
              <h2 className="font-heading text-[19px] font-bold leading-snug">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <RichText
                  key={index}
                  text={paragraph}
                  className="mt-2.5 font-reading text-[16px] leading-[1.75] text-foreground/85"
                />
              ))}
            </section>
          ))}

          {extra && (
            <section id="how-these-books-are-used" className="mt-8 scroll-mt-24">
              <h2 className="font-heading text-[19px] font-bold leading-snug">{extra.heading}</h2>
              {extra.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-2.5 font-reading text-[16px] leading-[1.75] text-foreground/85"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          )}

          <section className="mt-10 border-t border-border pt-6">
            <h2 className="font-heading text-[18px] font-bold">Books mentioned in this article</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {post.bookLinks.map((book) => (
                <li key={book.slug}>
                  <Link
                    to={bookPath({ slug: book.slug })}
                    className="block py-2.5 font-reading text-[15px] hover:underline"
                  >
                    {book.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-9">
            <h2 className="font-heading text-[18px] font-bold">Keep reading</h2>
            <ul className="mt-3 space-y-2">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="font-reading text-[15px] underline decoration-gold decoration-2 underline-offset-2 hover:decoration-foreground"
                  >
                    {item.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
}