/* Checkout & Kelasku Kelas MOTE (tingkat 1: disimpan di browser ini).
   checkout.html?kelas=<slug> : ringkasan + data diri + total. Kelas gratis total Rp 0, tetap lewat checkout.
   kelasku.html               : daftar kelas yang sudah diambil.
   Data: localStorage 'kelas-akun' (nama, email, wa, kota) & 'kelas-punya' ([{slug, harga, waktu}]).
   Katalog dari window.KATALOG_K (js/katalog-kelas.js, dibuat build.py). Kalau KATALOG_K_URL diisi, pesanan juga dikirim ke sana. */
(function () {
  var K = window.KATALOG_K || {}, R = window.R_KELAS || '../';
  function $(s, r) { return (r || document).querySelector(s); }
  function baca(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function tulis(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function rp(n) { return n ? 'Rp' + n.toLocaleString('id-ID') : 'Rp 0'; }
  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; }
  var akun = baca('kelas-akun', null), punya = baca('kelas-punya', []);
  function milik(slug) { return punya.some(function (x) { return x.slug === slug; }); }

  /* ---------- checkout ---------- */
  var co = $('[data-co]');
  if (co) {
    var slug = new URLSearchParams(location.search).get('kelas'), k = K[slug];
    if (!k) { co.hidden = true; $('[data-co-kosong]').hidden = false; return; }
    $('[data-co-item]').innerHTML = '<img src="' + R + 'aset/kelas/' + slug + '.jpg" alt=""><div><small>' + esc(k.label) + ' · ' + esc(k.isi) +
      '</small><b>' + esc(k.judul) + '</b><span>' + esc(k.oleh) + '</span></div>';
    $('[data-co-sub]').textContent = rp(k.harga);
    $('[data-co-total]').textContent = rp(k.harga);
    $('[data-co-gratis]').hidden = !!k.harga;
    $('[data-co-balik]').href = slug + '.html';
    if (milik(slug)) { co.hidden = true; var a = $('[data-co-udah]'); a.hidden = false; $('a', a).href = slug + '.html'; return; }
    var f = $('[data-co-form]');
    if (akun) ['nama', 'email', 'wa', 'kota'].forEach(function (n) { if (akun[n]) f.elements[n].value = akun[n]; });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = {}; new FormData(f).forEach(function (v, n) { d[n] = String(v).trim(); });
      var waktu = new Date().toISOString();
      akun = { nama: d.nama, email: d.email, wa: d.wa, kota: d.kota, waktu: (akun && akun.waktu) || waktu, kelas: (akun && akun.kelas) || slug };
      tulis('kelas-akun', akun);
      punya = punya.filter(function (x) { return x.slug !== slug; }).concat([{ slug: slug, harga: k.harga || 0, waktu: waktu }]);
      if (!tulis('kelas-punya', punya)) { alert('Browser ini memblokir penyimpanan, jadi kelasnya belum bisa disimpan. Coba matikan mode privat.'); return; }
      var ke = function () { location.href = 'kelasku.html?baru=' + encodeURIComponent(slug); };
      if (!window.KATALOG_K_URL) return ke();
      // dikirim dulu ke data MOTE (maks 4 detik); kalau jaringan gagal, kelas tetap masuk Kelasku
      var b = f.querySelector('button[type=submit]'); b.disabled = true;
      var t = setTimeout(ke, 4000);
      try {
        fetch(KATALOG_K_URL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ akun: akun, kelas: slug, harga: k.harga || 0 }) })
          .then(function () { clearTimeout(t); ke(); }, function () { clearTimeout(t); ke(); });
      } catch (er) { clearTimeout(t); ke(); }
    });
    return;
  }

  /* ---------- Kelasku ---------- */
  var rak = $('[data-kelasku]');
  if (rak) {
    var baru = new URLSearchParams(location.search).get('baru');
    if (baru && K[baru] && milik(baru)) { var s = $('[data-ku-sukses]'); s.hidden = false; $('b', s).textContent = 'Kelasnya udah masuk Kelasku.'; $('p', s).textContent = K[baru].judul + ' Total Rp 0. Klik kelasnya buat mulai belajar.'; }
    if (akun && akun.nama) $('[data-ku-halo]').textContent = 'Halo ' + akun.nama.split(' ')[0] + ', ini kelas yang udah kamu ambil.';
    var ada = punya.filter(function (x) { return K[x.slug]; }).sort(function (a, b) { return (b.waktu || '').localeCompare(a.waktu || ''); });
    if (!ada.length) { rak.hidden = true; $('[data-ku-kosong]').hidden = false; return; }
    rak.innerHTML = ada.map(function (x) {
      var k = K[x.slug];
      return '<a class="ks-kartu ku-kartu" href="' + x.slug + '.html"><span class="ks-ft"><img src="' + R + 'aset/kelas/' + x.slug + '.jpg" alt="" loading="lazy"></span>' +
        '<small>' + esc(k.label) + ' · ' + esc(k.isi) + '</small><b>' + esc(k.judul) + '</b><span class="ks-oleh">' + esc(k.oleh) + '</span>' +
        '<span class="ku-masuk">Masuk ruang belajar <i>→</i></span></a>';
    }).join('');
  }
})();
