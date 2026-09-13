"use client";

import { useState } from "react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to a real contact endpoint / email service.
    setSent(true);
  };

  return (
    <section id="contact" className="py-16">
      <div className="max-w-[1100px] mx-auto px-5">
        <h2 className="text-2xl md:text-[28px] mb-8">Reach us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white border border-line rounded-card p-6 space-y-3 text-sm">
              <div>
                <div className="text-inksoft text-xs mb-0.5">Address</div>
                24 Wellness Street, Your City
              </div>
              <div>
                <div className="text-inksoft text-xs mb-0.5">Phone</div>
                +1 000 000 0000
              </div>
              <div>
                <div className="text-inksoft text-xs mb-0.5">Email</div>
                hello@movewell.com
              </div>
              <div>
                <div className="text-inksoft text-xs mb-0.5">Opening hours</div>
                Monday–Saturday, 8:00 AM–6:00 PM
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="tel:+10000000000"
                  className="flex-1 text-center bg-teal text-white rounded-lg py-2.5 text-sm font-medium"
                >
                  Call us
                </a>
                <a
                  href="https://wa.me/10000000000"
                  className="flex-1 text-center border border-line rounded-lg py-2.5 text-sm font-medium text-tealdark"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-4 bg-white border border-line rounded-card h-40 flex items-center justify-center text-inksoft text-xs">
              Map placeholder — embed Google Maps here
            </div>

            <div className="mt-4 bg-accentsoft border border-line rounded-card p-4 text-xs text-inksoft">
              For urgent or severe symptoms, contact your local emergency
              service.
            </div>
          </div>

          <form
            onSubmit={submit}
            className="bg-white border border-line rounded-card p-6 space-y-4"
          >
            {sent ? (
              <p className="text-sm text-teal font-medium">
                Thanks — we&apos;ll get back to you shortly.
              </p>
            ) : (
              <>
                <label className="block text-[13.5px] text-inksoft">
                  Name
                  <input
                    required
                    type="text"
                    className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                  />
                </label>
                <label className="block text-[13.5px] text-inksoft">
                  Email
                  <input
                    required
                    type="email"
                    className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                  />
                </label>
                <label className="block text-[13.5px] text-inksoft">
                  Message
                  <textarea
                    required
                    rows={4}
                    className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-teal text-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto"
                >
                  Send message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
