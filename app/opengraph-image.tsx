import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
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
          background:
            "radial-gradient(circle at 85% 30%, rgba(255,122,69,0.38), rgba(10,10,11,0) 45%), radial-gradient(circle at 70% 85%, rgba(58,209,196,0.16), rgba(10,10,11,0) 40%), #0a0a0b",
          color: "#f3f0ea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#8d8a84", letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#ff7a45" }} />
          {`${site.role} · ${site.location}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>Muhammad</div>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>Usman Saeed</div>
        </div>
        <div style={{ display: "flex", gap: 56, borderTop: "1px solid #36363c", paddingTop: 28 }}>
          {hero.stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: "#ff7a45" }}>{s.value}</div>
              <div style={{ fontSize: 20, color: "#8d8a84", maxWidth: 300 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
