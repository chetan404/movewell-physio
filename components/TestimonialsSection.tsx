import { TESTIMONIALS } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-beige">
      <div className="max-w-[1100px] mx-auto px-5">
        <h2 className="text-2xl md:text-[28px] mb-8">What patients say</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-line rounded-card p-5"
            >
              <div className="text-accent text-sm mb-2" aria-hidden>
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
              <p className="text-[13.5px] text-inksoft mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="text-sm font-medium">{t.name}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-inksoft mt-4">
          Placeholder testimonials — replace with real patient reviews.
        </p>
      </div>
    </section>
  );
}
