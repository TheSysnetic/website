"use client";

import { useState, type FormEvent } from "react";
import { services, site } from "@/lib/content";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/contact.php";
const budgets = ["< €5k", "€5k – €15k", "€15k – €50k", "€50k+", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("services", picked.join(", "));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
      setPicked([]);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass flex min-h-[28rem] flex-col items-start justify-center rounded-[2rem] bg-ink/60 p-10" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl">✓</span>
        <h2 className="display mt-8 text-4xl">Message received.</h2>
        <p className="mt-4 max-w-md text-muted">Thanks for reaching out — we&apos;ll get back to you shortly.</p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-sm text-fg/70 underline underline-offset-4 hover:text-fg">
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "peer w-full border-b border-line bg-transparent pb-3 pt-6 text-lg text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent";
  const label =
    "pointer-events-none absolute left-0 top-6 text-lg text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <form onSubmit={onSubmit} className="glass rounded-[2rem] bg-ink/60 p-6 md:p-10" noValidate={false}>
      <fieldset className="mb-10">
        <legend className="mb-4 text-sm text-muted">I&apos;m interested in…</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              type="button"
              key={s.slug}
              aria-pressed={picked.includes(s.title)}
              onClick={() => toggle(s.title)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                picked.includes(s.title) ? "border-accent bg-accent text-white" : "border-line text-fg/75 hover:border-white/40"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
          <label htmlFor="name" className={label}>Your name *</label>
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
          <label htmlFor="email" className={label}>Email *</label>
        </div>
        <div className="relative">
          <input id="company" name="company" autoComplete="organization" placeholder="Company" className={field} />
          <label htmlFor="company" className={label}>Company</label>
        </div>
        <div className="relative">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} />
          <label htmlFor="phone" className={label}>Phone</label>
        </div>
      </div>

      <fieldset className="mt-10">
        <legend className="mb-4 text-sm text-muted">Estimated budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line px-4 py-2 text-sm text-fg/75 transition-colors duration-300 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent hover:border-white/40">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative mt-10">
        <textarea id="message" name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>Tell us about your project *</label>
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted">
        By sending this form you agree that we process your details to answer your enquiry, as described in our{" "}
        <a href="/privacy-policy/" className="underline underline-offset-2 hover:text-fg">privacy policy</a>.
      </p>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-4 font-medium text-white shadow-[0_0_40px_-8px_var(--color-accent)] disabled:opacity-60"
          data-cursor="hide"
        >
          <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
          <span className="relative transition-colors duration-500 group-hover:text-ink">{status === "sending" ? "Sending…" : "Send message"}</span>
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-accent-2">
            {error} You can also email us at{" "}
            <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
