"use client";

import { useCallback, useMemo, useState } from "react";
import { Hash, Lightbulb, Shuffle } from "lucide-react";
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

function SegmentedControl({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (next: Mode) => void;
}) {
  const items: Array<{ value: Mode; label: string; icon: React.ReactNode }> = [
    { value: "random", label: "随机", icon: <Shuffle className="h-4 w-4" /> },
    {
      value: "memorable",
      label: "容易记住",
      icon: <Lightbulb className="h-4 w-4" />,
    },
    { value: "pin", label: "PIN", icon: <Hash className="h-4 w-4" /> },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={[
                "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-black dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-white/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-black/40 dark:hover:text-zinc-50",
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
  const state = checked ? "checked" : "unchecked";
  return (
    <label className="flex items-center gap-3">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        data-state={state}
        className={[
          "relative h-6 w-11 rounded-full transition-colors",
          "bg-zinc-200 dark:bg-zinc-800",
          "data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-50",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            "dark:bg-black",
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
      background: `linear-gradient(to right, rgb(24 24 27) ${pct}%, rgb(212 212 216) ${pct}%)`,
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full dark:opacity-90"
        style={trackStyle}
      />
      <div className="flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-black dark:text-zinc-200">
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
      ? {
          label: "字符",
          min: 8,
          max: 100,
          value: randomLength,
          set: setRandomLength,
        }
      : mode === "memorable"
        ? { label: "单词", min: 3, max: 15, value: wordCount, set: setWordCount }
        : { label: "位数", min: 3, max: 12, value: pinLength, set: setPinLength };

  return (
    <>
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-black">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              选择密码类型
            </h2>
            <SegmentedControl value={mode} onChange={setMode} />
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              自定义新密码
            </h3>
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

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
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              生成密码
            </h3>
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />

            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center dark:border-zinc-800 dark:bg-black">
              <div
                className={[
                  "mx-auto max-w-full break-words font-mono text-xl font-semibold tracking-wide",
                  "text-zinc-900 dark:text-zinc-50",
                ].join(" ")}
              >
                {value}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                className="h-12 rounded-xl bg-zinc-900 px-6 text-base font-semibold text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-600 dark:focus:ring-offset-black"
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
                className="h-12 rounded-xl border border-zinc-200 bg-white px-6 text-base font-semibold text-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-800 dark:bg-black dark:text-zinc-50 dark:hover:bg-zinc-900 dark:focus:ring-zinc-600 dark:focus:ring-offset-black"
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
