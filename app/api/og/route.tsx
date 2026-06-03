import { ImageResponse } from "next/og";

export const runtime = "edge";

const ACCENT = "#108a00";
const ACCENT2 = "#15b400";
const PILLS = ["WordPress", "Elementor", "GoHighLevel", "Shopify"];

// White, on-brand 1200×630 social card. Title/eyebrow/subtitle are dynamic via query params.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eyebrow = (searchParams.get("eyebrow") ?? "WordPress Developer").toUpperCase();
  const title = searchParams.get("title") ?? "Websites that turn visitors into real leads.";
  const subtitle =
    searchParams.get("subtitle") ??
    "WordPress, Shopify & web projects designed and built to convert — for clients worldwide.";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "62px 70px",
          fontFamily: "spacegrotesk, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`,
          }}
        />

        {/* Right — browser mockup */}
        <div style={{ position: "absolute", right: -70, top: 130, display: "flex" }}>
          <div
            style={{
              position: "absolute",
              left: 46,
              top: -28,
              width: 520,
              height: 360,
              borderRadius: 18,
              backgroundColor: "#f1f5f9",
              border: "1px solid #e2e8f0",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 520,
              height: 360,
              borderRadius: 18,
              backgroundColor: "#0f172a",
              display: "flex",
              flexDirection: "column",
              padding: 18,
            }}
          >
            <div style={{ display: "flex", marginBottom: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#ff5f57", display: "flex", marginRight: 8 }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#febc2e", display: "flex", marginRight: 8 }} />
              <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#28c840", display: "flex" }} />
            </div>
            <div style={{ height: 66, borderRadius: 10, display: "flex", backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, marginBottom: 16 }} />
            <div style={{ height: 14, width: "80%", borderRadius: 7, backgroundColor: "#334155", marginBottom: 10, display: "flex" }} />
            <div style={{ height: 14, width: "58%", borderRadius: 7, backgroundColor: "#334155", marginBottom: 22, display: "flex" }} />
            <div style={{ display: "flex" }}>
              <div style={{ width: 72, height: 46, borderRadius: 8, backgroundColor: "#1e293b", display: "flex", marginRight: 10 }} />
              <div style={{ width: 72, height: 46, borderRadius: 8, backgroundColor: "#1e293b", display: "flex", marginRight: 10 }} />
              <div style={{ width: 72, height: 46, borderRadius: 8, backgroundColor: "#1e293b", display: "flex" }} />
            </div>
          </div>
        </div>

        {/* Header — logo + name */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`,
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 800,
              marginRight: 18,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#0f172a", display: "flex" }}>Paul Puzon</div>
            <div style={{ fontSize: 17, color: "#64748b", letterSpacing: 1, display: "flex" }}>
            Helping businesses move from presence to performance.
            </div>
          </div>
        </div>

        {/* Middle — eyebrow + title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 6, color: ACCENT, display: "flex", marginBottom: 14 }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: -1.5, display: "flex" }}>
            {title}
          </div>
          <div style={{ fontSize: 24, color: "#475569", lineHeight: 1.4, marginTop: 18, display: "flex", maxWidth: 560 }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom — pills + stats */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", marginBottom: 22 }}>
            {PILLS.map((p) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 999,
                  padding: "8px 16px",
                  fontSize: 18,
                  color: "#0f172a",
                  marginRight: 12,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: ACCENT, display: "flex", marginRight: 8 }} />
                {p}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, color: "#64748b" }}>
            <span style={{ color: ACCENT, fontWeight: 700, marginRight: 6 }}>50+</span>
            <span style={{ color: "#0f172a", marginRight: 14 }}>Projects</span>
            <span style={{ color: "#cbd5e1", marginRight: 14 }}>|</span>
            <span style={{ color: ACCENT, fontWeight: 700, marginRight: 6 }}>4+</span>
            <span style={{ color: "#0f172a", marginRight: 14 }}>Years</span>
            <span style={{ color: "#cbd5e1", marginRight: 14 }}>|</span>
            <span>Based in the Philippines</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
