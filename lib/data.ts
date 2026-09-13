// ---------------------------------------------------------------------------
// MOCK DATA LAYER
// Everything in this file is placeholder content standing in for a real
// database. When a backend is connected, replace each export with a fetch
// to your API/DB (see TODO markers in app/api/book/route.ts and
// app/admin/page.tsx).
// ---------------------------------------------------------------------------

export type PainPoint = {
  slug: string;
  label: string;
  emoji: string;
  causes: string;
  treatments: string[];
  services: string[];
};

export const PAIN_POINTS: PainPoint[] = [
  {
    slug: "neck",
    label: "Neck pain",
    emoji: "🧍",
    causes:
      "Often linked to poor posture, prolonged screen use, or sleeping position. Can also follow a minor strain or whiplash.",
    treatments: ["Manual therapy", "Posture correction", "Exercise therapy"],
    services: ["Manual Therapy", "Posture Correction"],
  },
  {
    slug: "shoulder",
    label: "Shoulder pain",
    emoji: "💪",
    causes:
      "Commonly caused by rotator cuff strain, overuse from repetitive movement, or reduced joint mobility.",
    treatments: ["Manual therapy", "Exercise therapy", "Dry needling"],
    services: ["Manual Therapy", "Exercise Therapy"],
  },
  {
    slug: "back",
    label: "Back pain",
    emoji: "🦴",
    causes:
      "Frequently related to muscle strain, disc irritation, prolonged sitting, or weak core support.",
    treatments: ["Manual therapy", "Exercise therapy", "Chronic pain management"],
    services: ["Manual Therapy", "Chronic Pain Management"],
  },
  {
    slug: "knee",
    label: "Knee pain",
    emoji: "🦵",
    causes:
      "Can stem from ligament strain, cartilage wear, overuse in sport, or muscle imbalance around the joint.",
    treatments: ["Exercise therapy", "Sports rehabilitation", "Manual therapy"],
    services: ["Sports Rehabilitation", "Exercise Therapy"],
  },
  {
    slug: "hip",
    label: "Hip pain",
    emoji: "🚶",
    causes:
      "Often caused by tight hip flexors, joint stiffness, or compensations from lower back or knee issues.",
    treatments: ["Manual therapy", "Exercise therapy", "Posture correction"],
    services: ["Manual Therapy", "Posture Correction"],
  },
  {
    slug: "ankle-foot",
    label: "Ankle and foot pain",
    emoji: "🦶",
    causes:
      "Usually related to a sprain, overuse, flat/high arches, or altered gait after an injury.",
    treatments: ["Manual therapy", "Exercise therapy", "Sports rehabilitation"],
    services: ["Sports Rehabilitation", "Manual Therapy"],
  },
  {
    slug: "sports-injury",
    label: "Sports injury",
    emoji: "🏃",
    causes:
      "Acute injuries from training or competition — sprains, strains, or impact injuries needing a structured return-to-play plan.",
    treatments: ["Sports rehabilitation", "Manual therapy", "Exercise therapy"],
    services: ["Sports Rehabilitation"],
  },
  {
    slug: "post-surgery",
    label: "Post-surgery recovery",
    emoji: "🩹",
    causes:
      "Recovery after an operation, needing guided rehabilitation to safely restore strength, mobility, and function.",
    treatments: ["Post-operative rehabilitation", "Exercise therapy"],
    services: ["Post-Operative Rehabilitation"],
  },
  {
    slug: "mobility",
    label: "General mobility problems",
    emoji: "🧘",
    causes:
      "Stiffness or reduced range of motion from age, inactivity, or an underlying condition affecting daily movement.",
    treatments: ["Exercise therapy", "Posture correction", "Manual therapy"],
    services: ["Exercise Therapy", "Posture Correction"],
  },
];

export type AppointmentType = {
  id: string;
  title: string;
  duration: number; // minutes
  description: string;
};

export const APPOINTMENT_TYPES: AppointmentType[] = [
  {
    id: "initial",
    title: "Initial physiotherapy assessment",
    duration: 60,
    description: "Full evaluation and initial treatment for a new concern.",
  },
  {
    id: "followup",
    title: "Follow-up physiotherapy session",
    duration: 45,
    description: "Continuing care under an existing treatment plan.",
  },
  {
    id: "sports",
    title: "Sports injury consultation",
    duration: 60,
    description: "Assessment and return-to-play planning for an active injury.",
  },
  {
    id: "postsurgery",
    title: "Post-surgery rehabilitation",
    duration: 60,
    description: "Structured recovery session following an operation.",
  },
  {
    id: "online",
    title: "Online physiotherapy consultation",
    duration: 30,
    description: "Remote video consultation for guidance and exercise review.",
  },
];

export type Therapist = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  initials: string;
};

export const THERAPISTS: Therapist[] = [
  {
    id: "any",
    name: "Any available therapist",
    specialty: "Matched based on your needs",
    experience: "",
    initials: "★",
  },
  {
    id: "t1",
    name: "Dr. Amara Chen",
    specialty: "Sports rehabilitation",
    experience: "9 years experience",
    initials: "AC",
  },
  {
    id: "t2",
    name: "Dr. Daniel Reyes",
    specialty: "Manual therapy & posture",
    experience: "12 years experience",
    initials: "DR",
  },
  {
    id: "t3",
    name: "Dr. Priya Nair",
    specialty: "Post-operative rehabilitation",
    experience: "7 years experience",
    initials: "PN",
  },
];

export const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "2:30 PM",
  "4:00 PM",
  "5:30 PM",
];

// Deterministic mock "unavailability" so the demo feels alive without a
// real backend: a slot is unavailable if (dateSum + slotIndex + therapistIndex)
// is divisible by 3. Replace with a real availability query.
export function isSlotAvailable(
  date: string,
  slot: string,
  therapistId: string
): boolean {
  if (!date) return true;
  const dateSum = date
    .split("-")
    .reduce((sum, part) => sum + parseInt(part, 10), 0);
  const slotIndex = TIME_SLOTS.indexOf(slot);
  const therapistIndex = THERAPISTS.findIndex((t) => t.id === therapistId);
  return (dateSum + slotIndex + therapistIndex) % 3 !== 0;
}

export type Service = {
  title: string;
  icon: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    title: "Manual Therapy",
    icon: "🤲",
    description: "Hands-on techniques to ease pain and restore joint movement.",
  },
  {
    title: "Exercise Therapy",
    icon: "🏋️",
    description: "Guided, progressive exercise to rebuild strength and function.",
  },
  {
    title: "Sports Rehabilitation",
    icon: "🏃",
    description: "Structured recovery plans to get back to training and competition.",
  },
  {
    title: "Post-Operative Rehabilitation",
    icon: "🩹",
    description: "Safe, staged recovery support following surgery.",
  },
  {
    title: "Dry Needling",
    icon: "🪡",
    description: "Targeted needling to release tight, painful muscle trigger points.",
  },
  {
    title: "Posture Correction",
    icon: "🧍",
    description: "Assessment and correction of posture-related strain and pain.",
  },
  {
    title: "Chronic Pain Management",
    icon: "🌿",
    description: "Long-term strategies to manage and reduce persistent pain.",
  },
  {
    title: "Online Physiotherapy",
    icon: "💻",
    description: "Remote consultations and exercise guidance from home.",
  },
];

export type Testimonial = {
  name: string;
  rating: number;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sofia M.",
    rating: 5,
    quote:
      "Placeholder testimonial — after a few sessions my back pain was manageable for the first time in months.",
  },
  {
    name: "James O.",
    rating: 5,
    quote:
      "Placeholder testimonial — the post-surgery plan was clear and the team checked in constantly.",
  },
  {
    name: "Priya K.",
    rating: 4,
    quote:
      "Placeholder testimonial — booking online was quick and the therapist matched my sport-specific needs well.",
  },
];

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No-show";

export type Booking = {
  ref: string;
  patientName: string;
  email: string;
  phone: string;
  contactMethod: string;
  painPoint: string;
  appointmentType: string;
  therapist: string;
  date: string;
  time: string;
  notes: string;
  status: BookingStatus;
};

export function generateBookingRef(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `MW-${rand}`;
}

// A small in-memory seed so the admin dashboard has something to filter/show.
// TODO: replace with real bookings fetched from the database.
export const SEED_BOOKINGS: Booking[] = [
  {
    ref: "MW-7QK2P",
    patientName: "Alex Turner",
    email: "alex@example.com",
    phone: "+1 555 019 2231",
    contactMethod: "Phone",
    painPoint: "Back pain",
    appointmentType: "Initial physiotherapy assessment",
    therapist: "Dr. Daniel Reyes",
    date: "2026-09-15",
    time: "10:00 AM",
    notes: "Pain worse in the morning, ~3 weeks.",
    status: "Confirmed",
  },
  {
    ref: "MW-3LX9B",
    patientName: "Mira Haddad",
    email: "mira@example.com",
    phone: "+1 555 044 7710",
    contactMethod: "Email",
    painPoint: "Sports injury",
    appointmentType: "Sports injury consultation",
    therapist: "Dr. Amara Chen",
    date: "2026-09-16",
    time: "2:30 PM",
    notes: "Ankle sprain during a match.",
    status: "Pending",
  },
];
