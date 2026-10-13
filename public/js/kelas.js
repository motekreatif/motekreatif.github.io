/* Kelas MOTE: keranjang, bayar, Kelasku, ruang belajar (prototipe lokal).
   Isi keranjang, kelas yang "sudah dibeli", dan progres disimpan di localStorage browser ini saja. */
(function () {
  var K = window.KELAS || {};
  var PANAH = '<svg viewBox="0 0 16 16" fill="none"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="2.2"/></svg>';
  var JENIS = { video: 'Video', ebook: 'Ebook', template: 'Template', paket: 'Paket' };

  function baca(k, d) { try { var v = localStorage.getItem('kelas-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function simpan(k, v) { try { localStorage.setItem('kelas-' + k, JSON.stringify(v)); } catch (e) {} }
  function rp(n) { return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(t) { var d = document.createElement('div'); d.innerHTML = t; return d.textContent; }

  var keranjang = baca('keranjang', []).filter(function (s) { return K[s]; });
  var punya = baca('punya', []).filter(function (s) { return K[s]; });
  var progres = baca('progres', {});

  function sampul(s) {
    var p = K[s], tag = '<span class="pil-tag j">' + JENIS[p.j] + ' · level ' + p.lvl + '</span>';
    var TPL = { video: ['benda-ringlight', 'Kelas aslinya lagi diramu,<br>tungguin ya'], ebook: ['metafor-buku-tunas', 'Ebook aslinya lagi diramu,<br>tungguin ya'], template: ['benda-notes', 'Template aslinya lagi diramu,<br>tungguin ya'] };
    function tpl(x, kecil) { var q = K[x], t = TPL[q.j]; return '<div class="tpl" style="--c:' + q.c + ';--ct:' + q.ct + '"><img class="tpl-st" src="../aset/stiker/stiker-' + t[0] + '.svg" alt="">' + (kecil ? '' : '<span class="tpl-lbl">' + t[1] + '</span>') + '</div>'; }
    if (p.paket) return '<div class="sampul foto paket"><div class="kolase">' + p.paket.map(function (x) { return tpl(x, true); }).join('') + '</div>' + tag + '</div>';
    return '<div class="sampul foto">' + tpl(s) + tag + '</div>';
  }

  // ---- angka di tombol Keranjang
  var tk = $('.kontak[href$="keranjang.html"]');
  function lencana() {
    if (!tk) return;
    var b = $('.nb', tk);
    if (!keranjang.length) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('span'); b.className = 'nb'; tk.appendChild(b); }
    b.textContent = keranjang.length;
  }
  lencana();

  function toast(t) {
    var el = document.createElement('div'); el.className = 'toast'; el.innerHTML = t; document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('on'); });
    setTimeout(function () { el.classList.remove('on'); setTimeout(function () { el.remove(); }, 400); }, 2600);
  }

  // paket dianggap "dipunya" kalau semua kelas isinya sudah dipunya
  function dipunya(s) { var p = K[s]; return p.paket ? p.paket.every(function (x) { return punya.indexOf(x) > -1; }) : punya.indexOf(s) > -1; }

  // ---- katalog: tandai yang sudah dibeli
  // mode katalog WhatsApp (tanpa tombol Keranjang): status 'sudah dibeli' dari browser tidak dipakai
  var MODE_WA = !$('.kontak[href$="keranjang.html"]');
  $$('.prod[data-slug],.kk[data-slug]').forEach(function (a) {
    if (MODE_WA || !dipunya(a.dataset.slug)) return;
    a.classList.add('dimiliki');
    if (!K[a.dataset.slug].paket) $$('a', a).concat(a.tagName === 'A' ? [a] : []).forEach(function (x) { x.href = 'belajar.html?id=' + a.dataset.slug; });
  });

  // ---- laci "masuk keranjang"
  var L = $('[data-laci]');
  function tutupLaci() { if (!L) return; L.classList.remove('on'); setTimeout(function () { L.hidden = true; }, 350); }
  function laci(s) {
    if (!L) { toast('<b>' + K[s].judul + '</b> masuk keranjang.'); return; }
    var p = K[s];
    $('[data-laci-item]', L).innerHTML = '<div class="bl-item">' + sampul(s) + '<div class="bl-ket"><small>' + JENIS[p.j] + ' · ' + p.dur + '</small><b>' + p.judul + '</b></div><div class="bl-kanan"><b>' + rp(p.harga) + '</b></div></div>';
    $('[data-laci-sub]', L).textContent = rp(subtotal());
    L.hidden = false; requestAnimationFrame(function () { L.classList.add('on'); });
  }
  if (L) { $$('[data-laci-tutup]', L).forEach(function (b) { b.addEventListener('click', tutupLaci); }); L.addEventListener('click', function (e) { if (e.target === L) tutupLaci(); }); }
  function tambah(s) {
    if (dipunya(s)) { toast('Kelas ini udah kamu punya.'); return false; }
    if (keranjang.indexOf(s) < 0) { keranjang.push(s); simpan('keranjang', keranjang); lencana(); }
    laci(s); return true;
  }
  $$('[data-cepat]').forEach(function (b) { b.addEventListener('click', function () { tambah(b.dataset.cepat); }); });

  // ---- etalase: kategori, cari, urutkan
  var grid = $('[data-grid]');
  if (grid) {
    var kat = '*', cari = '', urut = 'urut';
    function saring() {
      var n = 0;
      $$('.kb', grid).sort(function (a, b) {
        if (urut === 'murah') return a.dataset.harga - b.dataset.harga;
        if (urut === 'mahal') return b.dataset.harga - a.dataset.harga;
        return a.dataset.urut - b.dataset.urut;
      }).forEach(function (k) {
        var ok = (kat === '*' || k.dataset.k === kat) && (!cari || k.dataset.nama.indexOf(cari) > -1);
        k.hidden = !ok; if (ok) n++; grid.appendChild(k);
      });
      $('[data-jumlah]').textContent = n; $('.kosong-cari').hidden = n > 0;
    }
    $$('[data-kat] button').forEach(function (b) { b.addEventListener('click', function () { $$('[data-kat] button').forEach(function (x) { x.classList.toggle('on', x === b); }); kat = b.dataset.k; saring(); }); });
    $('[data-cari]').addEventListener('input', function (e) { cari = e.target.value.trim().toLowerCase(); saring(); });
    $('[data-urut]').addEventListener('change', function (e) { urut = e.target.value; saring(); });
  }

  // ---- banner geser: swipe kiri-kanan (scroll-snap), tombol, titik, jalan sendiri tiap 6 detik
  var gs = $('[data-geser]');
  if (gs) {
    var rel = $('.gs-rel', gs), titik = $$('.gs-titik i', gs), jeda = false;
    function ke(i) { var n = titik.length; i = (i + n) % n; rel.scrollTo({ left: i * rel.clientWidth, behavior: 'smooth' }); }
    function kini() { return Math.round(rel.scrollLeft / rel.clientWidth); }
    rel.addEventListener('scroll', function () { var i = kini(); titik.forEach(function (t, k) { t.classList.toggle('on', k === i); }); });
    $$('[data-gs]', gs).forEach(function (b) { b.addEventListener('click', function () { ke(kini() + +b.dataset.gs); }); });
    titik.forEach(function (t, k) { t.addEventListener('click', function () { ke(k); }); });
    gs.addEventListener('mouseenter', function () { jeda = true; }); gs.addEventListener('mouseleave', function () { jeda = false; });
    gs.addEventListener('touchstart', function () { jeda = true; }, { passive: true });
    setInterval(function () { if (!jeda && !$('.pv-video.main', gs)) ke(kini() + 1); }, 6000);
  }

  // ---- halaman materi
  var mat = $('.materi[data-slug]');
  if (mat && $('[data-tambah]')) {
    var slug = mat.dataset.slug;
    if (punya.indexOf(slug) > -1) { $('[data-aksi]').hidden = true; $('.punya-aksi').hidden = false; }
    var bt = $('[data-tambah]');
    function sudahDiKeranjang() {
      bt.outerHTML = '<a class="btn" href="keranjang.html"><span>Udah di keranjang · lihat</span><span class="ar">' + PANAH + '</span></a>';
    }
    if (punya.indexOf(slug) < 0 && dipunya(slug)) { $('[data-aksi]').hidden = true; $('.punya-aksi').hidden = false; }
    if (keranjang.indexOf(slug) > -1) sudahDiKeranjang();
    else bt.addEventListener('click', function () { if (tambah(slug)) sudahDiKeranjang(); });
    $('[data-beli]').addEventListener('click', function () {
      if (keranjang.indexOf(slug) < 0) { keranjang.push(slug); simpan('keranjang', keranjang); }
      location.href = 'checkout.html';
    });
  }

  // ---- preview video: pemutar tiruan 3 menit
  $$('[data-pv]').forEach(function (pv) {
    var t = 0, jalan = null, u = $('.pv-bar u', pv), tt = $('.pv-t', pv);
    $('.pv-main', pv).addEventListener('click', function () {
      if (jalan) { clearInterval(jalan); jalan = null; pv.classList.remove('main'); return; }
      pv.classList.add('main');
      jalan = setInterval(function () {
        t = Math.min(180, t + 1); u.style.width = (t / 180 * 100) + '%';
        tt.textContent = Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2);
        if (t >= 180) { clearInterval(jalan); jalan = null; pv.classList.remove('main'); pv.classList.add('habis'); }
      }, 1000);
    });
  });

  // ---- keranjang
  var kr = $('[data-keranjang]');
  function subtotal() { return keranjang.reduce(function (a, s) { return a + K[s].harga; }, 0); }
  function gambarKeranjang() {
    if (!kr) return;
    var kosong = !keranjang.length;
    kr.hidden = kosong; $('.kosong-k').hidden = !kosong;
    $('.bl-daftar', kr).innerHTML = keranjang.map(function (s) {
      var p = K[s];
      return '<div class="bl-item">' + sampul(s) + '<div class="bl-ket"><small>' + JENIS[p.j] + ' · ' + p.dur + '</small><b>' + p.judul + '</b><span>Oleh ' + p.oleh + '</span></div>' +
        '<div class="bl-kanan"><b>' + rp(p.harga) + '</b><button data-hapus="' + s + '">Hapus</button></div></div>';
    }).join('');
    $('[data-subtotal]', kr).textContent = rp(subtotal());
    $$('[data-hapus]', kr).forEach(function (b) {
      b.addEventListener('click', function () {
        keranjang = keranjang.filter(function (x) { return x !== b.dataset.hapus; }); simpan('keranjang', keranjang); lencana(); gambarKeranjang();
      });
    });
  }
  gambarKeranjang();

  // ---- bayar
  var co = $('[data-checkout]');
  if (co) {
    if (!keranjang.length) { location.replace('keranjang.html'); return; }
    $('.rk-item', co).innerHTML = keranjang.map(function (s) { return '<div class="rk-baris rk-i"><span>' + K[s].judul + '</span><b>' + rp(K[s].harga) + '</b></div>'; }).join('');
    function biaya() { return $('input[name=bayar]:checked').value === 'va' ? 4000 : 0; }
    function hitung() {
      $('[data-subtotal]', co).textContent = rp(subtotal());
      $('[data-biaya]', co).textContent = biaya() ? rp(biaya()) : 'Gratis';
      $$('[data-total]').forEach(function (e) { e.textContent = rp(subtotal() + biaya()); });
    }
    $$('input[name=bayar]').forEach(function (r) { r.addEventListener('change', hitung); });
    hitung();
    var modal = $('[data-modal]'), timer = null;
    $('[data-bayar]').addEventListener('click', function () {
      var em = $('input[name=email]');
      if (!/.+@.+\..+/.test(em.value)) { em.closest('label').classList.add('salah'); em.focus(); toast('Isi email dulu, tautan ruang belajarnya dikirim ke situ.'); return; }
      em.closest('label').classList.remove('salah');
      var va = biaya() > 0;
      $('[data-m-judul]').textContent = va ? 'Transfer ke virtual account BCA ini' : 'Scan QRIS ini';
      $('[data-qr]').innerHTML = va ? '<div class="va">8808 0851 9655 8646</div>' : qr();
      modal.hidden = false;
      var sisa = 899; clearInterval(timer);
      timer = setInterval(function () { sisa = Math.max(0, sisa - 1); $('[data-timer]').textContent = Math.floor(sisa / 60) + ':' + ('0' + sisa % 60).slice(-2); }, 1000);
    });
    $('[data-tutup]').addEventListener('click', function () { modal.hidden = true; clearInterval(timer); });
    $('[data-sudah]').addEventListener('click', function () {
      keranjang.forEach(function (s) { (K[s].paket || [s]).forEach(function (x) { if (punya.indexOf(x) < 0) punya.push(x); }); });
      simpan('punya', punya); simpan('keranjang', []);
      location.href = 'kelasku.html?baru=1';
    });
  }
  function qr() {
    // kotak QR tiruan: tiga penanda sudut + titik acak yang tetap
    var n = 25, c = '', x, y, s = 7;
    function sudut(a, b) { return '<rect x="' + a + '" y="' + b + '" width="7" height="7" fill="#232226"/><rect x="' + (a + 1) + '" y="' + (b + 1) + '" width="5" height="5" fill="#fff"/><rect x="' + (a + 2) + '" y="' + (b + 2) + '" width="3" height="3" fill="#232226"/>'; }
    for (y = 0; y < n; y++) for (x = 0; x < n; x++) {
      if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue;
      s = (s * 9301 + 49297) % 233280; if (s / 233280 > 0.52) c += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="#232226"/>';
    }
    return '<svg viewBox="-1 -1 27 27" shape-rendering="crispEdges"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/>' + c + sudut(0, 0) + sudut(n - 7, 0) + sudut(0, n - 7) + '</svg>';
  }

  // ---- Kelasku
  var rak = $('[data-rak]');
  if (rak) {
    if (/baru=1/.test(location.search)) $('.sukses').hidden = false;
    if (!punya.length) { rak.hidden = true; $('.kosong-k').hidden = false; }
    rak.innerHTML = punya.map(function (s) {
      var p = K[s], d = (progres[s] || []).length, n = p.isi.length, pr = Math.round(d / n * 100);
      return '<a class="prod rak-i" href="belajar.html?id=' + s + '">' + sampul(s) +
        '<div class="info"><b class="kecil-b">' + p.judul + '</b></div><div class="rak-prog"><i><u style="width:' + pr + '%"></u></i><span>' + (pr ? pr + '% selesai' : 'Belum mulai') + '</span></div></a>';
    }).join('');
  }

  // ---- ruang belajar
  var rb = $('[data-ruang]');
  if (rb) {
    var id = (location.search.match(/id=([\w-]+)/) || [])[1], p = K[id];
    if (!p || punya.indexOf(id) < 0) {
      $('.rb2', rb).hidden = true; $('.kosong-k', rb).hidden = false;
      if (p) $('[data-ke-materi]').href = '' + id + '.html';
      return;
    }
    document.title = p.judul + ' — Kelas MOTE';
    var selesai = progres[id] || [], aktif = 0;
    for (var i = 0; i < p.isi.length; i++) if (selesai.indexOf(i) < 0) { aktif = i; break; }
    var satuan = p.j === 'video' ? 'Part' : (p.j === 'ebook' ? 'Bab' : 'Berkas');

    function layar() {
      var x = p.isi[aktif];
      $('[data-rb-jenis]').textContent = JENIS[p.j] + ' · ' + satuan + ' ' + (aktif + 1) + ' dari ' + p.isi.length;
      $('[data-rb-judul]').textContent = p.judul;
      $('[data-rb-part]').textContent = x[0].replace(/^Bab \d+ · /, '');
      var L = $('.rb-layar', rb), A = $('.rb-aksi', rb);
      if (p.j === 'video') {
        L.innerHTML = '<div class="pv pv-video" data-pv-rb><img src="../aset/img/kelas-vol1.webp" alt=""><button class="pv-main" aria-label="Putar"><svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="currentColor"/></svg></button>' +
          '<div class="pv-bar"><span>0:00</span><i><u></u></i><span>' + x[1] + ':00</span></div></div>';
        $('.pv-main', L).addEventListener('click', function () { L.firstChild.classList.toggle('main'); });
      } else if (p.j === 'ebook') {
        L.innerHTML = '<div class="pv pv-buku baca"><div class="hlm"><small>' + x[0].split(' · ')[0] + '</small><h4>' + x[0].split(' · ').pop() + '</h4><p>Halaman ini contoh tampilan pembaca ebook di ruang belajar. Isi bab yang sebenarnya muncul di sini, bisa digulir di HP, dan posisi terakhir yang kamu baca disimpan otomatis.</p><p>' + x[1] + ' halaman di bab ini.</p></div></div>';
      } else {
        L.innerHTML = '<div class="pv pv-tpl"><div class="th3">' + p.isi.map(function (f) { return '<div class="th" style="--c:' + p.c + ';--ct:' + p.ct + '"><span>' + f[0] + '</span></div>'; }).join('') + '</div></div>';
      }
      var akhir = aktif === p.isi.length - 1, beres = selesai.indexOf(aktif) > -1;
      A.innerHTML = (p.j !== 'video' ? '<button class="sq-b" data-unduh>Unduh ' + (p.j === 'ebook' ? 'PDF' : 'berkas ini') + '</button>' : '') +
        '<button class="btn" data-selesai><span>' + (beres ? (akhir ? 'Udah selesai semua' : 'Lanjut ke ' + satuan.toLowerCase() + ' berikutnya') : (akhir ? 'Tandai selesai' : 'Tandai selesai, lanjut')) + '</span><span class="ar">' + PANAH + '</span></button>';
      var u = $('[data-unduh]', A); if (u) u.addEventListener('click', function () { toast('Di versi asli, berkasnya langsung terunduh.'); });
      $('[data-selesai]', A).addEventListener('click', function () {
        if (selesai.indexOf(aktif) < 0) { selesai.push(aktif); progres[id] = selesai; simpan('progres', progres); }
        if (!akhir) aktif++; else toast('Selamat, kelas <b>' + p.judul + '</b> beres kamu pelajari.');
        gambar();
      });
    }
    function daftar() {
      $('.rb-daftar ol', rb).innerHTML = p.isi.map(function (x, i) {
        var ok = selesai.indexOf(i) > -1;
        return '<li class="' + (i === aktif ? 'on ' : '') + (ok ? 'ok' : '') + '" data-i="' + i + '"><span class="cek">' + (ok ? '✓' : (i + 1)) + '</span><span class="ji">' + x[0].replace(/^Bab \d+ · /, '') + '</span>' +
          (p.j === 'video' ? '<em>' + x[1] + ' mnt</em>' : '') + '</li>';
      }).join('');
      $$('.rb-daftar li', rb).forEach(function (li) { li.addEventListener('click', function () { aktif = +li.dataset.i; gambar(); }); });
      var pr = Math.round(selesai.length / p.isi.length * 100);
      $('[data-rb-persen]').textContent = pr + '%'; $('[data-rb-bar]').style.width = pr + '%';
    }
    function gambar() { layar(); daftar(); }
    gambar();
  }
})();
