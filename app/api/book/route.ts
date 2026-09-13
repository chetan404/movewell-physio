import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// TODO — connect a real backend here:
// 1. Verify the requested date/time/therapist slot is still free inside a
//    DB transaction (SELECT ... FOR UPDATE or an equivalent) to prevent
//    double bookings under concurrent requests.
// 2. Insert the booking row into your bookings table (Postgres via
//    Supabase/Neon + Prisma or Drizzle recommended).
// 3. Send a confirmation email to the patient (Resend, Postmark, SES).
// 4. Send a notification to the clinic administrator (email/Slack/SMS).
// 5. Return the created booking (or a clear error) to the client.
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  const data = await request.json();

  if (!data.patientName || !data.email || !data.date || !data.time) {
    return NextResponse.json(
      { ok: false, error: "Missing required booking fields." },
      { status: 400 }
    );
  }

  console.log("New booking request:", data);

  return NextResponse.json({ ok: true, ref: data.ref });
}
