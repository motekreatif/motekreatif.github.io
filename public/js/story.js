/* Kartu anggota Masyarakat Modal Tekun versi IG Story (1080x1920 JPEG), digambar di browser.
   Tujuannya jadi corong: anggota baru membagikan kartunya, orang lain lihat alamat gabungnya.
   Di HP: tombol "Bagikan ke IG Story" membuka lembar share bawaan (pilih Instagram -> Story).
   Di perangkat yang tidak bisa share berkas, tombolnya disembunyikan dan yang tersisa "Unduh JPEG".
   Zona aman IG Story: isi penting di antara y=250 dan y=1670. */
(function () {
  var W = 1080, H = 1920, INK = '#232226', KUN = '#FCD12D', UNGU = '#7558FE', KREM = '#F9EED8';
  var R = window.R_KELAS || '../';
  function muatGambar(src, cors) {
    return new Promise(function (ok) {
      var i = new Image(); if (cors) i.crossOrigin = 'anonymous';
      i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src;
    });
  }
  function bulan(t) { return (t ? new Date(t) : new Date()).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }); }
  function inisial(n) { return (n || '?').trim().split(/\s+/).slice(0, 2).map(function (x) { return x[0]; }).join('').toUpperCase(); }
  function kotak(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function bungkus(c, teks, maks) {   // pecah teks jadi baris yang muat
    var kata = teks.split(' '), baris = [], b = '';
    kata.forEach(function (k) { var u = b ? b + ' ' + k : k; if (c.measureText(u).width > maks && b) { baris.push(b); b = k; } else b = u; });
    if (b) baris.push(b); return baris;
  }
  function bow(c, x, y, lebar, warna) {   // logogram simpul MOTE dari path asli
    var d = (window.KM_BOW || '').match(/ d="([^"]+)"/); if (!d) return;
    var s = lebar / 24.93; c.save(); c.translate(x, y); c.scale(s, s); c.translate(-15.37, -204.48);
    c.fillStyle = warna; c.fill(new Path2D(d[1])); c.restore();
  }

  // patah baris seimbang (balanced rag): cari lebar terkecil yang jumlah barisnya tetap sama
  function seimbang(c, teks, maks) {
    var n = bungkus(c, teks, maks).length, lo = maks * .4, hi = maks;
    for (var k = 0; k < 18; k++) { var m = (lo + hi) / 2; if (bungkus(c, teks, m).length > n) lo = m; else hi = m; }
    return bungkus(c, teks, hi);
  }
  function pita(c, P, nama, x, y, lebar, sudut, warna) {   // supergraphic pita asli MOTE (Graphic System Manual)
    var g = P && P[nama]; if (!g) return;
    var b = g.bbox, s = lebar / (b[2] - b[0]);
    c.save(); c.translate(x, y); c.rotate(sudut * Math.PI / 180); c.scale(s, s); c.translate(-(b[0] + b[2]) / 2, -(b[1] + b[3]) / 2);
    c.fillStyle = warna; c.fill(new Path2D(g.d)); c.restore();
  }

  function gambar(ak) {
    var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    var foto = ak.foto ? (window.KM_API || '') + ak.foto + '?story=1' : '';
    return Promise.all([
      document.fonts ? Promise.all(['300 italic 40px DMD', '700 80px DMD', '600 30px DMD', '400 30px DMS'].map(function (f) { return document.fonts.load(f); })) : 0,
      foto ? muatGambar(foto, true) : null,
      muatGambar(R + 'aset/stiker/stiker-06-7.svg'), muatGambar(R + 'aset/stiker/stiker-01-41.svg'),
      fetch(R + 'aset/pita-asli.json').then(function (r) { return r.json(); }).catch(function () { return null; })
    ]).then(function (h) {
      var img = h[1], st1 = h[2], st2 = h[3], P = h[4], X = W / 2, panggil = ak.panggilan || (ak.nama || '').split(' ')[0];
      // latar ungu MOTE + pita kuning sebagai supergraphic
      c.fillStyle = UNGU; c.fillRect(0, 0, W, H);
      pita(c, P, 'ombak', X, 1150, 1500, -8, KUN);
      pita(c, P, 'simpul-pita', 1010, 40, 440, 12, KUN);   // pojok kanan atas, di luar area teks
      pita(c, P, 'lembah', 120, 1760, 560, 168, KUN);
      c.textAlign = 'center';
      // kepala: simpul + nama komunitas, rata tengah
      c.font = '600 26px DMD'; if ('letterSpacing' in c) c.letterSpacing = '5px';
      var lbl = 'MASYARAKAT MODAL TEKUN', lw = c.measureText(lbl).width;
      bow(c, X - lw / 2 - 74, 216, 58, '#fff');
      c.fillStyle = '#fff'; c.textBaseline = 'middle'; c.fillText(lbl, X + 18, 232);
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      c.textBaseline = 'alphabetic';
      // ucapan + visi singkat
      c.fillStyle = KUN; c.font = '300 italic 54px DMD'; c.fillText('Selamat, ' + panggil + '!', X, 356);
      c.fillStyle = '#fff'; c.font = '700 66px DMD';
      var judul = ['Kamu resmi jadi anggota', 'Masyarakat Modal Tekun.'];
      judul.forEach(function (b, i) { c.fillText(b, X, 438 + i * 72); });
      c.font = '400 33px DMS'; c.fillStyle = 'rgba(255,255,255,.9)';
      var sub = seimbang(c, 'Anggota ke-' + ak.ke + '. Mulai hari ini kamu bagian dari komunitas yang siap tumbuh dengan growth mindset.', 760);
      sub.forEach(function (b, i) { c.fillText(b, X, 568 + i * 46); });
      var y0 = 568 + (sub.length - 1) * 46;
      // kartu anggota
      var kw = 500, kh = 843, ky = y0 + 64 + kh / 2;   // rasio ID card (±0,6), sama dengan kartu di halaman
      c.textAlign = 'left';
      c.save(); c.translate(X, ky); c.rotate(-3 * Math.PI / 180);
      c.shadowColor = 'rgba(35,34,38,.4)'; c.shadowBlur = 50; c.shadowOffsetY = 26;
      c.fillStyle = KUN; kotak(c, -kw / 2, -kh / 2, kw, kh, 42); c.fill();
      c.shadowColor = 'transparent'; c.lineWidth = 5; c.strokeStyle = INK; c.stroke();
      c.fillStyle = INK; kotak(c, -36, -kh / 2 - 44, 72, 92, 14); c.fill();
      c.fillStyle = KUN; kotak(c, -17, -kh / 2 + 22, 34, 10, 5); c.fill();
      bow(c, -kw / 2 + 36, -kh / 2 + 58, 44, INK);
      c.fillStyle = INK; c.font = '700 20px DMD'; if ('letterSpacing' in c) c.letterSpacing = '3px';
      c.fillText('MASYARAKAT', -kw / 2 + 92, -kh / 2 + 70); c.fillText('MODAL TEKUN', -kw / 2 + 92, -kh / 2 + 95);
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      c.font = '700 25px DMD'; c.textAlign = 'right'; c.fillText('No. ' + (ak.no || ''), kw / 2 - 36, -kh / 2 + 86); c.textAlign = 'left';
      // foto potret 4:5, potongan dari atas supaya kepala utuh
      var fx = -kw / 2 + 32, fy = -kh / 2 + 118, fw = kw - 64, fh = 545;   // foto potret 4:5
      c.save(); kotak(c, fx, fy, fw, fh, 28); c.clip();
      c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(fx, fy, fw, fh);
      if (img) {
        var s = Math.max(fw / img.width, fh / img.height), iw = img.width * s, ih = img.height * s;
        c.drawImage(img, fx + (fw - iw) / 2, fy + Math.max(fh - ih, (fh - ih) * .08), iw, ih);
      } else { c.fillStyle = INK; c.font = '700 140px DMD'; c.textAlign = 'center'; c.fillText(inisial(ak.nama), 0, fy + fh / 2 + 48); c.textAlign = 'left'; }
      c.restore();
      c.fillStyle = INK; c.font = '700 44px DMD';
      c.fillText(bungkus(c, ak.nama || '', fw)[0] || '', fx, fy + fh + 66);
      c.font = '400 27px DMS'; c.fillText([ak.pekerjaan, ak.kota].filter(Boolean).join(' · '), fx, fy + fh + 112);
      c.globalAlpha = .7; c.font = '600 21px DMD'; c.fillText('Anggota sejak ' + bulan(ak.dibuat), fx, fy + fh + 152); c.globalAlpha = 1;
      c.restore();
      // stiker orang buatan tangan MOTE
      if (st1) c.drawImage(st1, 22, ky + 40, 190, 190 * (st1.height / st1.width || 1));
      if (st2) c.drawImage(st2, W - 236, ky - kh / 2 - 30, 210, 210 * (st2.height / st2.width || 1));
      // ajakan gabung
      var yb = ky + kh / 2 + 96; c.textAlign = 'center';
      c.fillStyle = '#fff'; c.font = '400 30px DMS'; c.fillText('Gabung gratis, sekali daftar berlaku selamanya', X, yb);
      c.font = '700 44px DMD'; var u = 'motekreatif.com/masyarakat', uw = c.measureText(u).width;
      c.fillStyle = INK; kotak(c, X - uw / 2 - 30, yb + 24, uw + 60, 72, 36); c.fill();
      c.fillStyle = KUN; c.fillText(u, X, yb + 76);
      c.textAlign = 'left';
      return new Promise(function (ok) { cv.toBlob(ok, 'image/jpeg', .92); });
    });
  }

  function berkas(blob, ak) { return new File([blob], 'kartu-masyarakat-modal-tekun-' + (ak.no || 'anggota') + '.jpg', { type: 'image/jpeg' }); }
  function unduh(f) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  var bisaShare = !!(navigator.canShare && window.File && navigator.canShare({ files: [new File([''], 'x.jpg', { type: 'image/jpeg' })] }));

  // tombol di dalam [data-km-bagi]; akun diambil dari sesi saat diklik
  window.KartuStory = {
    gambar: gambar,
    pasang: function (akar) {
      [].forEach.call((akar || document).querySelectorAll('[data-km-bagi]'), function (w) {
        if (w.dataset.siap) return; w.dataset.siap = 1;
        var bShare = w.querySelector('[data-km-share]'), bUnduh = w.querySelector('[data-km-unduh]'), ket = w.querySelector('[data-km-ket]');
        if (!bisaShare) bShare.hidden = true;
        function jalan(b, aksi) {
          var d = window.Akun && Akun.data(); if (!d) return;
          var asli = b.innerHTML; b.disabled = true; b.querySelector('span').textContent = 'Menyiapkan…';
          gambar(d.akun).then(function (blob) {
            var f = berkas(blob, d.akun);
            if (aksi === 'share') return navigator.share({ files: [f], title: 'Kartu Masyarakat Modal Tekun', text: 'Aku resmi jadi anggota Masyarakat Modal Tekun. Gabung juga di motekreatif.com/masyarakat' }).catch(function (e) { if (e && e.name !== 'AbortError') unduh(f); });
            unduh(f); if (ket) ket.hidden = false;
          }).finally(function () { b.disabled = false; b.innerHTML = asli; });
        }
        bShare.addEventListener('click', function () { jalan(bShare, 'share'); });
        bUnduh.addEventListener('click', function () { jalan(bUnduh, 'unduh'); });
      });
    }
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', function () { KartuStory.pasang(); }) : KartuStory.pasang();
})();
