import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "随机密码生成器",
    template: "%s | 随机密码生成器",
  },
  description: "随机密码、容易记住的密码与 PIN 生成器。支持自定义长度与选项，一键复制。",
  applicationName: "随机密码生成器",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "随机密码生成器",
    title: "随机密码生成器",
    description: "随机密码、容易记住的密码与 PIN 生成器。支持自定义长度与选项，一键复制。",
  },
  twitter: {
    card: "summary_large_image",
    title: "随机密码生成器",
    description: "随机密码、容易记住的密码与 PIN 生成器。支持自定义长度与选项，一键复制。",
  },
  keywords: [
    "密码生成器",
    "随机密码",
    "强密码",
    "PIN 生成器",
    "memorable password",
    "password generator",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
