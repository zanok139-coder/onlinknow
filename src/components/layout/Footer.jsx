import React from "react";
import { Link } from "react-router-dom";

const linkClass = "text-white/70 transition-colors hover:text-white";

const FOOTER_LINKS = [
{ label: "About", to: "/about" },
{ label: "Contact", to: "/contact" },
{ label: "Privacy", to: "/privacy" },
{ label: "Terms", to: "/terms" },
{ label: "Blog", to: "/blog" }];


export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 bg-navy text-navy-foreground">
      <div className="mx-auto grid w-full max-w-[900px] grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 text-center md:grid-cols-4 md:text-left">
        <div className="col-span-2 md:col-span-1">
          <p className="font-heading text-[15px] font-extrabold tracking-tight text-white">
            onlinknow.co.za
          </p>
          <p className="mx-auto mt-1 max-w-[220px] font-reading text-[12px] leading-relaxed text-white/60 md:mx-0">Spiritual Library — 50+ Public Domain Classics

          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
            Quick Links
          </h3>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            <li>
              <Link to="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/#library" className={linkClass}>
                Library
              </Link>
            </li>
            <li>
              <Link to="/blog" className={linkClass}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                About
              </Link>
            </li>
            <li>
              <Link to="/admin" className={linkClass}>
                Upload a Book
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
            Legal
          </h3>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            <li>
              <Link to="/terms" className={linkClass}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
            Contact
          </h3>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            <li>
              <Link to="/contact" className={linkClass}>
                Contact Us
              </Link>
            </li>
            <li>
              <a href="mailto:support@onlinknow.co.za" className={linkClass}>
                support@onlinknow.co.za
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[900px] border-t border-white/10 px-5 py-5">
        <p className="text-[12px] leading-relaxed text-white/35">
          onlinknow.co.za offers 50+ free public domain books including As a Man Thinketh (1903), The
          Science of Getting Rich (1910), Meditations by Marcus Aurelius, Tao Te Ching, Bhagavad Gita,
          The Art of War, The Kybalion, The Prophet by Kahlil Gibran, and 40+ more classics. All
          books are verified public domain and free to read online without login or download. Perfect
          for spirituality, self-development, mind power, and meditation readers.
        </p>
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-[11px] text-white/45">
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span>© 2026 onlinknow.co.za</span>
          {FOOTER_LINKS.map((item) =>
          <React.Fragment key={item.to}>
              <span className="text-white/25">|</span>
              <Link to={item.to} className={linkClass}>
                {item.label}
              </Link>
            </React.Fragment>
          )}
        </p>
        <p className="mt-1 text-white/30">All books are public domain.</p>
      </div>
    </footer>);

}