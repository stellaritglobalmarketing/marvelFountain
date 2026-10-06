"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/lib/contact-action";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, { ok: false });

  useEffect(() => {
    if (state.ok && state.sent) {
      formRef.current?.reset();
      alert("Thank you! We will contact you soon.");
    }
  }, [state]);

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-line bg-paper text-sm transition-all focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)]";

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-2xl bg-sand p-9.5 border border-line shadow-[0_2px_10px_rgba(13,21,38,0.04)]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 mb-4.5">
        <input type="text" name="name" placeholder="Your Name" required maxLength={120} className={inputClass} />
        <input type="tel" name="phone" placeholder="Phone Number" required maxLength={30} className={inputClass} />
      </div>
      <input type="email" name="email" placeholder="Email Address" required maxLength={190} className={`${inputClass} mb-4.5`} />
      <textarea name="message" placeholder="Tell us about your requirement..." required maxLength={5000} className={`${inputClass} resize-y min-h-[110px] mb-4.5`} />
      {state.error && <p className="mb-4.5 text-sm text-red-500">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-gold to-gold-deep py-4 font-semibold text-navy-deep text-xs tracking-widest uppercase shadow-[0_10px_24px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_14px_30px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_10px_rgba(212,175,55,0.35)] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
