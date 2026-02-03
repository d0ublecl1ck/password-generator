import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "说明本应用如何处理数据与隐私。",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-foreground">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          隐私政策
        </h1>
        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          本页面用于说明你在使用本应用时的数据与隐私相关事项。
        </p>
      </header>

      <section className="space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          我们收集什么
        </h2>
        <p>
          本应用不要求你登录，也不需要你提交个人信息即可使用主要功能。
        </p>

        <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          你生成的内容
        </h2>
        <p>
          你在页面上生成的密码与 PIN 属于你自己的内容。建议在公共设备上使用后及时清理剪贴板记录。
        </p>

        <h2 className="pt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          变更
        </h2>
        <p>如本政策有更新，会在本页面进行说明。</p>
      </section>

      <footer className="mt-10 flex gap-4 text-sm text-zinc-600 dark:text-zinc-300">
        <Link className="underline underline-offset-4" href="/">
          返回首页
        </Link>
        <Link className="underline underline-offset-4" href="/about">
          关于
        </Link>
      </footer>
    </main>
  );
}

