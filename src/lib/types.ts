/**
 * Tipe data untuk pencatatan interaksi non-sensitif
 * Tanpa password, OTP, token, atau informasi autentikasi.
 */
export interface InteractionPayload {
  sessionId: string;
  timestamp: string;
  interactionType: string;
  status: string;
  deviceInfo?: string;
}

export interface TrackingResponse {
  success: boolean;
  message: string;
  sessionId?: string;
  warning?: string;
}
