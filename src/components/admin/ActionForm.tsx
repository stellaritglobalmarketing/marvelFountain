"use client";

import { useActionState, useEffect, useRef, startTransition } from "react";
import type { FormState } from "@/lib/admin/actions";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { errorBox, primaryButton, successBox } from "./styles";

// Small form wrapper for settings / password / login: shows the error or a "saved" note.
export default function ActionForm({
  action,
  submitLabel,
  successMessage = "Saved.",
  resetOnSuccess = false,
  children,
}: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  submitLabel: string;
  successMessage?: string;
  resetOnSuccess?: boolean;
  children: React.ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(action, {});

  useEffect(() => {
    if (state.ok && resetOnSuccess) formRef.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <form
      ref={formRef}
      // Submit manually so typed values stay put when the server returns an error
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
      className="space-y-5"
    >
      {children}
      {state.error && (
        <p className={errorBox}>
          <AlertCircle size={18} className="shrink-0" /> {state.error}
        </p>
      )}
      {state.ok && (
        <p className={successBox}>
          <CheckCircle2 size={18} className="shrink-0" /> {successMessage}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${primaryButton} w-full sm:w-auto`}>
        {pending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
