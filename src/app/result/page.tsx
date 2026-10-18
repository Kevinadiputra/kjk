"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Shield,
  ArrowLeft,
  FileSpreadsheet,
  Layers,
  Activity,
  Lock,
  Smartphone,
  Monitor,
} from "lucide-react";

interface LoginSessionSummary {
  sessionId: string;
  username: string;
  timestamp: string;
  interactionType: string;
  status: string;
  deviceInfo: string;
}

export default function ResultPage() {
  const [session, setSession] = useState<LoginSessionSummary | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("securalabs_login_session");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSession(parsed);
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header Konfirmasi Sukses */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mb-4 shadow-xl shadow-emerald-950/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
            Interaksi Pengguna Berhasil Dilakukan
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            Konfirmasi Pencatatan Demonstrasi
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Peristiwa interaksi tombol login simulasi telah berhasil dicatat ke Google Sheets via Google Apps Script secara aman.
          </p>
        </div>

        {/* Kartu Ringkasan Sesi Interaksi */}
        <div className="rounded-2xl bg-[#0d1424] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                Tanda Terima Interaksi Sesi
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              NON-SENSITIF
            </span>
          </div>

          <div className="space-y-3.5 text-xs font-mono">
            {/* Session ID */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">ID Sesi Acak:</span>
              <span className="font-bold text-emerald-400">
                {session?.sessionId || "SES-SIMULASI"}
              </span>
            </div>

            {/* Username Samaran */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">ID Partisipan / Username:</span>
              <span className="font-bold text-slate-200">
                {session?.username || "user_demo"}
              </span>
            </div>

            {/* Waktu Interaksi */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Waktu Interaksi:</span>
              <span className="font-bold text-amber-400">
                {session?.timestamp || new Date().toLocaleTimeString("id-ID")}
              </span>
            </div>

            {/* Jenis Interaksi */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Jenis Peristiwa:</span>
              <span className="font-bold text-cyan-400">
                {session?.interactionType || "LOGIN_BUTTON_CLICKED"}
              </span>
            </div>

            {/* Status Interaksi */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Status Pencatatan:</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SUCCESS</span>
              </span>
            </div>

            {/* Perangkat */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Kategori Perangkat:</span>
              <span className="text-slate-300 font-semibold">
                {session?.deviceInfo || "Desktop Browser"}
              </span>
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="mt-6 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              <strong>Kepatuhan Etika Keamanan:</strong> Kata sandi Anda sengaja tidak direkam dalam tanda terima ini dan tidak ditransmisikan ke Google Sheets demi menjaga integritas privasi.
            </p>
          </div>
        </div>

        {/* Action Button: Kembali ke Halaman Utama */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-mono transition-all shadow-md active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
