import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { bookPath } from "@/lib/seo";

const FAQS = [
  {
    q: "Can these free books help with financial planning?",
    a: "They help with the thinking behind it, not the paperwork. Titles like The Science of Getting Rich and Think and Grow Rich are widely read by people working with a money mindset coaching programme, and many readers pair them with best personal finance courses or a financial planning for retirement plan. For regulated advice, speak to a qualified online financial planner.",
  },
  {
    q: "Are these books recommended by life coaches?",
    a: "Frequently. As a Man Thinketh and The Master Key System appear on best life coach certification programs reading lists, and Meditations is standard in executive coaching certification training. Reading the original is better than reading a summary slide in an online life coaching course.",
  },
  {
    q: "Do any of these books help with anxiety and stress?",
    a: "Several are used as companion reading alongside mindfulness based stress reduction courses and cognitive behavioural therapy online: Meditations, The Dhammapada, The Prophet and The Practice of the Presence of God. They are not a substitute for online therapy for anxiety and depression or best online counseling services — if you are struggling, a licensed therapist near me search is the right next step.",
  },
  {
    q: "Are these suitable for personal development courses and study?",
    a: "Yes. They are public domain, so they can be assigned, quoted and printed freely in online personal development courses, online leadership training or best time management courses. Nothing here requires an ebook download site or a subscription.",
  },
  {
    q: "Which books are best for focus and productivity?",
    a: "The Power of Concentration is the practical one — twenty lessons that overlap heavily with what productivity coaching for CEOs and best habit tracking apps teach. The Mastery of Destiny by James Allen covers the habit side in about an hour.",
  },
  {
    q: "Is everything really free, with no download or login?",
    a: "Yes. Every book is free to read in the browser, chapter by chapter, with no account and nothing to install. Start with As a Man Thinketh if you want a one-evening test.",
  },
];

export default function HomeFaq() {
  useEffect(() => {
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "home-faq");
    tag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  return (
    <section className="mx-auto w-full max-w-[750px] px-4 pb-12">
      <div className="rounded-2xl bg-white px-4 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        <h2 className="font-heading text-[16px] font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <dl className="mt-3 divide-y divide-border border-t border-border">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-3.5">
              <dt className="font-heading text-[14px] font-semibold text-foreground">{faq.q}</dt>
              <dd className="mt-1.5 font-reading text-[13px] leading-relaxed text-muted-foreground">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-reading text-[12px] text-muted-foreground">
          Browse the full shelf, or read the{" "}
          <Link to={bookPath({ slug: "as-a-man-thinketh" })} className="underline hover:text-foreground">
            most read book in the library
          </Link>
          .
        </p>
      </div>
    </section>
  );
}