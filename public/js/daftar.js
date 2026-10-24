/* Halaman kelas Kelas MOTE: preview bebas; kelas lengkap (ruang belajar) kebuka setelah kelasnya DIAMBIL lewat checkout.
   Semua kelas, gratis maupun berbayar, lewat checkout.html?kelas=<slug> (kelas gratis: total Rp 0), lalu masuk Kelasku.
   Data (akun + daftar kelas milik) disimpan di browser ini (localStorage 'kelas-akun' & 'kelas-punya'). */
(function () {
  var C = window.KELAS_ST || {}, KUNCI = 'kelas-akun';
  function $(s) { return document.querySelector(s); }
  function $$(s) { return [].slice.call(document.querySelectorAll(s)); }
  function baca() { try { return JSON.parse(localStorage.getItem(KUNCI)); } catch (e) { return null; } }

  var layar = $('[data-yt]'), pv = $('[data-pv]');
  var akun = baca(), SLUG = C.slug || 'skill-tersembunyi';
  function punya() { try { return JSON.parse(localStorage.getItem('kelas-punya')) || []; } catch (e) { return []; } }
  // pindahan dari sistem lama (daftar sekali membuka semua kelas): kelas yang dulu dipakai daftar tetap dianggap milik
  try { if (akun && localStorage.getItem('kelas-punya') === null) localStorage.setItem('kelas-punya', JSON.stringify(akun.kelas ? [{ slug: akun.kelas, harga: 0, waktu: akun.waktu }] : [])); } catch (e) {}
  var milik = punya().some(function (k) { return k.slug === SLUG; });
  function buka() { location.href = 'checkout.html?kelas=' + encodeURIComponent(SLUG); }
  $$('[data-buka-daftar]').forEach(function (b) { b.addEventListener('click', buka); });

  function putar(dtk) {
    if (window.Ruang) return Ruang.buka(C.pdf && !C.video ? 'slide' : 'video', dtk);   // pemutar & slideshow sendiri di ruang belajar
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
    var h = $('[data-halo]'); h.hidden = false; h.textContent = 'Halo ' + ((akun && akun.nama) || 'kamu').split(' ')[0] + ', kelas ini udah ada di Kelasku. Selamat belajar.';
    if (window.Ruang) Ruang.tampil();
  }
  $$('[data-tonton]').forEach(function (b) { b.addEventListener('click', function () { if (window.Ruang) Ruang.buka(C.pdf && !C.video ? 'slide' : 'video', C.pdf && !C.video ? 1 : null); else putar(0); }); });
  $$('.ks-bab button').forEach(function (b) {   // daftar isi di halaman kelas (sebelum masuk ruang belajar)
    b.addEventListener('click', function () {
      if (!milik) return buka();
      if (window.Ruang) Ruang.buka(b.dataset.hal ? 'slide' : 'video', +(b.dataset.hal || b.dataset.t));
      else putar(+b.dataset.t);
    });
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
      $('[data-cap]').textContent = b.dataset.cap ? b.dataset.cap : j === 'klip' ? 'Potongan dari kelasnya: ' + b.getAttribute('aria-label').replace('Klip: ', '') + '. Kelas lengkapnya kebuka setelah kamu ambil kelasnya.' : 'Cuplikan slide dari kelasnya.';
    });
  });
  if (milik) terbuka();
})();
