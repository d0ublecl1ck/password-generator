"use client";

import { useSyncExternalStore } from "react";
import { PasswordGenerator } from "./PasswordGenerator";

function Skeleton() {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="h-6 w-32 rounded bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-10 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900" />
        </div>
        <div className="space-y-4">
          <div className="h-5 w-28 rounded bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
        </div>
        <div className="space-y-4">
          <div className="h-5 w-28 rounded bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-24 w-full rounded-xl bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}

export function PasswordGeneratorClient() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return <Skeleton />;
  return <PasswordGenerator />;
}
