import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoveWell Physiotherapy — Move better. Feel stronger. Live pain-free.",
  description:
    "Personalized physiotherapy care designed around your body, your goals, and your recovery. Find the right treatment and book an appointment online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
