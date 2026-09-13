import { SERVICES } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section id="services" className="py-16">
      <div className="max-w-[1100px] mx-auto px-5">
        <h2 className="text-2xl md:text-[28px] mb-8">Our treatments</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-line rounded-card p-5"
            >
              <div className="text-2xl mb-3" aria-hidden>
                {s.icon}
              </div>
              <h3 className="text-[15px] font-sans font-semibold mb-1.5">
                {s.title}
              </h3>
              <p className="text-[13px] text-inksoft mb-3">{s.description}</p>
              <a
                href="#contact"
                className="text-[13px] text-teal font-medium"
              >
                Learn more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
