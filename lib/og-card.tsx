import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Kartu share (Open Graph) branded MOTE — di-generate otomatis saat build.
 * Dipakai oleh file `opengraph-image.tsx` tiap route agar tiap link punya
 * thumbnail relevan sesuai isinya (judul halaman + identitas MOTE).
 */
export function ogImage(eyebrow: string, title: string) {
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
          backgroundColor: "#06243B",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* aksen brand */}
        <div style={{ position: "absolute", top: "-150px", right: "-120px", width: "440px", height: "440px", borderRadius: "9999px", backgroundColor: "#BDF24A", opacity: 0.16, display: "flex" }} />
        <div style={{ position: "absolute", bottom: "-130px", left: "-110px", width: "360px", height: "360px", borderRadius: "9999px", backgroundColor: "#FF7E00", opacity: 0.14, display: "flex" }} />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.02em", color: "#ffffff", display: "flex" }}>MOTE</div>
          <div style={{ width: 14, height: 14, borderRadius: "9999px", backgroundColor: "#BDF24A", marginLeft: 12, display: "flex" }} />
        </div>

        {/* eyebrow + judul */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#06243B", backgroundColor: "#BDF24A", padding: "8px 20px", borderRadius: "9999px", letterSpacing: "0.06em", display: "flex" }}>
              {eyebrow}
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.12, marginTop: 30, color: "#ffffff", letterSpacing: "-0.02em", display: "flex" }}>
            {title}
          </div>
        </div>

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#BDF24A", display: "flex" }}>motekreatif.com</div>
          <div style={{ fontSize: 22, color: "#9DB3C2", display: "flex" }}>Digital Marketing · Garut</div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
