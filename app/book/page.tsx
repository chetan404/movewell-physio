"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  APPOINTMENT_TYPES,
  THERAPISTS,
  TIME_SLOTS,
  PAIN_POINTS,
  isSlotAvailable,
  generateBookingRef,
} from "@/lib/data";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function emailValid(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function phoneValid(v: string) {
  return /^[+\d][\d\s-]{6,}$/.test(v);
}

function BookingFlowInner() {
  const params = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [typeId, setTypeId] = useState(params.get("type") || "");
  const [painSlug, setPainSlug] = useState(params.get("pain") || "");
  const [therapistId, setTherapistId] = useState(params.get("therapist") || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("Email");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [cancelled, setCancelled] = useState(false);

  const selectedType = APPOINTMENT_TYPES.find((t) => t.id === typeId);
  const selectedTherapist = THERAPISTS.find((t) => t.id === therapistId);
  const selectedPain = PAIN_POINTS.find((p) => p.slug === painSlug);

  const slotsForDate = useMemo(() => {
    return TIME_SLOTS.map((s) => ({
      slot: s,
      available: isSlotAvailable(date, s, therapistId || "any"),
    }));
  }, [date, therapistId]);

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!emailValid(email)) e.email = "Enter a valid email address.";
    if (!phoneValid(phone)) e.phone = "Enter a valid phone number.";
    if (!agreed) e.agreed = "Please accept the terms and cancellation policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (step === 1 && !typeId) return alert("Please choose an appointment type.");
    if (step === 3 && !date) return alert("Please select a date.");
    if (step === 4 && !time) return alert("Please select a time slot.");
    if (step === 5) {
      if (!validateDetails()) return;
      setSubmitting(true);
      setSubmitError("");
      try {
        const ref = generateBookingRef();
        // TODO: replace with a real POST to your backend, which should:
        // - check the slot is still free (prevent double booking) inside a transaction
        // - persist the booking to the database
        // - send a confirmation email to the patient
        // - notify the clinic administrator
        const res = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ref,
            patientName: name,
            email,
            phone,
            contactMethod,
            painPoint: selectedPain?.label || "",
            appointmentType: selectedType?.title || "",
            therapist: selectedTherapist?.name || "Any available therapist",
            date,
            time,
            notes,
          }),
        });
        if (!res.ok) throw new Error("Booking failed");
        setBookingRef(ref);
        setStep(6);
      } catch {
        setSubmitError(
          "We couldn't confirm your booking just now. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setStep((s) => (Math.min(s + 1, 6) as Step));
  };

  const back = () => step > 1 && step < 6 && setStep(((step as number) - 1) as Step);

  const calendarHref = useMemo(() => {
    if (!selectedType || !date) return "#";
    const text = encodeURIComponent(`${selectedType.title} — MoveWell Physiotherapy`);
    const details = encodeURIComponent(
      `Booking ref: ${bookingRef}\nTherapist: ${selectedTherapist?.name || "Any available"}`
    );
    const dateCompact = date.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${dateCompact}/${dateCompact}`;
  }, [selectedType, date, bookingRef, selectedTherapist]);

  if (cancelled) {
    return (
      <main>
        <Header />
        <section className="bg-beige py-20 text-center">
          <div className="max-w-[480px] mx-auto px-5">
            <h1 className="text-2xl mb-2">Appointment cancelled</h1>
            <p className="text-inksoft text-sm mb-6">
              Your booking {bookingRef} has been cancelled. No further action
              is needed.
            </p>
            <Link
              href="/"
              className="inline-block bg-teal text-white px-6 py-3 rounded-lg font-medium"
            >
              Return to homepage
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="bg-beige py-14">
        <div className="max-w-[680px] mx-auto px-5">
          <h1 className="text-2xl md:text-[28px] mb-1">Book an appointment</h1>
          <p className="text-inksoft text-sm mb-8">Takes about three minutes.</p>

          <div className="bg-white rounded-card border border-line p-6 md:p-8">
            {step < 6 && (
              <div className="flex gap-2 mb-7">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex-1 h-1 bg-line rounded overflow-hidden">
                    <div
                      className="h-full bg-teal transition-all"
                      style={{ width: step > i ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg mb-3">Choose appointment type</h2>
                <div className="space-y-2.5">
                  {APPOINTMENT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTypeId(t.id)}
                      className={`w-full text-left border rounded-lg p-3.5 ${
                        typeId === t.id ? "border-teal bg-accentsoft" : "border-line"
                      }`}
                    >
                      <div className="flex justify-between text-sm font-medium">
                        <span>{t.title}</span>
                        <span className="text-inksoft">{t.duration} min</span>
                      </div>
                      <p className="text-[12.5px] text-inksoft mt-1">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg mb-3">Select physiotherapist</h2>
                <div className="space-y-2.5">
                  {THERAPISTS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTherapistId(t.id)}
                      className={`w-full flex items-center gap-3 text-left border rounded-lg p-3.5 ${
                        therapistId === t.id ? "border-teal bg-accentsoft" : "border-line"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-tealdark text-white flex items-center justify-center text-xs font-semibold shrink-0">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-[12.5px] text-inksoft">
                          {t.specialty}
                          {t.experience ? ` · ${t.experience}` : ""}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg mb-3">Select a date</h2>
                <label className="block text-[13.5px] text-inksoft">
                  Appointment date
                  <input
                    type="date"
                    min={todayISO()}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime("");
                    }}
                    className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                  />
                </label>
                <p className="text-[12.5px] text-inksoft mt-2">
                  Past dates are disabled. Availability updates once a date is
                  chosen.
                </p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-lg mb-3">Select a time slot</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {slotsForDate.map(({ slot, available }) => (
                    <button
                      key={slot}
                      disabled={!available}
                      onClick={() => setTime(slot)}
                      aria-disabled={!available}
                      className={`border rounded-lg p-2.5 text-center text-sm ${
                        !available
                          ? "border-line text-inksoft/50 line-through cursor-not-allowed bg-beige"
                          : time === slot
                          ? "bg-tealdark text-white border-tealdark"
                          : "border-line bg-white"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <p className="text-[12.5px] text-inksoft mt-3">
                  Struck-through slots are already booked for this
                  therapist and date.
                </p>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-lg mb-3">Your details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block text-[13.5px] text-inksoft">
                    Full name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                    />
                    {errors.name && (
                      <span className="text-danger text-xs">{errors.name}</span>
                    )}
                  </label>
                  <label className="block text-[13.5px] text-inksoft">
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                    />
                    {errors.email && (
                      <span className="text-danger text-xs">{errors.email}</span>
                    )}
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <label className="block text-[13.5px] text-inksoft">
                    Phone number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                    />
                    {errors.phone && (
                      <span className="text-danger text-xs">{errors.phone}</span>
                    )}
                  </label>
                  <label className="block text-[13.5px] text-inksoft">
                    Preferred contact method
                    <select
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value)}
                      className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                    </select>
                  </label>
                </div>
                <label className="block text-[13.5px] text-inksoft mt-4">
                  Pain point
                  <select
                    value={painSlug}
                    onChange={(e) => setPainSlug(e.target.value)}
                    className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                  >
                    <option value="">Select area</option>
                    {PAIN_POINTS.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-[13.5px] text-inksoft mt-4">
                  Additional notes or instructions
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full mt-1.5 p-2.5 border border-line rounded-lg text-sm"
                  />
                </label>
                <label className="flex items-start gap-2.5 mt-4 text-[13px] text-inksoft">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5"
                  />
                  I accept the terms and cancellation policy.
                </label>
                {errors.agreed && (
                  <span className="text-danger text-xs block mt-1">
                    {errors.agreed}
                  </span>
                )}
                {submitError && (
                  <div className="mt-4 bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg p-3">
                    {submitError}
                  </div>
                )}
              </div>
            )}

            {step === 6 && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-teal text-white flex items-center justify-center mx-auto mb-4 text-2xl">
                    ✓
                  </div>
                  <h2 className="text-lg mb-1">
                    Your appointment has been successfully booked.
                  </h2>
                  <p className="text-inksoft text-sm">
                    A confirmation email has been sent to {email}.
                  </p>
                </div>

                <div className="border border-line rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>Booking reference</span>
                    <span>{bookingRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Patient</span>
                    <span>{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Pain point</span>
                    <span>{selectedPain?.label || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Appointment type</span>
                    <span>{selectedType?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Therapist</span>
                    <span>{selectedTherapist?.name || "Any available therapist"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Date</span>
                    <span>{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Time</span>
                    <span>{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Location</span>
                    <span>
                      {typeId === "online"
                        ? "Online — link sent by email"
                        : "24 Wellness Street, Your City"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mt-6">
                  <a
                    href={calendarHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-center border border-line rounded-lg py-2.5 text-sm font-medium text-tealdark"
                  >
                    Add to calendar
                  </a>
                  <button
                    onClick={() => setStep(3)}
                    className="text-center border border-line rounded-lg py-2.5 text-sm font-medium text-tealdark"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Cancel this appointment? This cannot be undone.")) {
                        setCancelled(true);
                      }
                    }}
                    className="text-center border border-danger/40 text-danger rounded-lg py-2.5 text-sm font-medium"
                  >
                    Cancel appointment
                  </button>
                  <Link
                    href="/"
                    className="text-center bg-teal text-white rounded-lg py-2.5 text-sm font-medium"
                  >
                    Return to homepage
                  </Link>
                </div>
              </div>
            )}

            {step < 6 && (
              <div className="flex justify-between mt-7">
                <button
                  onClick={back}
                  className={`px-5 py-3 rounded-lg border border-line text-tealdark font-medium ${
                    step === 1 ? "invisible" : ""
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={next}
                  disabled={submitting}
                  className="px-5 py-3 rounded-lg bg-teal text-white font-medium disabled:opacity-60"
                >
                  {submitting
                    ? "Confirming…"
                    : step === 5
                    ? "Confirm booking"
                    : "Continue"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookingFlowInner />
    </Suspense>
  );
}
