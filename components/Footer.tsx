import Link from "next/link";
import { SERVICES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-tealdark text-white/90">
      <div className="max-w-[1100px] mx-auto px-5 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-serif text-lg text-white mb-2">
            Move<span className="text-accent">Well</span>
          </div>
          <p className="text-white/70 text-[13px]">
            Personalized physiotherapy care for pain relief, mobility, and
            recovery.
          </p>
          <div className="flex gap-3 mt-4 text-white/70">
            <span aria-hidden>●</span>
            <span aria-hidden>●</span>
            <span aria-hidden>●</span>
          </div>
        </div>

        <div>
          <div className="text-white mb-2 font-medium">Navigate</div>
          <ul className="space-y-1.5 text-white/70">
            <li><a href="#top">Home</a></li>
            <li><a href="#services">Treatments</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link href="/book">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white mb-2 font-medium">Services</div>
          <ul className="space-y-1.5 text-white/70">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-white mb-2 font-medium">Contact</div>
          <ul className="space-y-1.5 text-white/70">
            <li>24 Wellness Street, Your City</li>
            <li>+1 000 000 0000</li>
            <li>hello@movewell.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-[1100px] mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/60">
          <span>© {new Date().getFullYear()} MoveWell Physiotherapy</span>
          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
