import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Seo from "@/components/seo/Seo";
import Footer from "@/components/layout/Footer";
import { DEFAULT_OG_IMAGE, SITE_URL, bookPath } from "@/lib/seo";
import { getReadPage } from "@/content/readPages";
import { getCareerSection } from "@/content/readCareerSections";

export default function ReadLanding() {
  const { slug } = useParams();
  const page = getReadPage(slug);
  const [book, setBook] = useState(null);
  const [chapterCount, setChapterCount] = useState(null);

  useEffect(() => {
    if (!page) return undefined;
    let active = true;
    base44.entities.Book.filter({ slug: page.bookSlug }, { limit: 1 })
      .then(async (res) => {
        const found = res.items?.[0];
        if (!active || !found) return;
        setBook(found);
        const count = await base44.entities.Chapter.count({ book_id: found.id });
        if (active) setChapterCount(count || 0);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [page]);

  useEffect(() => {
    if (page) return undefined;
    const tag = document.createElement("meta");
    tag.setAttribute("name", "prerender-status-code");
    tag.setAttribute("content", "404");
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [page]);

  if (!page) {
    return (
      <div className="mx-auto w-full max-w-[750px] px-4 py-10">
        <p className="font-reading text-[15px] text-muted-foreground">
          That reading guide does not exist.
        </p>
        <Link to="/" className="mt-3 inline-block text-[13px] font-medium underline">
          Back to the library
        </Link>
      </div>
    );
  }

  const chapters = chapterCount || book?.total_chapters || 20;
  const target = book ? bookPath(book) : `/book/${page.bookSlug}`;
  const careers = getCareerSection(page.slug);
  const canonical = `${SITE_URL}/read/${page.slug}`;

  const faqs = page.faqs.map((faq) => ({
    ...faq,
    a: faq.a.replace("%chapters%", String(chapters)),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.seoTitle,
        url: canonical,
        description: page.description,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: "onlinknow.co.za", url: `${SITE_URL}/` },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={page.seoTitle}
        description={page.description}
        keywords={page.keywords}
        canonical={canonical}
        image={DEFAULT_OG_IMAGE}
        type="article"
        jsonLd={jsonLd}
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

        <article className="pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            Free public domain · {page.year}
          </p>
          <h1 className="mt-2 font-heading text-[26px] font-extrabold leading-tight tracking-tight sm:text-[32px]">
            {page.h1}
          </h1>
          <p className="mt-2 font-reading text-[14px] text-muted-foreground">
            {page.bookTitle} by {page.author}
          </p>

          {page.intro.map((paragraph, index) => (
            <p
              key={index}
              className="mt-4 font-reading text-[16px] leading-[1.75] text-foreground/85"
            >
              {paragraph}
            </p>
          ))}

          <h2 className="mt-8 font-heading text-[19px] font-bold">About {page.author}</h2>
          <p className="mt-2 font-reading text-[16px] leading-[1.75] text-foreground/85">
            {page.authorBio}
          </p>

          <h2 className="mt-8 font-heading text-[19px] font-bold">
            Why you should read {page.bookTitle}
          </h2>
          <p className="mt-2 font-reading text-[16px] leading-[1.75] text-foreground/85">
            {page.whyRead}
          </p>

          <h2 className="mt-8 font-heading text-[19px] font-bold">5 key lessons from the book</h2>
          <ul className="mt-3 space-y-2.5">
            {page.lessons.map((lesson) => (
              <li key={lesson} className="flex gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span className="font-reading text-[15px] leading-relaxed text-foreground/85">
                  {lesson}
                </span>
              </li>
            ))}
          </ul>

          {careers && (
            <section className="mt-9">
              <h2 className="font-heading text-[19px] font-bold">{careers.heading}</h2>
              {careers.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-2.5 font-reading text-[16px] leading-[1.75] text-foreground/85"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          )}

          <section className="mt-9 border-y border-border py-6">
            <h2 className="font-heading text-[19px] font-bold">
              Read {page.bookTitle} - Full Book
            </h2>
            <p className="mt-1.5 font-reading text-[14px] leading-relaxed text-muted-foreground">
              All {chapters} chapters, complete and unedited. No sign-up, no download, free forever.
            </p>
            <Link
              to={target}
              className="mt-4 flex w-full items-center justify-center bg-foreground px-6 py-3.5 text-center font-heading text-[14px] font-bold uppercase tracking-[0.06em] text-background transition-opacity hover:opacity-90"
            >
              Read Full Book Free
            </Link>
          </section>

          <section className="mt-9">
            <h2 className="font-heading text-[19px] font-bold">Frequently Asked Questions</h2>
            <dl className="mt-3 divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-4">
                  <dt className="font-heading text-[15px] font-semibold">{faq.q}</dt>
                  <dd className="mt-1.5 font-reading text-[15px] leading-relaxed text-foreground/80">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-9">
            <h2 className="font-heading text-[19px] font-bold">You may also like</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {page.related.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={bookPath({ slug: item.slug })}
                    className="block py-3 font-reading text-[15px] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-reading text-[13px] text-muted-foreground">
              More free guides: {" "}
              <Link to="/blog" className="underline hover:text-foreground">
                the onlinknow.co.za blog
              </Link>
            </p>
          </section>
        </article>
      </div>

      <Footer />
    </div>
  );
}