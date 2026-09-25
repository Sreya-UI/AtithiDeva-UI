export const dynamic = "force-static";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — hotel property management system`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const states = [
  { label: "Available", color: "#5c6e4c" },
  { label: "Occupied", color: "#96762f" },
  { label: "Cleaning", color: "#46606e" },
  { label: "Maintenance", color: "#a0543c" },
];

/** Social card. Rendered at build time, no network access required. */
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
          background: "#f8fafd",
          padding: 72,
          color: "#161c22",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26 }}>
          <div style={{ width: 40, height: 1, background: "#c9ae73" }} />
          <span style={{ letterSpacing: 2, color: "#78838d" }}>ATITHIDEVA</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 66, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 900 }}>
            Every part of the property, on one board.
          </div>
          <div style={{ fontSize: 28, color: "#46525c", maxWidth: 820, lineHeight: 1.45 }}>
            Front desk, rooms, housekeeping, restaurant, banquets, billing and the night audit.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {states.map((state) => (
            <div
              key={state.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid #d8e2ec",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 22,
                color: "#46525c",
                background: "#ffffff",
              }}
            >
              <div
                style={{ width: 10, height: 10, borderRadius: 999, background: state.color }}
              />
              {state.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
