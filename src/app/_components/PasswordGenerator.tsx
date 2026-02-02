"use client";

import { useCallback, useMemo, useState } from "react";
import {
  generateMemorablePassword,
  generatePin,
  generateRandomPassword,
} from "@/lib/generators";
import { Toast, useToast } from "./Toast";

type Mode = "random" | "memorable" | "pin";

function clampInt(value: number, min: number, max: number) {
  const v = Math.trunc(value);
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

function IconShuffle() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M16 3h5v5m-6.5 6.5L21 8M3 6h5c3 0 5 2 7 4l2 2c2 2 4 4 7 4h-3M16 21h5v-5m-6.5-6.5L21 16M3 18h5c3 0 5-2 7-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBulb() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M9 18h6m-5 3h4M8 11a4 4 0 1 1 8 0c0 1.2-.6 2.3-1.5 3.1-.6.5-1.1 1.2-1.2 1.9H11c-.1-.7-.6-1.4-1.2-1.9C8.6 13.3 8 12.2 8 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHash() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M10 3 8 21M16 3l-2 18M4 8h17M3 16h17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SegmentedControl({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (next: Mode) => void;
}) {
  const items: Array<{ value: Mode; label: string; icon: React.ReactNode }> = [
    { value: "random", label: "随机", icon: <IconShuffle /> },
    { value: "memorable", label: "容易记住", icon: <IconBulb /> },
    { value: "pin", label: "PIN", icon: <IconHash /> },
  ];

  return (
    <div className="rounded-xl bg-zinc-100 p-2">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={[
                "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:bg-white/60 hover:text-zinc-900",
              ].join(" ")}
              aria-pressed={active}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="text-sm text-zinc-500">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={[
          "relative h-7 w-12 rounded-full transition-colors",
          checked ? "bg-blue-600" : "bg-zinc-400",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          ].join(" ")}
        />
      </button>
    </label>
  );
}

function RangeRow({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle = useMemo(() => {
    return {
      background: `linear-gradient(to right, rgb(37 99 235) ${pct}%, rgb(161 161 170) ${pct}%)`,
    } as const;
  }, [pct]);

  return (
    <div className="grid grid-cols-[56px_1fr_64px] items-center gap-4">
      <div className="text-sm text-zinc-500 leading-5">
        {label.split("").map((c, idx) => (
          <div key={`${c}-${idx}`}>{c}</div>
        ))}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(clampInt(Number(e.target.value), min, max))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full"
        style={trackStyle}
      />
      <div className="flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700">
        {value}
      </div>
    </div>
  );
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "true");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export function PasswordGenerator() {
  const [mode, setMode] = useState<Mode>("random");

  const [randomLength, setRandomLength] = useState(8);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);

  const [wordCount, setWordCount] = useState(4);
  const [capitalize, setCapitalize] = useState(false);
  const [fullWords, setFullWords] = useState(true);

  const [pinLength, setPinLength] = useState(6);

  const [refreshKey, setRefreshKey] = useState(0);
  const { toast, showToast } = useToast();

  const regenerate = useCallback(() => setRefreshKey((k) => k + 1), []);

  const value = useMemo(() => {
    void refreshKey;
    if (mode === "random") {
      return generateRandomPassword({
        length: randomLength,
        numbers: useNumbers,
        symbols: useSymbols,
      });
    }
    if (mode === "memorable") {
      return generateMemorablePassword({
        words: wordCount,
        capitalize,
        fullWords,
      });
    }
    return generatePin({ length: pinLength });
  }, [
    mode,
    randomLength,
    useNumbers,
    useSymbols,
    wordCount,
    capitalize,
    fullWords,
    pinLength,
    refreshKey,
  ]);

  const rangeConfig =
    mode === "random"
      ? { label: "字符", min: 8, max: 100, value: randomLength, set: setRandomLength }
      : mode === "memorable"
        ? { label: "单词", min: 3, max: 15, value: wordCount, set: setWordCount }
        : { label: "位数", min: 3, max: 12, value: pinLength, set: setPinLength };

  return (
    <>
      <div className="w-full max-w-xl rounded-[28px] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
        <div className="space-y-5">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900">选择密码类型</h2>
            <SegmentedControl value={mode} onChange={setMode} />
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-zinc-900">自定义新密码</h3>
            <div className="h-px w-full bg-zinc-200" />

            <RangeRow
              label={rangeConfig.label}
              min={rangeConfig.min}
              max={rangeConfig.max}
              value={rangeConfig.value}
              onChange={rangeConfig.set}
            />

            {mode === "random" ? (
              <div className="flex items-center gap-10">
                <Switch
                  label="数字"
                  checked={useNumbers}
                  onCheckedChange={setUseNumbers}
                />
                <Switch
                  label="符号"
                  checked={useSymbols}
                  onCheckedChange={setUseSymbols}
                />
              </div>
            ) : null}

            {mode === "memorable" ? (
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <Switch
                  label="首字母大写"
                  checked={capitalize}
                  onCheckedChange={setCapitalize}
                />
                <Switch
                  label="使用完整单词"
                  checked={fullWords}
                  onCheckedChange={setFullWords}
                />
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-zinc-900">生成密码</h3>
            <div className="h-px w-full bg-zinc-200" />

            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center">
              <div
                className={[
                  "mx-auto max-w-full break-words text-xl font-semibold tracking-wide",
                  mode === "random" || mode === "pin"
                    ? "text-blue-600"
                    : "text-zinc-900",
                ].join(" ")}
              >
                {value}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                className="h-12 rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={async () => {
                  try {
                    await copyToClipboard(value);
                    showToast("已复制到剪贴板");
                  } catch {
                    showToast("复制失败，请重试");
                  }
                }}
              >
                复制密码
              </button>
              <button
                type="button"
                className="h-12 rounded-xl border-2 border-blue-600 bg-white px-6 text-base font-semibold text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={regenerate}
              >
                刷新密码
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast open={toast.open} message={toast.message} />
    </>
  );
}
