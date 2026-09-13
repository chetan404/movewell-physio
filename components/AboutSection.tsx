const STATS = [
  { value: "10+", label: "Years of experience" },
  { value: "2,000+", label: "Patients helped" },
  { value: "95%", label: "Patient satisfaction" },
  { value: "6 days", label: "Open weekly" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-beige">
      <div className="max-w-[1100px] mx-auto px-5">
        <h2 className="text-2xl md:text-[28px] mb-4">About MoveWell</h2>
        <p className="text-inksoft max-w-[640px] text-sm md:text-base">
          MoveWell Physiotherapy brings together a team of licensed
          physiotherapists focused on one goal: helping you move without
          pain. Our approach is evidence-based and patient-focused — every
          plan is built around your body, your goals, and your timeline for
          recovery, not a one-size-fits-all routine.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-card border border-line p-5 text-center"
            >
              <div className="font-serif text-2xl text-tealdark">{s.value}</div>
              <div className="text-xs text-inksoft mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
