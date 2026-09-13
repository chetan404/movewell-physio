import Link from "next/link";

export default function Hero() {
  return (
    <section id="top" className="bg-beige">
      <div className="max-w-[1100px] mx-auto px-5 pt-12 pb-14 md:pt-20 md:pb-20 grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div>
          <h1 className="text-[34px] md:text-[46px] leading-[1.15] max-w-[520px]">
            Move better. Feel stronger. Live pain-free.
          </h1>
          <p className="text-inksoft mt-4 max-w-[440px]">
            Personalized physiotherapy care designed around your body, your
            goals, and your recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <a
              href="#pain-points"
              className="bg-teal text-white text-center px-6 py-3.5 rounded-lg font-medium hover:bg-tealdark transition"
            >
              Find the right treatment
            </a>
            <Link
              href="/book"
              className="border border-line bg-white text-tealdark text-center px-6 py-3.5 rounded-lg font-medium"
            >
              Book an appointment
            </Link>
          </div>
          <p className="text-[13px] text-inksoft mt-6 flex items-center gap-2">
            <span aria-hidden>🌿</span>
            Professional care for pain relief, mobility, and recovery.
          </p>
        </div>

        <div className="bg-white rounded-card p-8 shadow-[0_10px_30px_rgba(28,38,36,0.06)] flex items-center justify-center">
          <svg viewBox="0 0 240 260" width="220" height="240" aria-hidden>
            <circle cx="120" cy="42" r="26" fill="#F3E3CC" />
            <path
              d="M70 100c10-24 34-38 50-38s40 14 50 38c8 20 4 46-10 60l-16 16v40c0 8-6 14-14 14h-20c-8 0-14-6-14-14v-40l-16-16c-14-14-18-40-10-60z"
              fill="#1F6F5C"
              opacity="0.85"
            />
            <path
              d="M60 130c-14 8-24 24-26 42"
              stroke="#1F6F5C"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M180 130c14 8 24 24 26 42"
              stroke="#1F6F5C"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <circle cx="120" cy="230" r="10" fill="#C98A3D" opacity="0.7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
