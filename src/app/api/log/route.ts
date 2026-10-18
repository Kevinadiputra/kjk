import { NextRequest, NextResponse } from "next/server";
import { InteractionPayload, TrackingResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest
): Promise<NextResponse<TrackingResponse>> {
  try {
    const rawBody = await request.json();
    const data = rawBody as Partial<InteractionPayload> & Record<string, unknown>;

    // 1. Audit Keamanan & Privasi: Cegah transmisi kata sandi atau data autentikasi
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

    // 2. Sanitasi & Siapkan payload non-sensitif
    const sanitizedPayload: InteractionPayload = {
      sessionId: String(data.sessionId || "SES-UNKNOWN").slice(0, 30),
      timestamp: String(data.timestamp || new Date().toISOString()).slice(0, 50),
      interactionType: String(data.interactionType || "BUTTON_CLICK").slice(0, 50),
      status: String(data.status || "SUCCESS").slice(0, 50),
      deviceInfo: String(data.deviceInfo || "Web Client").slice(0, 50),
    };

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    // 3. Jika URL Google Apps Script belum dikonfigurasi
    if (!googleScriptUrl || googleScriptUrl.trim() === "") {
      console.warn(
        "[API Log] GOOGLE_SCRIPT_URL belum dikonfigurasi di .env.local atau Vercel. Log interaksi:",
        sanitizedPayload
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Interaksi berhasil dicatat di sesi lokal. Untuk menyimpan ke Google Sheets, konfigurasikan GOOGLE_SCRIPT_URL.",
          sessionId: sanitizedPayload.sessionId,
          warning: "GOOGLE_SCRIPT_URL_NOT_CONFIGURED",
        },
        { status: 200 }
      );
    }

    // 4. Kirim ke Google Apps Script Web App
    try {
      const scriptResponse = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedPayload),
        redirect: "follow",
      });

      if (!scriptResponse.ok) {
        console.warn(
          `[API Log] Google Apps Script mengembalikan status HTTP ${scriptResponse.status}`
        );
      }
    } catch (scriptError) {
      console.warn(
        "[API Log] Gagal menghubungi Google Apps Script:",
        scriptError instanceof Error ? scriptError.message : scriptError
      );
      // Tetap kembalikan 200 agar navigasi pengguna tidak terganggu
    }

    return NextResponse.json(
      {
        success: true,
        message: "Interaksi berhasil dicatat ke Google Sheets.",
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
