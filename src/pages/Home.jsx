import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import BookCard from "@/components/books/BookCard";
import BookSearch from "@/components/books/BookSearch";
import Footer from "@/components/layout/Footer";
import HomeFaq from "@/components/home/HomeFaq";
import Seo from "@/components/seo/Seo";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import { localBooks } from "@/lib/localBook";
const HOME_SEO = {
  title: "Onlink Library - Free Spiritual Library | 50+ Classics | onlinknow.co.za",
  description:
  "Onlink Library (onlinknow.co.za) - Free spiritual library with 50+ public domain classics on mind power, meditation and self-development. Read As a Man Thinketh, Meditations, Tao Te Ching online free. Curated by Siphesihle Madondo.",
  keywords: [
  // Core
  "free books online",
  "public domain books",
  "as a man thinketh",
  "science of getting rich",
  "free spiritual books",
  "best self development books 2026",
  // Group A — finance and mindset
  "best life insurance policy",
  "term life insurance quotes",
  "whole life insurance rates",
  "financial planning for retirement",
  "wealth management services",
  "investment advisor near me",
  "best Roth IRA accounts",
  "debt consolidation loans",
  "credit repair services",
  "best high yield savings account 2026",
  "how to get out of debt fast",
  "financial freedom coaching",
  "money mindset coaching",
  "best personal finance courses",
  "online financial planner",
  // Group B — therapy and mental health
  "online therapy for anxiety and depression",
  "best online therapy platforms",
  "cognitive behavioural therapy online",
  "mindfulness based stress reduction course",
  "best therapist for anxiety",
  "mental health counseling online",
  "best meditation apps for anxiety",
  "stress management coaching",
  "emotional intelligence training",
  "best online counseling services",
  "affordable therapy online",
  "how to practice mindfulness daily",
  // Group C — coaching and business
  "best life coach certification programs",
  "executive coaching certification",
  "business coach for entrepreneurs",
  "online life coaching course",
  "personal development coaching",
  "leadership coaching program",
  "career coaching certification",
  "how to start an online coaching business",
  "best mastermind groups for entrepreneurs",
  "online course creation platform",
  "best business mentorship program",
  "productivity coaching for CEOs",
  // Group D — education and career
  "best online MBA programs 2026",
  "online degree in psychology",
  "best project management certification",
  "online learning platforms for adults",
  "best public speaking courses",
  "how to improve self confidence course",
  "best habit tracking apps",
  "online leadership training",
  "best time management courses",
  "online personal development courses",
  "how to get promoted at work",
  // Group E — spirituality and wellness
  "best spiritual retreats USA",
  "mindfulness meditation certification",
  "best law of attraction courses",
  "how to manifest money fast",
  "best chakra healing courses",
  "spiritual life coaching certification",
  "best manifestation journal 2026",
  "best guided meditation for sleep",
  "how to find inner peace course",
  // Long tail
  "best free books online no download",
  "free public domain books download",
  "where to read books free legally",
  "best sites to read books free",
  "free self help books pdf",
  "free books on stoicism",
  "free books on law of attraction",
  "free books on wealth creation",
  "best free philosophy books",
  "free books on manifestation"].
  join(", "),
  canonical: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "onlinknow.co.za - 50+ Free Public Domain Books",
    url: `${SITE_URL}/`,
    description:
    "A free library of 50+ public domain classics on spirituality, mind power, meditation and self development. No login required.",
    inLanguage: "en",
    isFamilyFriendly: true,
    isPartOf: { "@type": "WebSite", name: "onlinknow.co.za", url: `${SITE_URL}/` },
    about: {
      "@type": "Thing",
      name: "Public domain spirituality and self development books"
    }
  }
};

const ALL = "All";
const LOGO_URL =
"https://media.base44.com/images/public/6a2ad37fbe803f09dd15b92c/b42cb7d19_generated_image.png";
const HOME_BG_URL =
"https://media.base44.com/images/public/6a2ad37fbe803f09dd15b92c/7fdeb557f_Screenshot_20260613_105613_ChatGPT.jpg";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const inputRef = useRef(null);

  useEffect(() => {
    let active = true;
    Promise.all([
    .entities.Book.filter({ status: "published" }, { sort: "-created_date", limit: 100 }),
    .entities.Book.count({ status: "published" })]
    ).
    .then(({page, count}) => {
  if (!active) return;
  const items = page.items && page.items.length ? page.items : localBooks;
  setBooks(items);
  setTotal(items.length);
})
    }).
    finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash === "#library") {
      document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  const categories = useMemo(() => {
    const found = new Set(books.map((book) => book.category).filter(Boolean));
    return [ALL, ...Array.from(found).sort()];
  }, [books]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return books.filter((book) => {
      if (category !== ALL && book.category !== category) return false;
      if (!needle) return true;
      const haystack = [book.title, book.author, book.category, book.description].
      filter(Boolean).
      join(" ").
      toLowerCase();
      return haystack.includes(needle);
    });
  }, [books, query, category]);

  const focusSearch = () => {
    document.getElementById("search-block")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => inputRef.current?.focus(), 350);
  };

  const activeQuery = query.trim();

  return (
    <div className="min-h-screen bg-navy text-navy-foreground">
      <Seo {...HOME_SEO} />
      <section className="relative overflow-hidden">
        {/* Home page background image (brand lockup), dimmed so the hero text stays readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HOME_BG_URL})` }} />
        
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy/85" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-gold/25 blur-[120px]" />
          <div className="absolute -bottom-28 -left-16 h-[280px] w-[280px] rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute -right-20 top-24 h-[260px] w-[260px] rounded-full bg-gold/10 blur-[90px]" />
          <div className="absolute right-10 top-28 hidden h-[190px] w-[132px] rotate-6 rounded-sm border border-gold/25 bg-gradient-to-b from-white/10 to-transparent md:block" />
          <div className="absolute right-24 top-40 hidden h-[170px] w-[118px] -rotate-6 rounded-sm border border-white/15 bg-gradient-to-b from-white/10 to-transparent md:block" />
        </div>

        <div className="relative mx-auto w-full max-w-[1000px] px-4 pb-8 pt-5">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex min-w-0 items-center gap-2">
              <img
                src={LOGO_URL}
                alt="Onlink logo"
                className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white/20" />
              
              <span className="truncate font-heading text-[14px] font-extrabold tracking-tight text-white">
                onlinknow.co.za
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={focusSearch}
                aria-label="Search the library"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold/60 hover:text-white">
                
                <Search className="h-[17px] w-[17px]" />
              </button>
              <Link
                to="/blog"
                className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white">
                
                Blog
              </Link>
              <Link
                to="/about"
                className="hidden text-[12px] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white sm:inline">
                
                About
              </Link>
            </div>
          </header>

          <div className="mx-auto mt-8 max-w-[750px] text-center">
            <h1 className="font-heading text-[30px] font-extrabold leading-tight tracking-tight text-white sm:text-[38px]">
              onlinknow.co.za
            </h1>
            <p className="mx-auto mt-2 max-w-[420px] font-reading text-[14px] leading-relaxed text-white/60">Public domain spiritual library - 50+ classics on mind power, meditation and self-development.


            </p>
          </div>

          <div id="search-block" className="mt-7">
            <BookSearch
              value={query}
              onChange={setQuery}
              onClear={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              onSearch={() =>
              document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })
              }
              inputRef={inputRef} />
            
          </div>

          <div className="mx-auto mt-4 max-w-[750px] rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-center">
            <p className="font-reading text-[12.5px] leading-relaxed text-white/75">
              onlinknow.co.za is curated by Siphesihle Madondo, South Africa. 50+ verified public
              domain classics.
            </p>
          </div>

          <div className="mx-auto mt-4 flex max-w-[750px] gap-2 overflow-x-auto pb-1">
            {categories.map((item) => {
              const active = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors opacity-75 bg-[#c7b8a0] ${
                  active ?
                  "border-gold text-navy" :
                  "border-white/15 text-white/65 hover:border-white/40 hover:text-white"}`
                  }>
                  
                  {item}
                </button>);

            })}
          </div>
        </div>
      </section>

      <main id="library" className="mx-auto w-full max-w-[750px] px-4 pb-10">
        <div className="rounded-2xl bg-white px-4 pb-5 pt-4 shadow-[0_-10px_50px_rgba(0,0,0,0.35)]">
          <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
            <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {loading ? "Loading library" : `${total} Books in Library`}
            </h2>
            {activeQuery ?
            <p className="text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Found {results.length} {results.length === 1 ? "book" : "books"} for '{activeQuery}'
              </p> :
            null}
          </div>

          {loading ?
          <div className="mt-4 space-y-4">
              {[0, 1, 2, 3].map((i) =>
            <div key={i} className="flex animate-pulse gap-3 border-b border-border pb-4">
                  <div className="h-[92px] w-[64px] shrink-0 bg-secondary" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 w-3/4 bg-secondary" />
                    <div className="h-3 w-1/2 bg-secondary" />
                    <div className="h-2 w-1/3 bg-secondary" />
                  </div>
                </div>
            )}
            </div> :
          results.length === 0 ?
          <p className="mt-6 font-reading text-[15px] leading-relaxed text-muted-foreground">
              No books found for '{activeQuery}' — Try searching 'Allen' or 'Wattles' or
              'Meditations'.
            </p> :

          <div className="mt-4 space-y-4">
              {results.map((book) =>
            <BookCard key={book.id} book={book} />
            )}
            </div>
          }
        </div>
      </main>

      <HomeFaq />

      <Footer />
    </div>);

}
