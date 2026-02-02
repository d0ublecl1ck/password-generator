import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "随机密码生成器";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "radial-gradient(circle at 15% 20%, rgba(24,24,27,0.08), transparent 60%), radial-gradient(circle at 85% 70%, rgba(24,24,27,0.10), transparent 55%), #ffffff",
          color: "#18181b",
        }}
      >
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          随机密码生成器
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            lineHeight: 1.2,
            fontWeight: 600,
            color: "rgba(24,24,27,0.78)",
          }}
        >
          一键生成随机密码、容易记住的密码与 PIN
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 28,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            color: "rgba(24,24,27,0.80)",
          }}
        >
          Local-first • 无需登录 • 复制即用
        </div>
      </div>
    ),
    size,
  );
}

