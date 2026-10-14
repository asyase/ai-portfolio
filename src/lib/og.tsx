import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card used by the home page and every case study. */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #f3dcf9 0%, #fbe7f0 50%, #f8ead6 100%)",
          color: "#3a2040",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          <span>{site.name}</span>
          <span style={{ color: "#a3477d" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#a3477d", letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#5f4a63", borderTop: "1px solid rgba(58,32,64,0.15)", paddingTop: 28 }}>
          <span>{footer}</span>
          <span style={{ color: "#3a2040" }}>{site.role}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
