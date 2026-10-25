/* Jejak kunjungan: analitik milik MOTE sendiri, tanpa cookie, dikirim ke Worker kelas-mote (/j).
   Yang dicatat: halaman dilihat, waktu aktif, gulir terdalam, klik (posisi untuk heatmap), dan peristiwa (video, unduh).
   Di localhost dikirim ke Worker lokal (port 8788) supaya uji coba tidak pernah masuk ke data live. */
(function () {
  /* pratinjau heatmap di admin (?mj-peta=1): tidak dicatat, cuma melaporkan posisi gulir ke admin */
  if (/[?&]mj-peta=1/.test(location.search) && window.parent !== window) {
    var lapor = function () { parent.postMessage({ mj: 'gulir', y: Math.round(scrollY), h: document.documentElement.scrollHeight }, '*'); };
    addEventListener('scroll', lapor, { passive: true }); addEventListener('load', lapor); setTimeout(lapor, 600); setTimeout(lapor, 2500);
    return;
  }
  var ua = navigator.userAgent;
  if (navigator.webdriver && !/^(localhost|127\.)/.test(location.hostname)) return;
  if (/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(ua)) return;
  var lokal = /^(localhost|127\.)/.test(location.hostname);
  var TUJU = (lokal ? 'http://localhost:8788' : 'https://kelas-mote.motekreatif.workers.dev') + '/j';
  function acak() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  var sesi; try { sesi = sessionStorage.getItem('mj-s'); if (!sesi) { sesi = acak(); sessionStorage.setItem('mj-s', sesi); } } catch (e) { sesi = acak(); }
  var id = acak(), jalur = location.pathname.replace(/\/$/, '/index.html') || '/index.html';
  var anggota = 0; try { anggota = localStorage.getItem('kelas-sesi') ? 1 : 0; } catch (e) {}
  var q = new URLSearchParams(location.search);

  function kirim(isi) {
    isi.s = sesi; isi.p = jalur;
    var b = JSON.stringify(isi);
    if (navigator.sendBeacon && navigator.sendBeacon(TUJU, new Blob([b], { type: 'text/plain' }))) return;
    try { fetch(TUJU, { method: 'POST', body: b, keepalive: true, headers: { 'Content-Type': 'text/plain' } }); } catch (e) {}
  }

  kirim({ t: 'lihat', id: id, j: document.title.slice(0, 120), r: document.referrer.slice(0, 300), w: innerWidth, a: anggota,
          us: q.get('utm_source') || '', um: q.get('utm_medium') || '', uc: q.get('utm_campaign') || '' });

  /* waktu aktif = selama tab terlihat; gulir = persen terdalam dari tinggi dokumen */
  var aktif = 0, mulai = document.hidden ? 0 : Date.now(), gulir = 0;
  function ukurGulir() {
    var h = document.documentElement.scrollHeight - innerHeight;
    var p = h <= 0 ? 100 : Math.round((scrollY / h) * 100);
    if (p > gulir) gulir = Math.min(100, p);
  }
  addEventListener('scroll', ukurGulir, { passive: true }); ukurGulir();

  /* klik: dikumpulkan lalu dikirim berkelompok */
  var antre = [];
  function jenisKlik(el, href) {
    if (!href) return el.closest('button,[role=button],summary') ? 'tombol' : 'lain';
    if (/wa\.me|whatsapp/i.test(href)) return 'wa';
    if (/shopee/i.test(href)) return 'shopee';
    if (/tokopedia/i.test(href)) return 'tokopedia';
    if (/instagram\.com/i.test(href)) return 'instagram';
    if (/tiktok\.com/i.test(href)) return 'tiktok';
    if (/\.(pdf|xlsx|zip)(\?|$)/i.test(href) || el.hasAttribute('download')) return 'unduh';
    try { return new URL(href, location.href).host === location.host ? 'tautan' : 'keluar'; } catch (e) { return 'tautan'; }
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a,button,[role=button],summary,label,input,select,[data-th]') || e.target;
    var a = el.closest('a'), href = a ? a.getAttribute('href') || '' : '';
    var doc = document.documentElement, lebarDok = Math.max(doc.scrollWidth, innerWidth);
    var bisa = el !== e.target || /^(A|BUTTON|SUMMARY|LABEL|INPUT|SELECT)$/.test(el.tagName);
    var label = (el.getAttribute('aria-label') || el.innerText || el.value || el.alt || '').replace(/\s+/g, ' ').trim();
    if (!bisa) label = e.target.tagName === 'IMG' ? 'Gambar: ' + (e.target.alt || '').slice(0, 40) : (label.length <= 40 ? label : '');   // klik di bagian yang bukan tombol
    label = label.slice(0, 60);
    antre.push({ x: Math.round((e.pageX / lebarDok) * 1000), y: Math.round(e.pageY), w: innerWidth, h: doc.scrollHeight,
                 k: jenisKlik(el, href), l: label, u: href.slice(0, 200) });
    if (antre.length >= 10) kirimKlik();
  }, true);
  function kirimKlik() { if (antre.length) { kirim({ t: 'klik', k: antre }); antre = []; } }
  setInterval(kirimKlik, 8000);

  function tutup() {
    if (mulai) { aktif += Date.now() - mulai; mulai = 0; }
    kirimKlik();
    kirim({ t: 'akhir', id: id, d: Math.round(aktif / 1000), g: gulir });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) tutup(); else mulai = Date.now();
  });
  addEventListener('pagehide', tutup);

  /* peristiwa dari skrip lain, mis. Jejak.catat('video-mulai', 'skill-tersembunyi') */
  window.Jejak = { catat: function (nama, nilai) { kirim({ t: 'peristiwa', n: String(nama).slice(0, 40), v: String(nilai == null ? '' : nilai).slice(0, 120) }); } };
})();
