import { PasswordGeneratorClient } from "./_components/PasswordGeneratorClient";
import { absoluteUrl } from "@/lib/site";

export default function Home() {
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
    <div className="min-h-screen bg-background px-6 py-16 text-foreground [background-image:radial-gradient(rgba(0,0,0,0.07)_1px,transparent_1px)] [background-size:24px_24px] dark:[background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto w-full max-w-3xl">
        <header className="mx-auto mb-10 max-w-xl text-center">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            随机密码生成器
          </h1>
          <p className="mt-3 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-300">
            生成随机密码、容易记住的密码与 PIN。可自定义长度与选项，一键复制即用。
          </p>
        </header>

        <div className="flex justify-center">
          <PasswordGeneratorClient />
        </div>

        <section className="mx-auto mt-12 max-w-xl space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            使用建议
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>优先选择 12 位以上的随机密码，并开启数字与符号。</li>
            <li>每个网站/应用使用不同密码，搭配密码管理器更安全。</li>
            <li>PIN 建议避免生日、重复数字等容易猜到的组合。</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
