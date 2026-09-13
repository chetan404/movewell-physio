"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#top", label: "Home" },
    { href: "#services", label: "Treatments" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-line">
      <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl text-tealdark">
          Move<span className="text-accent">Well</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-inksoft">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
          <Link
            href="/book"
            className="bg-teal text-white px-5 py-2.5 rounded-lg font-medium hover:bg-tealdark transition"
          >
            Book Appointment
          </Link>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-0.5 w-6 bg-ink transition ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block h-0.5 w-6 bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-6 bg-ink transition ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-white px-5 py-4 flex flex-col gap-4 text-sm text-inksoft">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link
            href="/book"
            className="bg-teal text-white text-center px-5 py-3 rounded-lg font-medium"
          >
            Book Appointment
          </Link>
        </nav>
      )}
    </header>
  );
}
