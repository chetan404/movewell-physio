"use client";

import { useState } from "react";
import Link from "next/link";
import { PAIN_POINTS } from "@/lib/data";

export default function PainPointSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = PAIN_POINTS.find((p) => p.slug === selected) || null;

  return (
    <section id="pain-points" className="py-16">
      <div className="max-w-[1100px] mx-auto px-5">
        <h2 className="text-2xl md:text-[28px] mb-2">
          Where are you experiencing pain?
        </h2>
        <p className="text-inksoft text-sm mb-8">
          Select an area to see common causes and suitable treatment options.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
          {PAIN_POINTS.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelected(p.slug)}
              aria-pressed={selected === p.slug}
              className={`text-left rounded-card border p-4 transition ${
                selected === p.slug
                  ? "border-teal bg-accentsoft"
                  : "border-line bg-white hover:border-teal"
              }`}
            >
              <div className="text-2xl mb-2" aria-hidden>
                {p.emoji}
              </div>
              <div className="text-sm font-medium">{p.label}</div>
            </button>
          ))}
        </div>

        {active && (
          <div className="mt-8 bg-white border border-line rounded-card p-6 md:p-7">
            <h3 className="text-lg mb-2">{active.label}</h3>
            <p className="text-inksoft text-sm mb-4">{active.causes}</p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-semibold text-tealdark mb-2">
                  Recommended treatment options
                </div>
                <ul className="text-sm text-inksoft space-y-1.5">
                  {active.treatments.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-teal">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-tealdark mb-2">
                  Suitable services
                </div>
                <ul className="text-sm text-inksoft space-y-1.5">
                  {active.services.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-teal">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={`/recommend?pain=${active.slug}`}
              className="inline-block mt-6 bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-tealdark transition"
            >
              Continue
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
