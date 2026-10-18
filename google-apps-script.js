/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: PENCATATAN TELEMETRI INTERAKSI DEMO (NON-SENSITIF)
 * Proyek: UTS Keamanan Jaringan dan Komputer
 * =========================================================================
 * 
 * Update Penting:
 * Mendukung POST dan GET (fallback) secara otomatis agar data tetap masuk
 * meskipun terjadi pengalihan 302 dari Google.
 */

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Tunggu hingga 15 detik agar tidak bentrok antar pencatatan
  lock.tryLock(15000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Pastikan header ada di baris 1 jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Session ID", "Waktu Interaksi", "Jenis Interaksi", "Status", "Kategori Perangkat"]);
      sheet.getRange(1, 1, 1, 5)
        .setFontWeight("bold")
        .setBackground("#0f172a")
        .setFontColor("#38bdf8");
    }

    var data = {};

    // 1. Coba baca dari POST body (JSON)
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // Jika bukan JSON murni, gunakan parameter
        data = e.parameter || {};
      }
    } 
    // 2. Fallback baca dari query parameter (GET / URL encoded)
    else if (e && e.parameter) {
      data = e.parameter;
    }

    var sessionId = data.sessionId || "SES-SIMULASI";
    var timestamp = data.timestamp || new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
    var interactionType = data.interactionType || "LOGIN_BUTTON_CLICKED";
    var status = data.status || "SUCCESS";
    var deviceInfo = data.deviceInfo || "Desktop Browser";

    // Jaminan Etika Keamanan: Cegah penyimpanan password jika ada anomali
    if (data.password || data.token || data.otp || data.cookie) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Pelanggaran Etika: Dilarang mengirim data autentikasi sensitif."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Tulis baris baru ke Google Sheets
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

// Menangani permintaan POST dari server
function doPost(e) {
  return handleRequest(e);
}

// Menangani permintaan GET (jika dialihkan atau dipanggil via GET)
function doGet(e) {
  if (e && e.parameter && (e.parameter.sessionId || e.parameter.interactionType)) {
    return handleRequest(e);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Google Apps Script Tracker UTS Demo berjalan normal dan siap menerima log."
  })).setMimeType(ContentService.MimeType.JSON);
}
