import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { isRateLimited } from "@/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,}$/;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many booking attempts. Please try again later." },
      { status: 429 }
    );
  }

  const data = await request.json();

  const errors: string[] = [];
  if (!data.patientName || typeof data.patientName !== "string" || data.patientName.trim().length < 2) {
    errors.push("A valid full name is required.");
  }
  if (!data.email || !EMAIL_RE.test(data.email)) {
    errors.push("A valid email address is required.");
  }
  if (!data.phone || !PHONE_RE.test(data.phone)) {
    errors.push("A valid phone number is required.");
  }
  if (!data.date || isNaN(Date.parse(data.date))) {
    errors.push("A valid date is required.");
  }
  if (!data.time || typeof data.time !== "string") {
    errors.push("A time slot is required.");
  }
  if (!data.ref || typeof data.ref !== "string") {
    errors.push("Missing booking reference.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  // Cap string field lengths to prevent abuse via oversized payloads
  const clip = (s: string, max: number) => (typeof s === "string" ? s.slice(0, max) : s);

  try {
    const booking = await prisma.booking.create({
      data: {
        ref: clip(data.ref, 20),
        patientName: clip(data.patientName, 100),
        email: clip(data.email, 200),
        phone: clip(data.phone, 30),
        contactMethod: clip(data.contactMethod || "Email", 20),
        painPoint: clip(data.painPoint || "", 100),
        appointmentType: clip(data.appointmentType || "", 100),
        date: data.date,
        time: data.time,
        notes: clip(data.notes || "", 1000),
      },
    });

    await resend.emails.send({
      from: "MoveWell <onboarding@resend.dev>",
      to: data.email,
      subject: "Your MoveWell appointment is confirmed",
      html:
        "<p>Hi " + booking.patientName + ",</p>" +
        "<p>Your appointment (" + booking.appointmentType + ") is booked for " +
        booking.date + " at " + booking.time + ".</p>" +
        "<p>Booking reference: <strong>" + booking.ref + "</strong></p>",
    });

    await resend.emails.send({
      from: "MoveWell <onboarding@resend.dev>",
      to: "hello@movewell.com",
      subject: "New booking: " + booking.ref,
      html:
        "<p>New booking from " + booking.patientName + " (" + booking.email + ", " +
        booking.phone + ") for " + booking.date + " at " + booking.time + ".</p>",
    });

    return NextResponse.json({ ok: true, ref: booking.ref });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { ok: false, error: "That time slot was just booked. Please choose another." },
        { status: 409 }
      );
    }
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your booking." },
      { status: 500 }
    );
  }
}
