import { PasswordGenerator } from "./_components/PasswordGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground [background-image:radial-gradient(rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:24px_24px] dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]">
      <main className="mx-auto flex max-w-3xl items-center justify-center">
        <PasswordGenerator />
      </main>
    </div>
  );
}
