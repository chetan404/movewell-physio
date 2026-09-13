"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PAIN_POINTS, APPOINTMENT_TYPES, THERAPISTS } from "@/lib/data";

const DURATIONS = [
  "Less than one week",
  "One to four weeks",
  "One to three months",
  "More than three months",
];
const SEVERITIES = ["Mild", "Moderate", "Severe"];
const GOALS = [
  "Pain relief",
  "Improve mobility",
  "Recover from injury",
  "Return to sports",
  "Post-surgery rehabilitation",
  "Improve posture or strength",
];

function recommend(params: {
  pain: string;
  duration: string;
  severity: string;
  goal: string;
}) {
  let typeId = "initial";
  if (params.goal === "Return to sports") typeId = "sports";
  else if (params.goal === "Post-surgery rehabilitation") typeId = "postsurgery";
  else if (params.duration === "More than three months" && params.severity !== "Severe")
    typeId = "followup";
  else if (params.severity === "Mild" && params.duration === "Less than one week")
    typeId = "online";

  const type = APPOINTMENT_TYPES.find((t) => t.id === typeId)!;

  let therapist = THERAPISTS[0];
  if (typeId === "sports") therapist = THERAPISTS[1];
  else if (typeId === "postsurgery") therapist = THERAPISTS[3];
  else if (params.pain === "neck" || params.pain === "hip") therapist = THERAPISTS[2];

  const reason = `Based on a ${params.severity.toLowerCase()} ${
    PAIN_POINTS.find((p) => p.slug === params.pain)?.label.toLowerCase() ??
    "concern"
  } present for ${params.duration.toLowerCase()}, with a goal of ${params.goal.toLowerCase()}, this appointment type gives the right depth of assessment to start safely.`;

  return { type, therapist, reason };
}

function RecommendFlow() {
  const searchParams = useSearchParams();
  const initialPain = searchParams.get("pain") || "";

  const [step, setStep] = useState(1);
  const [pain, setPain] = useState(initialPain);
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [goal, setGoal] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const total = 5;

  const next = () => {
    if (step === 1 && !pain) return alert("Please select a pain location.");
    if (step === 2 && !duration) return alert("Please select a duration.");
    if (step === 3 && !severity) return alert("Please select a severity.");
    if (step === 4 && !goal) return alert("Please select your main goal.");
    if (step === total) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  };
  const back = () => step > 1 && setStep((s) => s - 1);

  const result = done ? recommend({ pain, duration, severity, goal }) : null;

  return (
    <main>
      <Header />
      <section className="bg-beige py-14">
        <div className="max-w-[640px] mx-auto px-5">
          <h1 className="text-2xl md:text-[28px] mb-1">
            Find the right appointment
          </h1>
          <p className="text-inksoft text-sm mb-8">
            A few quick questions to recommend the best next step.
          </p>

          <div className="bg-white rounded-card border border-line p-6 md:p-8">
            {!done && (
              <div className="flex gap-2 mb-7">
                {Array.from({ length: total }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 bg-line rounded overflow-hidden"
                  >
                    <div
                      className="h-full bg-teal transition-all"
                      style={{ width: step > i ? "100%" : "0%" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {!done && step === 1 && (
              <div>
                <h2 className="text-lg mb-3">Select your pain location</h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {PAIN_POINTS.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => setPain(p.slug)}
                      className={`text-left border rounded-lg p-3 text-sm ${
                        pain === p.slug
                          ? "border-teal bg-accentsoft"
                          : "border-line"
                      }`}
                    >
                      {p.emoji} {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!done && step === 2 && (
              <div>
                <h2 className="text-lg mb-3">How long has this been going on?</h2>
                <div className="space-y-2.5">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`w-full text-left border rounded-lg p-3 text-sm ${
                        duration === d ? "border-teal bg-accentsoft" : "border-line"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!done && step === 3 && (
              <div>
                <h2 className="text-lg mb-3">How severe is the pain?</h2>
                <div className="grid grid-cols-3 gap-2.5">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`border rounded-lg p-3 text-sm ${
                        severity === s ? "border-teal bg-accentsoft" : "border-line"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!done && step === 4 && (
              <div>
                <h2 className="text-lg mb-3">What&apos;s your main goal?</h2>
                <div className="space-y-2.5">
                  {GOALS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`w-full text-left border rounded-lg p-3 text-sm ${
                        goal === g ? "border-teal bg-accentsoft" : "border-line"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!done && step === 5 && (
              <div>
                <h2 className="text-lg mb-3">
                  Anything else your physiotherapist should know?
                </h2>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional — special instructions or concerns"
                  className="w-full p-3 border border-line rounded-lg text-sm"
                />
              </div>
            )}

            {done && result && (
              <div>
                <h2 className="text-lg mb-1">Recommended appointment</h2>
                <p className="text-xs text-inksoft mb-5">
                  This recommendation is for appointment guidance only and
                  does not replace a medical diagnosis.
                </p>

                <div className="border border-line rounded-lg p-4 space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-inksoft">Appointment type</span>
                    <span className="font-medium">{result.type.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Estimated duration</span>
                    <span className="font-medium">{result.type.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-inksoft">Suggested therapist</span>
                    <span className="font-medium">{result.therapist.name}</span>
                  </div>
                  <div className="pt-2 border-t border-line text-inksoft">
                    {result.reason}
                  </div>
                </div>

                <Link
                  href={`/book?type=${result.type.id}&pain=${pain}&therapist=${result.therapist.id}`}
                  className="block text-center bg-teal text-white px-6 py-3.5 rounded-lg font-medium hover:bg-tealdark transition"
                >
                  Book this appointment
                </Link>
              </div>
            )}

            {!done && (
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
                  className="px-5 py-3 rounded-lg bg-teal text-white font-medium"
                >
                  {step === total ? "Get recommendation" : "Continue"}
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

export default function RecommendPage() {
  return (
    <Suspense fallback={null}>
      <RecommendFlow />
    </Suspense>
  );
}
