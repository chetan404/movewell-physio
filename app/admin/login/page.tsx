"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-beige">
      <form onSubmit={submit} className="bg-white p-8 rounded-card border border-line w-full max-w-sm">
        <h1 className="text-xl mb-4">Admin login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2.5 border border-line rounded-lg text-sm mb-3"
        />
        {error && <p className="text-danger text-xs mb-3">{error}</p>}
        <button className="w-full bg-teal text-white py-2.5 rounded-lg font-medium">
          Log in
        </button>
      </form>
    </main>
  );
}
