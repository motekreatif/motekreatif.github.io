/* Kelas gratis Kelas MOTE: preview bebas, kelas lengkap kebuka setelah daftar. Dua jenis halaman:
   kelas video (KELAS_ST.yt: YouTube + PDF) dan kelas PDF (KELAS_ST.pdf: slide dibaca/diunduh, bab = halaman slide).
   Akun disimpan sekali untuk semua kelas, jadi daftar di satu kelas membuka kelas lainnya.
   Data pendaftar disimpan di browser ini (localStorage) dan, kalau KELAS_ST.url diisi, dikirim ke alamat itu. */
(function () {
  var C = window.KELAS_ST || {}, KUNCI = 'kelas-akun';
  function $(s) { return document.querySelector(s); }
  function $$(s) { return [].slice.call(document.querySelectorAll(s)); }
  function baca() { try { return JSON.parse(localStorage.getItem(KUNCI)); } catch (e) { return null; } }
  function simpan(v) { try { localStorage.setItem(KUNCI, JSON.stringify(v)); } catch (e) {} }

  var modal = $('[data-modal]'), form = $('[data-form]'), layar = $('[data-yt]'), pv = $('[data-pv]');
  var akun = baca();

  function buka() { modal.hidden = false; requestAnimationFrame(function () { modal.classList.add('on'); }); var f = form.querySelector('input'); if (f) f.focus(); }
  function tutup() { modal.classList.remove('on'); setTimeout(function () { modal.hidden = true; }, 180); }
  $$('[data-buka-daftar]').forEach(function (b) { b.addEventListener('click', buka); });
  $$('[data-tutup]').forEach(function (b) { b.addEventListener('click', tutup); });
  modal.addEventListener('click', function (e) { if (e.target === modal) tutup(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) tutup(); });

  function putar(dtk) {
    if (window.Ruang) return Ruang.buka(C.pdf ? 'slide' : 'video', dtk);   // pemutar & slideshow sendiri di ruang belajar
    if (!C.yt) return;
    if (pv) { pv.pause(); pv.hidden = true; }
    var g = document.querySelector('[data-gbr]'); if (g) g.hidden = true;
    var kl = document.querySelector('[data-klip]'); if (kl) { kl.pause(); kl.hidden = true; }
    layar.hidden = false;
    layar.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + C.yt + '?rel=0&modestbranding=1&autoplay=1&start=' + (dtk || 0) +
      '" title="Kelas MOTE" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    $('[data-cap]').textContent = 'Kelas lengkapnya udah kebuka. Klik salah satu bagian di daftar isi video buat lompat ke menitnya.';
    layar.closest('.ks-pemutar').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function terbuka() {
    document.documentElement.classList.add('ks-terbuka');
    $('[data-belum]').hidden = true; $('[data-sudah]').hidden = false;
    var h = $('[data-halo]'); h.hidden = false; h.textContent = 'Halo ' + akun.nama.split(' ')[0] + ', kelasnya sudah kebuka. Selamat belajar.';
    if (window.Ruang) Ruang.tampil();
  }
  $$('[data-tonton]').forEach(function (b) { b.addEventListener('click', function () { if (window.Ruang) Ruang.buka(C.pdf ? 'slide' : 'video', C.pdf ? 1 : null); else putar(0); }); });
  $$('.ks-bab button').forEach(function (b) {   // daftar isi di halaman kelas (sebelum masuk ruang belajar)
    b.addEventListener('click', function () {
      if (!akun) return buka();
      if (window.Ruang) Ruang.buka(b.dataset.hal ? 'slide' : 'video', +(b.dataset.hal || b.dataset.t));
      else putar(+b.dataset.t);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = {}; new FormData(form).forEach(function (v, k) { d[k] = String(v).trim(); });
    d.waktu = new Date().toISOString(); d.kelas = C.slug || 'skill-tersembunyi';
    akun = d; simpan(d);
    if (C.url) { try { fetch(C.url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(d) }); } catch (er) {} }
    tutup(); terbuka(); if (window.Ruang) Ruang.buka(C.pdf ? 'slide' : 'video', C.pdf ? 1 : null); else putar(0);
  });
  // galeri: thumbnail ganti tampilan utama (preview kelas / klip pendek / cuplikan slide)
  var gbr = $('[data-gbr]'), klip = $('[data-klip]');
  $$('[data-th]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('[data-th]').forEach(function (x) { x.classList.toggle('on', x === b); });
      var j = b.dataset.jenis, yt = layar && !layar.hidden;
      if (pv) pv.pause(); if (klip) { klip.pause(); klip.hidden = j !== 'klip'; }
      gbr.hidden = j !== 'gbr';
      if (j === 'gbr') { gbr.src = b.dataset.th; if (pv) pv.hidden = true; }
      if (j === 'klip') {
        var awal = b === document.querySelector('[data-th]');
        if (awal && pv && !yt) { pv.hidden = false; klip.hidden = true; }
        else { if (pv) pv.hidden = true; klip.src = b.dataset.th; klip.play().catch(function () {}); }
      }
      $('[data-cap]').textContent = b.dataset.cap ? b.dataset.cap : j === 'klip' ? 'Potongan dari kelasnya: ' + b.getAttribute('aria-label').replace('Klip: ', '') + '. Kelas lengkapnya kebuka setelah kamu daftar gratis.' : 'Cuplikan slide dari kelasnya.';
    });
  });
  if (akun) terbuka();
})();
