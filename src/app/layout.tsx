import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Shield, Lock, FileSpreadsheet, Activity } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SECURLENS - Demo Interaktif Akses Pengguna",
  description:
    "Website demonstrasi interaksi pengguna sederhana dengan Next.js, Tailwind CSS, Vercel, dan pencatatan Google Sheets untuk UTS Keamanan Jaringan dan Komputer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-[#070b14] text-slate-100 min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 transition-colors">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-wider text-slate-100 group-hover:text-white transition-colors">
                  SECU<span className="text-emerald-400">RLENS</span>
                </span>
                <span className="hidden sm:inline-flex ml-2 px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  UTS DEMO
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden sm:inline text-slate-400">Status:</span>
                <span className="text-emerald-300">Online &bull; Google Sheets</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full cyber-grid">{children}</main>

        {/* Footer */}
        <footer className="w-full border-t border-slate-800/80 bg-[#060910] text-slate-400 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>Jaminan Etika Privasi:</strong> Kata sandi tidak pernah disimpan atau dicatat ke Google Sheets.
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Apps Script &bull; Vercel Deployment</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
