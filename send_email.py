#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
SKRIP PENGIRIMAN EMAIL UNDANGAN DEMO SECURLENS (PYTHON)
Proyek: UTS Keamanan Jaringan dan Komputer
=============================================================================
Skrip ini mengirimkan email undangan uji coba demo interaktif dengan desain
HTML modern, rapi, responsif, dan profesional.

Penggunaan:
  python send_email.py
  Atau dengan argumen:
  python send_email.py --to teman@example.com --sender email_anda@gmail.com
"""

import sys
import os
import smtplib
import argparse
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Konfigurasi Default
DEFAULT_DEMO_URL = "https://kjk-eta.vercel.app"
DEFAULT_SUBJECT = "[Undangan Demo] Uji Coba Interaktif Akses Pengguna - SECURLENS"

def generate_email_html(recipient_name="Rekan-rekan", demo_url=DEFAULT_DEMO_URL):
    """
    Menghasilkan template email HTML yang responsif dan modern.
    Menggunakan inline CSS agar kompatibel dengan Gmail, Outlook, dan Mail Client mobile.
    """
    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Undangan Demo SECURLENS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080c15; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #080c15; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Container Utama -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" cellspacing="0" cellpadding="0" border="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 32px 30px; border-bottom: 2px solid #10b981; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; font-size: 11px; font-weight: bold; color: #34d399; font-family: monospace; letter-spacing: 0.5px; text-transform: uppercase;">
                      UTS KEAMANAN JARINGAN &amp; KOMPUTER
                    </span>
                    <h1 style="margin: 12px 0 4px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      SECU<span style="color: #10b981;">RLENS</span> LABS
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #94a3b8; font-family: monospace;">
                      Interactive User Access Demo &amp; Interaction Telemetry
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Konten Email -->
          <tr>
            <td style="padding: 32px 30px;">
              <p style="font-size: 15px; line-height: 1.6; color: #e2e8f0; margin-top: 0;">
                Halo <strong>{recipient_name}</strong>,
              </p>
              
              <p style="font-size: 14px; line-height: 1.7; color: #cbd5e1;">
                Saya sedang mengembangkan sebuah proyek website demonstrasi interaktif untuk mata kuliah <strong>Keamanan Jaringan dan Komputer (UTS Semester 7)</strong>.
              </p>

              <p style="font-size: 14px; line-height: 1.7; color: #cbd5e1;">
                Aplikasi ini mendemonstrasikan pengalaman interaksi pengguna pada formulir simulasi akses serta merekam telemetri interaksi non-sensitif secara real-time ke <strong>Google Sheets</strong> menggunakan <strong>Next.js App Router</strong> dan <strong>Vercel Serverless</strong>.
              </p>

              <!-- Kotak Langkah Pengujian -->
              <table role="presentation" width="100%" style="background-color: #162036; border: 1px solid #1e293b; border-radius: 12px; margin: 24px 0; padding: 18px;" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px 0; font-size: 13px; color: #38bdf8; font-family: monospace; text-transform: uppercase; letter-spacing: 0.5px;">
                      📋 Langkah Pengujian Singkat:
                    </h3>
                    <ol style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8; color: #e2e8f0;">
                      <li>Klik tombol <strong>Buka Demo Website</strong> di bawah ini.</li>
                      <li>Masukkan ID/Username samaran dan kata sandi sembarang pada formulir login.</li>
                      <li>Tekan tombol <strong>Masuk &amp; Catat Interaksi</strong>.</li>
                      <li>Lihat tanda terima sesi interaksi Anda pada halaman konfirmasi.</li>
                    </ol>
                  </td>
                </tr>
              </table>

              <!-- Tombol CTA Utama -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="{demo_url}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #04100b; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(16, 185, 129, 0.35); text-align: center; letter-spacing: 0.2px;">
                      🚀 Buka Demo Website &rarr;
                    </a>
                    <div style="font-size: 11px; font-family: monospace; color: #64748b; margin-top: 10px;">
                      URL Langsung: <a href="{demo_url}" style="color: #38bdf8; text-decoration: underline;">{demo_url}</a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Jaminan Privasi & Kepatuhan Etika -->
              <table role="presentation" width="100%" style="background-color: #0b1322; border-left: 4px solid #10b981; border-radius: 0 8px 8px 0; padding: 14px 16px; margin-top: 20px;" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #94a3b8;">
                      <strong style="color: #f1f5f9;">🛡️ Jaminan Privasi &amp; Tanpa Kredensial:</strong><br>
                      Website ini beroperasi murni untuk demonstrasi usabilitas antarmuka. Kata sandi Anda <strong>tidak pernah disimpan atau dikirimkan</strong>. Data yang dicatat ke Google Sheets hanyalah Session ID acak, timestamp, jenis tombol, dan kategori perangkat.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin-top: 28px;">
                Terima kasih banyak atas kesediaan Anda untuk mencoba demonstrasi ini!
              </p>

              <p style="font-size: 13px; color: #94a3b8; margin: 16px 0 0 0;">
                Salam hangat,<br>
                <strong style="color: #f1f5f9;">Kevin Adiputra Mahesa</strong><br>
                <span style="font-size: 12px; color: #64748b;">Mahasiswa Semester 7 &bull; Keamanan Jaringan dan Komputer</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #080d1a; border-top: 1px solid #1e293b; padding: 20px 30px; text-align: center; font-size: 11px; color: #64748b; font-family: monospace;">
              <p style="margin: 0 0 4px 0;">
                SECURLENS Research Sandbox &bull; Stateless Architecture
              </p>
              <p style="margin: 0;">
                Next.js &bull; Tailwind CSS &bull; Google Sheets &bull; Vercel Serverless
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""

def generate_email_text(recipient_name="Rekan-rekan", demo_url=DEFAULT_DEMO_URL):
    """
    Menghasilkan versi Plain Text sebagai fallback.
    """
    return f"""
=============================================================
UNDANGAN UJI COBA DEMO INTERAKTIF AKSES PENGGUNA (SECURLENS)
Proyek: UTS Keamanan Jaringan dan Komputer - Semester 7
=============================================================

Halo {recipient_name},

Saya sedang mengembangkan proyek website demonstrasi interaktif untuk mata kuliah Keamanan Jaringan dan Komputer.

Aplikasi ini mendemonstrasikan pengalaman interaksi pengguna pada formulir simulasi akses serta mencatat telemetri peristiwa interaksi non-sensitif secara otomatis ke Google Sheets.

Tautan Uji Coba Demo:
{demo_url}

Langkah Pengujian Singkat:
1. Buka tautan demo di atas.
2. Masukkan ID/Username samaran dan kata sandi sembarang pada formulir login.
3. Tekan tombol "Masuk & Catat Interaksi".
4. Lihat tanda terima sesi interaksi Anda pada halaman konfirmasi.

Jaminan Keamanan & Privasi:
Kata sandi Anda sama sekali tidak pernah disimpan atau dikirim ke Google Sheets. Data yang dicatat hanyalah parameter non-sensitif (Session ID acak, timestamp, jenis tombol, dan kategori perangkat).

Terima kasih atas bantuan dan partisipasi Anda!

Salam hangat,
Kevin Adiputra Mahesa
Mahasiswa Semester 7 - Keamanan Jaringan dan Komputer
=============================================================
""".strip()

def send_invitation_email(recipient_email, sender_email, sender_password, smtp_server="smtp.gmail.com", smtp_port=465, recipient_name="Teman-teman", demo_url=DEFAULT_DEMO_URL):
    """
    Mengirimkan email HTML menggunakan koneksi SMTP SSL.
    """
    # Siapkan pesan multipart
    msg = MIMEMultipart("alternative")
    msg["Subject"] = DEFAULT_SUBJECT
    msg["From"] = f"Kevin Adiputra <{sender_email}>"
    msg["To"] = recipient_email

    # Buat konten teks dan html
    text_content = generate_email_text(recipient_name, demo_url)
    html_content = generate_email_html(recipient_name, demo_url)

    part1 = MIMEText(text_content, "plain", "utf-8")
    part2 = MIMEText(html_content, "html", "utf-8")

    msg.attach(part1)
    msg.attach(part2)

    print(f"[*] Menghubungkan ke server SMTP {smtp_server}:{smtp_port}...")
    try:
        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_server, smtp_port, timeout=15)
        else:
            server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
            server.starttls()

        print("[*] Melakukan login autentikasi...")
        server.login(sender_email, sender_password)

        print(f"[*] Mengirimkan email undangan ke: {recipient_email}...")
        server.sendmail(sender_email, [recipient_email], msg.as_string())
        server.quit()

        print("[+] SUKSES: Email undangan berhasil terkirim!")
        return True
    except Exception as e:
        print(f"[-] GAGAL: Terjadi kesalahan saat mengirim email: {e}")
        return False

def save_html_preview():
    """
    Menyimpan file preview HTML agar pengguna dapat melihat tampilannya di browser.
    """
    preview_file = "email_preview.html"
    with open(preview_file, "w", encoding="utf-8") as f:
        f.write(generate_email_html("Teman-teman"))
    print(f"[*] File preview email telah dibuat: {os.path.abspath(preview_file)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Kirim email undangan demo SECURLENS")
    parser.add_argument("--to", help="Alamat email penerima")
    parser.add_argument("--name", default="Teman-teman", help="Nama penerima untuk sapaan email")
    parser.add_argument("--sender", help="Alamat email pengirim (Gmail)")
    parser.add_argument("--password", help="App Password Gmail pengirim (16 digit)")
    parser.add_argument("--preview", action="store_true", help="Hasilkan file email_preview.html")

    args = parser.parse_args()

    # Selalu buat file preview agar pengguna bisa melihat tampilannya
    save_html_preview()

    # Jika hanya membuat preview
    if args.preview and not args.to:
        print("[*] Selesai membuat preview email. Buka 'email_preview.html' di browser Anda.")
        sys.exit(0)

    # Dapatkan penerima
    recipient = args.to or os.environ.get("RECIPIENT_EMAIL")
    sender = args.sender or os.environ.get("GMAIL_SENDER") or "kevinadiputra66@gmail.com"
    password = args.password or os.environ.get("GMAIL_APP_PASSWORD")

    if not recipient:
        print("\n=== PENGIRIMAN EMAIL UNDANGAN DEMO ===")
        print("Tentukan penerima melalui opsi berikut:")
        print("1. Jalankan: python send_email.py --to tujuan@example.com --password \"xxxx xxxx xxxx xxxx\"")
        print("2. Atau Anda dapat memberi tahu saya alamat email tujuannya di chat.")
        print(f"File preview email yang cantik siap dilihat di: {os.path.abspath('email_preview.html')}")
        sys.exit(0)

    if not password:
        import getpass
        print(f"Email Pengirim: {sender}")
        password = getpass.getpass("Masukkan 16-digit Google App Password: ")

    send_invitation_email(recipient, sender, password, recipient_name=args.name)
