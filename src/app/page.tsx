import { PasswordGenerator } from "./_components/PasswordGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1c2c63] px-6 py-14">
      <main className="mx-auto flex max-w-3xl items-center justify-center">
        <PasswordGenerator />
      </main>
    </div>
  );
}
