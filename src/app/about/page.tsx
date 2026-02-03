import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于",
  description:
    "一个离线可用的随机密码生成器：支持随机密码、容易记住的密码与 PIN 生成，一键复制。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-foreground">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          关于
        </h1>
        <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          这是一个简单的密码生成工具，目标是让你更快生成不同用途的强密码与 PIN。
        </p>
      </header>

      <section className="space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          安全说明
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>优先为每个网站使用不同密码，避免“一码通用”。</li>
          <li>建议搭配密码管理器，启用两步验证更稳妥。</li>
          <li>
            若用于重要账户，请选择更长的随机密码，并启用数字与符号。
          </li>
        </ul>
      </section>

      <footer className="mt-10 text-sm text-zinc-600 dark:text-zinc-300">
        <Link className="underline underline-offset-4" href="/">
          返回首页
        </Link>
      </footer>
    </main>
  );
}

