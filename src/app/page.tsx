import React from "react";
import LoginForm from "@/components/LoginForm";
import { Shield, FileSpreadsheet, Lock, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative py-10 md:py-16">
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>UTS Keamanan Jaringan &amp; Komputer</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-300">Semester 7</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white mb-3">
            Demo Interaktif{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Akses Pengguna
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Halaman login demonstrasi ini dirancang untuk mensimulasikan interaksi pengguna dan mencatat telemetri non-sensitif ke Google Sheets secara aman tanpa menyimpan kata sandi.
          </p>
        </div>

        {/* Login Form Component */}
        <div className="mb-12">
          <LoginForm />
        </div>

        {/* 3 Keamanan & Transparansi Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">
              Tanpa Rekam Kredensial
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Kata sandi tidak pernah disimpan di disk, log, ataupun Google Sheets.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">
              Catat ke Google Sheets
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Hanya mencatat Session ID, timestamp, jenis tombol, dan status interaksi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">
              Tanpa Database Eksternal
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Beroperasi secara stateless tanpa Supabase, aman untuk pengujian.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
