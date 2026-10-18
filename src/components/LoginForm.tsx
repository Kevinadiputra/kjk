"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import { generateSessionId, getDeviceInfo, trackInteraction } from "@/lib/tracking";

export default function LoginForm() {
  const router = useRouter();

  // Input states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validasi Input Frontend
    const newErrors: Record<string, string> = {};
    if (!username.trim()) {
      newErrors.username = "Nama pengguna / ID partisipan wajib diisi.";
    } else if (username.trim().length < 2) {
      newErrors.username = "Minimal 2 karakter.";
    }

    if (!password) {
      newErrors.password = "Kolom kata sandi simulasi wajib diisi.";
    } else if (password.length < 3) {
      newErrors.password = "Minimal 3 karakter.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // 2. Siapkan Data Telemetri Non-Sensitif
    // PENTING: Password TIDAK PERNAH dimasukkan ke dalam objek telemetri!
    const sessionId = generateSessionId();
    const interactionTimestamp = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "medium",
      timeStyle: "medium",
    });
    const deviceInfo = getDeviceInfo();

    // 3. Simpan data non-sensitif ke sessionStorage untuk ditampilkan di halaman /result
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "securalabs_login_session",
        JSON.stringify({
          sessionId,
          username: username.trim(),
          timestamp: interactionTimestamp,
          interactionType: "LOGIN_BUTTON_CLICKED",
          status: "SUCCESS (Tercatat ke Google Sheets)",
          deviceInfo,
        })
      );
    }

    // 4. Catat interaksi ke Google Sheets melalui API Route (Stateless)
    try {
      await trackInteraction({
        sessionId,
        timestamp: new Date().toISOString(),
        interactionType: "LOGIN_BUTTON_CLICKED",
        status: "SUCCESS",
        deviceInfo,
      });
    } catch (err) {
      console.warn("Gagal mengirim log, melanjutkan navigasi:", err);
    }

    // 5. Arahkan pengguna ke halaman konfirmasi setelah login
    router.push("/result");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Login Card */}
      <div className="rounded-2xl bg-[#0d1424] border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Card Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
            Masuk ke Sistem Demo
          </h2>
          <p className="text-xs text-slate-400">
            Simulasi interaksi pengguna untuk pengujian sistem
          </p>
        </div>

        {/* Privacy Assurance Notice */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2.5 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <p>
            <strong className="text-emerald-300">Jaminan Privasi:</strong> Tombol ini berfungsi sebagai simulasi interaksi. Kata sandi Anda <strong>tidak akan pernah</strong> disimpan atau dikirim ke Google Sheets.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
              ID Partisipan / Username <span className="text-emerald-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
                }}
                placeholder="Contoh: user_demo atau nama samaran"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.username}</span>
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                Kata Sandi Simulasi <span className="text-emerald-400">*</span>
              </label>
              <span className="text-[10px] font-mono text-emerald-400/80">
                (Simulasi Interaksi)
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                placeholder="Ketik kata sandi sembarang..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                aria-label="Lihat kata sandi"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.password}</span>
              </p>
            ) : (
              <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                Tidak akan disimpan atau dikirim ke Google Sheets
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-sans font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mencatat interaksi ke Google Sheets...</span>
                </>
              ) : (
                <>
                  <span>Masuk &amp; Catat Interaksi</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Meta */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>Google Apps Script</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>Tanpa Database</span>
          </div>
        </div>
      </div>
    </div>
  );
}
