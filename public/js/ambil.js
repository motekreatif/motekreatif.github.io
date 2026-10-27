/* Halaman akun Masyarakat MOTE & Kelas MOTE.
   masyarakat/index.html : belum masuk = gabung (bikin kartu anggota) / masuk; sudah masuk = kartu, profil, ringkasan kelas.
   kelasmote/checkout.html?kelas=<slug> : wajib masuk; kelas gratis total Rp 0.
   kelasmote/kelasku.html : daftar kelas milik; belum masuk = ajakan "Login dulu biar bisa ambil kelas".
   Butuh js/akun.js (window.Akun) dan js/katalog-kelas.js (window.KATALOG_K). */
(function () {
  var K = window.KATALOG_K || {}, R = window.R_KELAS || '../', A = window.Akun;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function rp(n) { return n ? 'Rp' + n.toLocaleString('id-ID') : 'Rp 0'; }
  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; }
  var q = new URLSearchParams(location.search);
  // tujuan setelah masuk: hanya halaman Kelas MOTE / MTGOODS di situs ini (bukan alamat luar)
  var lanjut = (q.get('lanjut') || '').replace(/^\/+/, '');
  if (!/^(kelasmote|mtgoods)\/[a-z0-9-]+\.html(\?[a-z0-9=&%-]*)?$/i.test(lanjut)) lanjut = '';

  function kartuDari(d) { return (d.kartu_d || 'a') + '-' + (d.kartu_w || 'kuning'); }   // pilihan tampilan kartu di formulir

  /* ---------- profil anggota (dipakai di Masyarakat MOTE) ---------- */
  function profil(akar) {
    var file = $('[data-ku-file]', akar), fp = $('[data-ku-form]', akar);
    function tampil() {
      var d = A.data(); if (!d) return;
      var ak = d.akun, tgl = new Date(ak.dibuat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      $('[data-ku-halo]', akar).textContent = 'Halo ' + (ak.panggilan || ak.nama.split(' ')[0]) + ', kamu anggota ke\u2011' + ak.ke + '\u00a0Masyarakat Modal Tekun.';
      $('[data-ku-kartu]', akar).innerHTML = A.kartu(ak, { ubahFoto: true });
      $('[data-ku-dl]', akar).innerHTML = [['No. anggota', ak.no], ['Anggota sejak', tgl], ['Nama lengkap', ak.nama], ['Nama panggilan', ak.panggilan || '–'], ['Email', ak.email], ['WhatsApp', ak.wa], ['Kota', ak.kota],
        ['Pekerjaan', ak.pekerjaan || '–'], ['Bidang', ak.industri || '–']]
        .map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + esc(x[1]) + '</dd></div>'; }).join('');
      var n = d.milik.filter(function (m) { return K[m.kelas]; }), el = $('[data-ag-kelas]', akar);
      if (el) el.textContent = n.length ? n.length + ' kelas: ' + n.map(function (m) { return K[m.kelas].judul.replace(/\.$/, ''); }).join(' · ') : 'Belum ada. Kelas di Kelas MOTE gratis diambil pakai kartumu.';
    }
    function ubah(ya) { fp.hidden = !ya; $('[data-ku-dl]', akar).hidden = ya; $('[data-ku-ubah]', akar).closest('.ku-tombol').hidden = ya; }
    $('[data-ku-ubah]', akar).addEventListener('click', function () {
      var ak = A.data().akun;
      ['nama', 'panggilan', 'kota', 'wa', 'pekerjaan', 'industri'].forEach(function (n) { var el = fp.elements[n]; if (el) el.value = ak[n] || ''; });
      ubah(true); fp.elements.nama.focus();
    });
    $('[data-ku-batal]', akar).addEventListener('click', function () { ubah(false); });
    // ganti desain kartu kapan saja setelah gabung: pilih -> kartu berubah langsung -> simpan (data profil lain dikirim apa adanya)
    var fg = $('[data-ku-gaya]', akar), bg = $('[data-ku-gaya-buka]', akar);
    if (fg && bg) {   // tombol ganti desain cuma ada kalau KARTU_VARIASI di build.py dinyalakan
      function gayaBuka(ya) { fg.hidden = !ya; bg.hidden = ya; if (!ya) tampil(); }
      bg.addEventListener('click', function () { var g = A.gaya(A.data().akun.kartu); fg.elements.kartu_d.value = g.d; fg.elements.kartu_w.value = g.w; gayaBuka(true); });
      $('[data-ku-gaya-batal]', akar).addEventListener('click', function () { gayaBuka(false); });
      fg.addEventListener('change', function () {
        var d = {}; new FormData(fg).forEach(function (v, k) { d[k] = String(v); });
        $('[data-ku-kartu]', akar).innerHTML = A.kartu(Object.assign({}, A.data().akun, { kartu: kartuDari(d) }), { ubahFoto: true });
      });
      fg.addEventListener('submit', function (e) {
        e.preventDefault(); var d = {}; new FormData(fg).forEach(function (v, k) { d[k] = String(v); });
        var ak = A.data().akun, b = $('button[type=submit]', fg), gl = $('[data-m-galat]', fg); b.disabled = true; gl.hidden = true;
        A.profil({ nama: ak.nama, panggilan: ak.panggilan || ak.nama.split(' ')[0], wa: ak.wa, kota: ak.kota, pekerjaan: ak.pekerjaan, industri: ak.industri, kartu: kartuDari(d) })
          .then(function () { b.disabled = false; gayaBuka(false); A.tombol(); }).catch(function (er) { b.disabled = false; gl.textContent = er.message; gl.hidden = false; });
      });
      fp.addEventListener('submit', function (e) {
        e.preventDefault(); var d = {}; new FormData(fp).forEach(function (v, k) { d[k] = String(v).trim(); });
        var b = $('button[type=submit]', fp), g = $('[data-m-galat]', fp); b.disabled = true; g.hidden = true;
        A.profil(d).then(function () { b.disabled = false; ubah(false); tampil(); A.tombol(); }).catch(function (er) { b.disabled = false; g.textContent = er.message; g.hidden = false; });
      });
    }
    $('[data-ku-kartu]', akar).addEventListener('click', function (e) { if (e.target.closest('[data-km-foto]')) file.click(); });
    file.addEventListener('change', function () {
      var f = file.files[0]; if (!f) return;
      var u = $('.km-ubah', akar); if (u) u.textContent = 'Menyimpan…';
      A.foto(f).then(function () { tampil(); A.tombol(); }).catch(function (er) { alert(er.message); tampil(); });
    });
    $('[data-ku-keluar]', akar).addEventListener('click', function () { A.keluar().then(function () { location.href = R + 'masyarakat/index.html'; }); });
    return tampil;
  }

  /* ---------- Masyarakat MOTE: gabung / masuk / keanggotaan ---------- */
  var hm = $('[data-masuk]');
  if (hm) {
    var dua = $('.m-dua', hm), ag = $('[data-ag]', hm), tampilProfil = ag ? profil(ag) : null;
    var keanggotaan = function () { dua.hidden = true; $('[data-m-jadi]').hidden = true; hm.classList.add('anggota-on'); ag.hidden = false; tampilProfil(); };
    if (A.masuk()) {
      if (lanjut) { location.replace(R + lanjut); return; }
      keanggotaan(); A.segar().then(function () { A.masuk() ? tampilProfil() : location.reload(); });
      return;
    }
    var slug = (lanjut.match(/kelas=([a-z0-9-]+)/) || [])[1];
    if (slug && K[slug]) { var n = $('[data-m-kelas]'); n.hidden = false; $('b', n).textContent = K[slug].judul; }
    var pratinjau = $('[data-m-kartu]'), fD = $('[data-m-daftar]'), fM = $('[data-m-masuk]'), fileFoto = null, urlFoto = '';
    var gambar = function () {
      var d = {}; new FormData(fD).forEach(function (v, k) { d[k] = String(v); });
      pratinjau.innerHTML = A.kartu({ nama: d.nama, kota: d.kota, pekerjaan: d.pekerjaan, fotoLokal: urlFoto, kartu: kartuDari(d) }, { ubahFoto: true });
    };
    gambar();
    fD.addEventListener('input', gambar); fD.addEventListener('change', gambar);
    var pilih = $('[data-m-file]');
    pratinjau.addEventListener('click', function (e) { if (e.target.closest('[data-km-foto]')) pilih.click(); });
    pratinjau.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('[data-km-foto]')) { e.preventDefault(); pilih.click(); } });
    $('[data-m-pasang]').addEventListener('click', function () { pilih.click(); });
    var salah = function (f, t) { var p = $('[data-m-galat]', f); p.textContent = t; p.hidden = !t; };
    pilih.addEventListener('change', function () {
      var f = pilih.files[0]; if (!f) return;
      if (!/^image\//.test(f.type)) { salah(fD, 'Pilih file foto ya (JPG atau PNG).'); return; }
      fileFoto = f; if (urlFoto) URL.revokeObjectURL(urlFoto); urlFoto = URL.createObjectURL(f); gambar();
    });
    var tab = function (ke) {
      fD.hidden = ke !== 'daftar'; fM.hidden = ke !== 'masuk';
      $$('[data-m-tab]').forEach(function (b) { b.classList.toggle('on', b.dataset.mTab === ke); b.setAttribute('aria-selected', b.dataset.mTab === ke); });
      hm.classList.toggle('mode-masuk', ke === 'masuk');
    };
    $$('[data-m-tab]').forEach(function (b) { b.addEventListener('click', function () { tab(b.dataset.mTab); }); });
    if (q.get('mode') === 'masuk') tab('masuk');
    var sibuk = function (f, ya) { var b = $('button[type=submit]', f); b.disabled = ya; b.classList.toggle('sibuk', ya); };
    var jadi = function (d) {
      // momen kartu jadi: nomor anggota muncul, lalu lanjut ke tujuan
      A.tombol();
      hm.classList.add('jadi'); dua.hidden = true;
      $('[data-m-jadi]').hidden = false;
      $('[data-m-ke]').textContent = d.akun.ke;
      $('[data-m-kartu-jadi]').innerHTML = A.kartu(d.akun);
      var b = $('[data-m-lanjut]');
      if (lanjut) { b.href = R + lanjut; $('span', b).textContent = /checkout/.test(lanjut) ? 'Lanjut ambil kelasnya' : 'Lanjut'; }
      else { b.href = R + 'masyarakat/index.html'; $('span', b).textContent = 'Lihat kartu & profilku'; }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    fD.addEventListener('submit', function (e) {
      e.preventDefault(); salah(fD, '');
      var d = {}; new FormData(fD).forEach(function (v, k) { d[k] = String(v).trim(); });
      d.kartu = kartuDari(d);
      sibuk(fD, true);
      A.daftar(d).then(function (data) {
        if (!fileFoto) return data;
        return A.foto(fileFoto).catch(function () { return data; });   // foto gagal tidak membatalkan kartu
      }).then(jadi).catch(function (er) {
        sibuk(fD, false); salah(fD, er.message);
        if (er.kode === 'ada') { tab('masuk'); fM.elements.email.value = d.email; salah(fM, 'Email ini udah terdaftar sebagai anggota. Masuk pakai sandimu ya.'); }
      });
    });
    fM.addEventListener('submit', function (e) {
      e.preventDefault(); salah(fM, ''); sibuk(fM, true);
      A.masukAkun(fM.elements.email.value.trim(), fM.elements.sandi.value).then(function () {
        if (lanjut) location.href = R + lanjut; else { A.tombol(); keanggotaan(); window.scrollTo(0, 0); }
      }).catch(function (er) { sibuk(fM, false); salah(fM, er.message); });
    });
    return;
  }

  /* ---------- checkout ---------- */
  var co = $('[data-co]');
  if (co) {
    var slug2 = q.get('kelas'), k = K[slug2];
    if (!k) { co.hidden = true; $('[data-co-kosong]').hidden = false; return; }
    var balik = 'kelasmote/checkout.html?kelas=' + slug2;
    if (!A.masuk()) { A.keMasuk(balik); return; }
    $('[data-co-balik]').href = slug2 + '.html';
    $('[data-co-item]').innerHTML = '<img src="' + R + 'aset/kelas/' + slug2 + '.jpg" alt=""><div><small>' + esc(k.label) + ' · ' + esc(k.isi) +
      '</small><b>' + esc(k.judul) + '</b><span>' + esc(k.oleh) + '</span></div>';
    $('[data-co-sub]').textContent = rp(k.harga); $('[data-co-total]').textContent = rp(k.harga);
    $('[data-co-gratis]').hidden = !!k.harga;
    var isi = function () {
      var d = A.data();
      if (A.milik(slug2)) { co.hidden = true; var u = $('[data-co-udah]'); u.hidden = false; $('a', u).href = slug2 + '.html'; return; }
      $('[data-co-kartu]').innerHTML = A.kartu(d.akun, { kecil: true });
      $('[data-co-nama]').textContent = d.akun.nama + ' · ' + d.akun.email;
    };
    isi(); A.segar().then(function () { if (A.masuk()) isi(); else A.keMasuk(balik); });
    $('[data-co-keluar]').addEventListener('click', function (e) { e.preventDefault(); A.keluar().then(function () { A.tombol(); A.keMasuk(balik); }); });
    co.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = $('button[type=submit]', co), g = $('[data-co-galat]'); b.disabled = true; g.hidden = true;
      A.ambil(slug2, k.harga).then(function () { location.href = 'kelasku.html?baru=' + encodeURIComponent(slug2); })
        .catch(function (er) { b.disabled = false; g.textContent = er.message; g.hidden = false; if (er.status === 401) A.keMasuk(balik); });
    });
    return;
  }

  /* ---------- Kelasku: daftar kelas saja ---------- */
  var rak = $('[data-kelasku]');
  if (rak) {
    var tamu = function () { rak.hidden = true; $('[data-ku-kosong]').hidden = true; $('[data-ku-tamu]').hidden = false; var h = $('[data-ku-halo]'); if (h) h.hidden = true; };
    if (!A.masuk()) { tamu(); return; }
    var tampil = function () {
      var d = A.data(); if (!d) return;
      var baru = q.get('baru');
      if (baru && K[baru] && A.milik(baru)) { var s = $('[data-ku-sukses]'); s.hidden = false; $('b', s).textContent = 'Kelasnya udah masuk Kelasku.'; $('p', s).textContent = K[baru].judul + ' Total Rp 0. Klik kelasnya buat mulai belajar.'; }
      $('[data-ku-halo]').textContent = 'Halo ' + (d.akun.panggilan || d.akun.nama.split(' ')[0]) + ', ini kelas yang udah kamu ambil.';
      var ada = d.milik.filter(function (m) { return K[m.kelas]; });
      $('[data-ku-kosong]').hidden = !!ada.length; rak.hidden = !ada.length;
      rak.innerHTML = ada.map(function (m) {
        var k = K[m.kelas];
        return '<a class="ks-kartu ku-kartu" href="' + m.kelas + '.html"><span class="ks-ft"><img src="' + R + 'aset/kelas/' + m.kelas + '.jpg" alt="" loading="lazy"></span>' +
          '<span class="ks-tag">' + esc(k.label) + '</span><b>' + esc(k.judul) + '</b><span class="ks-oleh">' + esc(k.oleh) + '</span>' +
          '<span class="ku-masuk">Masuk ruang belajar <i>→</i></span></a>';
      }).join('');
    };
    tampil(); A.segar().then(function () { A.masuk() ? tampil() : tamu(); });
  }
})();
