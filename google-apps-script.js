/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: PENCATATAN TELEMETRI INTERAKSI DEMO (NON-SENSITIF)
 * Proyek: UTS Keamanan Jaringan dan Komputer
 * =========================================================================
 * 
 * PETUNJUK PEMASANGAN DI GOOGLE SHEETS:
 * 1. Buat Google Spreadsheet baru di https://sheets.new
 * 2. Beri nama spreadsheet, misalnya: "Log Interaksi Demo UTS"
 * 3. Pada baris 1 (Header Sheet), buat 5 kolom:
 *    - Kolom A: Session ID
 *    - Kolom B: Waktu Interaksi
 *    - Kolom C: Jenis Interaksi
 *    - Kolom D: Status
 *    - Kolom E: Kategori Perangkat
 * 4. Buka menu: Ekstensi (Extensions) > Apps Script
 * 5. Hapus kode default, lalu salin dan tempel (paste) seluruh isi file ini.
 * 6. Klik tombol "Deploy" (Terapkan) di kanan atas > "New deployment" (Penerapan baru).
 * 7. Pilih tipe: "Web app" (Aplikasi web).
 * 8. Konfigurasi:
 *    - Description: "Web App Tracker UTS Demo"
 *    - Execute as: "Me" (Saya / akun Google Anda)
 *    - Who has access: "Anyone" (Siapa saja - PENTING agar dapat menerima request dari Vercel/Next.js)
 * 9. Klik "Deploy", berikan izin akses (Authorize access), lalu salin "Web App URL"
 *    (Format: https://script.google.com/macros/s/AKfycb.../exec)
 * 10. Masukkan URL tersebut ke file .env.local atau Environment Variables Vercel sebagai GOOGLE_SCRIPT_URL.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Kunci selama maksimal 10 detik untuk menghindari konflik baris

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Pastikan header ada jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Session ID", "Waktu Interaksi", "Jenis Interaksi", "Status", "Kategori Perangkat"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Ambil data non-sensitif
    var sessionId = data.sessionId || "SES-UNKNOWN";
    var timestamp = data.timestamp || new Date().toISOString();
    var interactionType = data.interactionType || "LOGIN_BUTTON_CLICK";
    var status = data.status || "SUCCESS";
    var deviceInfo = data.deviceInfo || "Desktop Browser";

    // Jaminan Etika Keamanan: Cegah penyimpanan password jika ada anomali
    if (data.password || data.token || data.otp || data.cookie) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Pelanggaran Etika: Dilarang mengirim data autentikasi sensitif."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Catat ke Google Sheets
    sheet.appendRow([sessionId, timestamp, interactionType, status, deviceInfo]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Interaksi non-sensitif berhasil dicatat ke Google Sheets.",
      sessionId: sessionId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Google Apps Script Tracker UTS Demo berjalan normal."
  })).setMimeType(ContentService.MimeType.JSON);
}
