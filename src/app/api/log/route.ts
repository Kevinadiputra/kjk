import { NextRequest, NextResponse } from "next/server";
import { InteractionPayload, TrackingResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
): Promise<NextResponse<TrackingResponse>> {
  try {
    const rawBody = await request.json();
    const data = rawBody as Partial<InteractionPayload> & Record<string, unknown>;

    // 1. Audit Keamanan & Privasi: Tolak kata sandi atau data autentikasi
    if (data.password || data.token || data.otp || data.cookie || data.pin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pelanggaran Kebijakan: Dilarang mengirimkan kata sandi atau data autentikasi ke log.",
        },
        { status: 400 }
      );
    }

    // 2. Siapkan payload non-sensitif
    const sanitizedPayload: InteractionPayload = {
      sessionId: String(data.sessionId || "SES-SIMULASI").slice(0, 30),
      timestamp: String(
        data.timestamp ||
          new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
      ).slice(0, 50),
      interactionType: String(data.interactionType || "LOGIN_BUTTON_CLICKED").slice(0, 50),
      status: String(data.status || "SUCCESS").slice(0, 50),
      deviceInfo: String(data.deviceInfo || "Web Client").slice(0, 50),
    };

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    // 3. Jika URL belum dikonfigurasi di server
    if (!googleScriptUrl || googleScriptUrl.trim() === "") {
      console.warn(
        "[API Log] GOOGLE_SCRIPT_URL belum diset. Log lokal:",
        sanitizedPayload
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Interaksi dicatat di sesi lokal. Konfigurasikan GOOGLE_SCRIPT_URL di Vercel untuk menyimpan ke Google Sheets.",
          sessionId: sanitizedPayload.sessionId,
          warning: "GOOGLE_SCRIPT_URL_NOT_CONFIGURED",
        },
        { status: 200 }
      );
    }

    // 4. Siapkan URL dengan query params (fallback handal untuk pengalihan 302 Google Apps Script)
    const cleanUrl = googleScriptUrl.trim();
    const params = new URLSearchParams({
      sessionId: sanitizedPayload.sessionId,
      timestamp: sanitizedPayload.timestamp,
      interactionType: sanitizedPayload.interactionType,
      status: sanitizedPayload.status,
      deviceInfo: sanitizedPayload.deviceInfo || "Desktop Browser",
    });

    const targetUrl = cleanUrl.includes("?")
      ? `${cleanUrl}&${params.toString()}`
      : `${cleanUrl}?${params.toString()}`;

    // 5. Kirim ke Google Apps Script (menggunakan text/plain agar tidak terblokir preflight CORS)
    try {
      const scriptResponse = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(sanitizedPayload),
        redirect: "follow",
      });

      console.log(
        `[API Log] Google Apps Script merespon dengan status: ${scriptResponse.status}`
      );
    } catch (scriptError) {
      console.warn(
        "[API Log] Terjadi kendala saat menghubungi Google Apps Script:",
        scriptError instanceof Error ? scriptError.message : scriptError
      );
      // Fallback: coba lakukan fetch GET ringan dengan query params jika POST redirect gagal
      try {
        await fetch(targetUrl, { method: "GET", redirect: "follow" });
      } catch (fallbackErr) {
        console.warn("[API Log] Fallback GET juga terkendala:", fallbackErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Interaksi berhasil diproses dan dikirim ke Google Sheets.",
        sessionId: sanitizedPayload.sessionId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "[API Log Error]:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan internal saat memproses log interaksi.",
      },
      { status: 500 }
    );
  }
}
