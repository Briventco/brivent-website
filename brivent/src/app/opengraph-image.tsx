import { ImageResponse } from "next/og";

export const alt = "Brivent Global Innovations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
                    padding: "72px",
                    background: "linear-gradient(135deg, #050a2e 0%, #0a1250 100%)",
                    color: "#ffffff",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: "#152bf9",
                            display: "flex",
                        }}
                    />
                    <div style={{ fontSize: 34, fontWeight: 700 }}>Brivent</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
                        We engineer the systems businesses run on.
                    </div>
                    <div style={{ fontSize: 30, color: "#a9b4ff" }}>
                        Digital products, AI-powered systems, and infrastructure.
                    </div>
                </div>
                <div style={{ fontSize: 26, color: "#7f8cff" }}>brivent.co</div>
            </div>
        ),
        { ...size }
    );
}