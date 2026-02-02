"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ToastState = { open: boolean; message: string };

export function useToast(durationMs: number = 1600) {
  const [toast, setToast] = useState<ToastState>({ open: false, message: "" });
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (message: string) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setToast({ open: true, message });
      timerRef.current = window.setTimeout(() => {
        setToast({ open: false, message: "" });
        timerRef.current = null;
      }, durationMs);
    },
    [durationMs],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { toast, showToast };
}

export function Toast({ open, message }: ToastState) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={[
        "pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center",
        open ? "opacity-100" : "opacity-0",
        "transition-opacity duration-200",
      ].join(" ")}
    >
      <div className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur dark:border-zinc-200 dark:bg-zinc-50 dark:text-zinc-900">
        {message}
      </div>
    </div>
  );
}
