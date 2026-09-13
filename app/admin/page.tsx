"use client";

import { useMemo, useState } from "react";
import {
  SEED_BOOKINGS,
  Booking,
  BookingStatus,
  THERAPISTS,
  PAIN_POINTS,
} from "@/lib/data";

// TODO: replace SEED_BOOKINGS with a real fetch from your database, and
// replace the in-memory setBookings calls below with real update requests
// (e.g. PATCH /api/bookings/:ref). This page also has no auth guard yet —
// add one before shipping (e.g. a simple password gate or real admin auth).

const STATUSES: BookingStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "No-show",
];

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);
  const [dateFilter, setDateFilter] = useState("");
  const [therapistFilter, setTherapistFilter] = useState("");
  const [painFilter, setPainFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (dateFilter && b.date !== dateFilter) return false;
      if (therapistFilter && b.therapist !== therapistFilter) return false;
      if (painFilter && b.painPoint !== painFilter) return false;
      if (statusFilter && b.status !== statusFilter) return false;
      return true;
    });
  }, [bookings, dateFilter, therapistFilter, painFilter, statusFilter]);

  const updateStatus = (ref: string, status: BookingStatus) => {
    setBookings((bs) => bs.map((b) => (b.ref === ref ? { ...b, status } : b)));
  };

  const cancelBooking = (ref: string) => {
    if (confirm("Cancel this appointment?")) {
      updateStatus(ref, "Cancelled");
    }
  };

  return (
    <main className="min-h-screen bg-beige">
      <header className="bg-white border-b border-line">
        <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between">
          <div className="font-serif text-lg text-tealdark">
            MoveWell — Admin
          </div>
          <a href="/" className="text-sm text-inksoft">
            Back to site
          </a>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-5 py-8">
        <h1 className="text-2xl mb-6">Appointments</h1>

        <div className="bg-white border border-line rounded-card p-4 grid sm:grid-cols-4 gap-3 mb-6">
          <label className="text-xs text-inksoft">
            Date
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full mt-1 p-2 border border-line rounded-lg text-sm"
            />
          </label>
          <label className="text-xs text-inksoft">
            Therapist
            <select
              value={therapistFilter}
              onChange={(e) => setTherapistFilter(e.target.value)}
              className="w-full mt-1 p-2 border border-line rounded-lg text-sm"
            >
              <option value="">All</option>
              {THERAPISTS.filter((t) => t.id !== "any").map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-inksoft">
            Pain point
            <select
              value={painFilter}
              onChange={(e) => setPainFilter(e.target.value)}
              className="w-full mt-1 p-2 border border-line rounded-lg text-sm"
            >
              <option value="">All</option>
              {PAIN_POINTS.map((p) => (
                <option key={p.slug} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-inksoft">
            Status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full mt-1 p-2 border border-line rounded-lg text-sm"
            >
              <option value="">All</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="bg-white border border-line rounded-card overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-xs text-inksoft border-b border-line">
                <th className="p-3">Ref</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Pain point</th>
                <th className="p-3">Type</th>
                <th className="p-3">Therapist</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.ref} className="border-b border-line last:border-none">
                  <td className="p-3 font-medium">{b.ref}</td>
                  <td className="p-3">{b.patientName}</td>
                  <td className="p-3">{b.painPoint}</td>
                  <td className="p-3">{b.appointmentType}</td>
                  <td className="p-3">{b.therapist}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.time}</td>
                  <td className="p-3">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(b.ref, e.target.value as BookingStatus)
                      }
                      className="border border-line rounded-lg px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => cancelBooking(b.ref)}
                      className="text-danger text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-inksoft">
                    No bookings match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
