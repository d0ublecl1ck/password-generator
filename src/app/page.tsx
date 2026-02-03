import { PasswordGeneratorClient } from "./_components/PasswordGeneratorClient";
import { absoluteUrl } from "@/lib/site";
import Link from "next/link";
import { Github } from "lucide-react";
import { getGithubUrl } from "@/lib/github";

export default function Home() {
  const githubUrl = getGithubUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "随机密码生成器",
    description: "随机密码、容易记住的密码与 PIN 生成器。支持自定义长度与选项，一键复制。",
    url: absoluteUrl("/"),
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10 text-foreground [background-image:radial-gradient(rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:24px_24px] md:py-12 lg:px-10 dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="max-w-2xl">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              随机密码生成器
            </h1>
            <p className="mt-3 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
              生成随机密码、容易记住的密码与 PIN。可自定义长度与选项，一键复制即用。
            </p>
          </div>

          {githubUrl ? (
            <a
              aria-label="在 GitHub 查看项目"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 dark:border-zinc-800 dark:bg-black dark:text-zinc-200 dark:hover:bg-zinc-900"
              href={githubUrl}
              rel="noreferrer noopener"
              target="_blank"
              title="GitHub"
            >
              <Github aria-hidden="true" className="h-5 w-5" />
            </a>
          ) : null}
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="w-full">
            <PasswordGeneratorClient />
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-black">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                使用建议
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                <li>优先选择 12 位以上的随机密码，并开启数字与符号。</li>
                <li>每个网站/应用使用不同密码，搭配密码管理器更安全。</li>
                <li>PIN 建议避免生日、重复数字等容易猜到的组合。</li>
              </ul>
            </section>

            <footer className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-black dark:text-zinc-300">
              <nav className="flex flex-wrap gap-x-4 gap-y-2">
                <Link className="underline underline-offset-4" href="/about">
                  关于
                </Link>
                <Link className="underline underline-offset-4" href="/privacy">
                  隐私政策
                </Link>
              </nav>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
