import { InteractionPayload, TrackingResponse } from "./types";

/**
 * Menghasilkan Session ID acak untuk melacak demonstrasi tanpa meminta identitas pengguna
 */
export function generateSessionId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "SES-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mendeteksi kategori perangkat dasar (non-sensitif)
 */
export function getDeviceInfo(): string {
  if (typeof window === "undefined") return "Server Side";
  const isMobile = window.innerWidth <= 768;
  return isMobile ? "Mobile Device" : "Desktop Workstation";
}

/**
 * Mengirim pencatatan interaksi ke endpoint /api/log yang terhubung ke Google Apps Script.
 * Dirancang resilient: jika jaringan terputus atau Google Apps Script lambat,
 * fungsi ini tidak akan menghambat alur navigasi pengguna.
 */
export async function trackInteraction(
  payload: InteractionPayload
): Promise<TrackingResponse> {
  // Cegah pencatatan duplikat untuk event yang sama dalam satu sesi
  if (typeof window !== "undefined") {
    const dedupeKey = `tracked_${payload.sessionId}_${payload.interactionType}`;
    if (sessionStorage.getItem(dedupeKey)) {
      return {
        success: true,
        message: "Interaksi sudah pernah dicatat sebelumnya (deduplicated).",
        sessionId: payload.sessionId,
      };
    }
  }

  try {
    const response = await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: TrackingResponse = await response.json();

    // Tandai sudah tercatat untuk mencegah duplikasi
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `tracked_${payload.sessionId}_${payload.interactionType}`,
        "true"
      );
    }

    return data;
  } catch (error) {
    console.warn("[Tracking Notice] Gagal mengirim log ke endpoint:", error);
    // Tetap kembalikan success agar navigasi pengguna tidak terblokir
    return {
      success: false,
      message: "Pencatatan offline atau endpoint belum aktif.",
      sessionId: payload.sessionId,
    };
  }
}
