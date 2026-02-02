import dynamic from "next/dynamic";

const PasswordGenerator = dynamic(
  () =>
    import("./_components/PasswordGenerator").then((m) => m.PasswordGenerator),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-black">
        <div className="space-y-6">
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
    ),
  },
);

export default function Home() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground [background-image:radial-gradient(rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:24px_24px] dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]">
      <main className="mx-auto flex max-w-3xl items-center justify-center">
        <PasswordGenerator />
      </main>
    </div>
  );
}
