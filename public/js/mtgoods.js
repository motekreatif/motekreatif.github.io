/* MTGOODS: etalase, halaman barang, keranjang, checkout, pesanan (prototipe lokal).
   Keranjang & pesanan disimpan di localStorage browser ini saja. */
(function () {
  var M = window.MTG || {};
  var PANAH = '<svg viewBox="0 0 16 16" fill="none"><path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" stroke-width="2.2"/></svg>';
  function baca(k, d) { try { var v = localStorage.getItem('mtg-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function simpan(k, v) { try { localStorage.setItem('mtg-' + k, JSON.stringify(v)); } catch (e) {} }
  function rp(n) { return 'Rp' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  // keranjang = [{s: slug, v: indeks varian, q: jumlah}]
  var kr = baca('keranjang', []).filter(function (x) { return M[x.s]; });
  function jumlah() { return kr.reduce(function (a, x) { return a + x.q; }, 0); }
  function subtotal() { return kr.reduce(function (a, x) { return a + M[x.s].harga * x.q; }, 0); }
  function gambar(s, v) { return document.querySelector('[data-foto="' + s + '-' + v + '"]') ? '' : ''; }

  var tk = $('.kontak[href$="keranjang.html"]');
  function lencana() {
    if (!tk) return; var b = $('.nb', tk), n = jumlah();
    if (!n) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('span'); b.className = 'nb'; tk.appendChild(b); }
    b.textContent = n;
  }
  lencana();
  function toast(t) {
    var el = document.createElement('div'); el.className = 'toast'; el.innerHTML = t; document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('on'); });
    setTimeout(function () { el.classList.remove('on'); setTimeout(function () { el.remove(); }, 400); }, 2600);
  }
  function thumb(s, v) {
    var p = M[s], f = p.foto && p.foto[v % p.foto.length];
    var c = p.var[v][1];
    return f ? '<div class="th-mt" style="--c:' + c + '"><img src="../aset/mtgoods/' + f + '" alt=""></div>'
             : '<div class="th-mt" style="--c:' + c + '"><img class="st" src="../aset/stiker/stiker-' + p.st + '.svg" alt=""></div>';
  }
  function tambah(s, v, q) {
    var ada = kr.filter(function (x) { return x.s === s && x.v === v; })[0];
    if (ada) ada.q += q; else kr.push({ s: s, v: v, q: q });
    simpan('keranjang', kr); lencana(); laci(s, v, q);
  }

  // ---- laci "masuk keranjang"
  var L = $('[data-laci]');
  function laci(s, v, q) {
    if (!L) { toast(M[s].nama + ' masuk keranjang.'); return; }
    var p = M[s];
    $('[data-laci-item]', L).innerHTML = '<div class="bl-item">' + thumb(s, v) + '<div class="bl-ket"><b>' + p.nama + '</b><span>' + p.var[v][0] + ' · ' + q + ' barang</span></div><div class="bl-kanan"><b>' + rp(p.harga * q) + '</b></div></div>';
    $('[data-laci-sub]', L).textContent = rp(subtotal());
    L.hidden = false; requestAnimationFrame(function () { L.classList.add('on'); });
  }
  if (L) $$('[data-laci-tutup]', L).forEach(function (b) { b.addEventListener('click', function () { L.classList.remove('on'); setTimeout(function () { L.hidden = true; }, 350); }); });
  if (L) L.addEventListener('click', function (e) { if (e.target === L) { L.classList.remove('on'); setTimeout(function () { L.hidden = true; }, 350); } });
  $$('[data-cepat]').forEach(function (b) { b.addEventListener('click', function () { tambah(b.dataset.cepat, 0, 1); }); });

  // ---- etalase: kategori, cari, urutkan
  var grid = $('[data-grid]');
  if (grid) {
    var kat = '*', cari = '', urut = 'urut';
    function saring() {
      var kartu = $$('.kb', grid), n = 0;
      kartu.sort(function (a, b) {
        if (urut === 'murah') return a.dataset.harga - b.dataset.harga;
        if (urut === 'mahal') return b.dataset.harga - a.dataset.harga;
        return a.dataset.urut - b.dataset.urut;
      }).forEach(function (k) {
        var ok = (kat === '*' || k.dataset.k === kat) && (!cari || k.dataset.nama.indexOf(cari) > -1);
        k.hidden = !ok; if (ok) n++; grid.appendChild(k);
      });
      $('[data-jumlah]').textContent = n; $('.kosong-cari').hidden = n > 0;
    }
    $$('[data-kat] button').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-kat] button').forEach(function (x) { x.classList.toggle('on', x === b); }); kat = b.dataset.k; saring();
      });
    });
    $('[data-cari]').addEventListener('input', function (e) { cari = e.target.value.trim().toLowerCase(); saring(); });
    $('[data-urut]').addEventListener('change', function (e) { urut = e.target.value; saring(); });
    var h = location.hash.slice(1); if (h) { var bt = $('[data-kat] button[data-k="' + h + '"]'); if (bt) bt.click(); }
  }

  // ---- halaman barang
  var br = $('.barang[data-slug]');
  if (br) {
    var s = br.dataset.slug, v = 0, qi = $('[data-qty]');
    function lihat(i) {
      $$('.g-u', br).forEach(function (g) { g.classList.toggle('on', +g.dataset.gu === i); });
      $$('.g-th', br).forEach(function (g) { g.classList.toggle('on', +g.dataset.g === i); });
    }
    $$('.g-th', br).forEach(function (t) { t.addEventListener('click', function () { lihat(+t.dataset.g); }); });
    $$('.vr', br).forEach(function (b) {
      b.addEventListener('click', function () {
        v = +b.dataset.v; $$('.vr', br).forEach(function (x) { x.classList.toggle('on', x === b); });
        $('[data-v-nama]').textContent = M[s].var[v][0]; lihat(v % 3);
      });
    });
    $$('[data-q]', br).forEach(function (b) { b.addEventListener('click', function () { qi.value = Math.max(1, Math.min(20, (+qi.value || 1) + +b.dataset.q)); }); });
    // mode katalog: tombol WhatsApp ikut membawa varian dan jumlah yang dipilih
    var wa = $('[data-wa]');
    function perbaruiWa() {
      if (!wa) return;
      var t = wa.dataset.wa + ', varian ' + M[s].var[v][0] + ', ' + Math.max(1, +qi.value || 1) + ' buah (' + rp(M[s].harga) + '/buah).';
      wa.href = wa.href.split('?')[0] + '?text=' + encodeURIComponent(t);
    }
    $$('.vr, [data-q]', br).forEach(function (b) { b.addEventListener('click', function () { setTimeout(perbaruiWa, 0); }); });
    qi.addEventListener('input', perbaruiWa); perbaruiWa();
    if ($('[data-tambah]')) $('[data-tambah]').addEventListener('click', function () { tambah(s, v, Math.max(1, +qi.value || 1)); });
    if ($('[data-beli]')) $('[data-beli]').addEventListener('click', function () {
      var ada = kr.filter(function (x) { return x.s === s && x.v === v; })[0];
      if (!ada) { kr.push({ s: s, v: v, q: Math.max(1, +qi.value || 1) }); simpan('keranjang', kr); }
      location.href = 'checkout.html';
    });
  }

  // ---- keranjang
  var K = $('[data-keranjang]');
  function gambarKr() {
    if (!K) return;
    K.hidden = !kr.length; $('.kosong-k').hidden = !!kr.length;
    $('.bl-daftar', K).innerHTML = kr.map(function (x, i) {
      var p = M[x.s];
      return '<div class="bl-item">' + thumb(x.s, x.v) + '<div class="bl-ket"><small>' + p.jenis + '</small><b>' + p.nama + '</b><span>' + p.var[x.v][0] + ' · pre-order</span>' +
        '<div class="qty kecil"><button data-i="' + i + '" data-d="-1">−</button><input value="' + x.q + '" readonly><button data-i="' + i + '" data-d="1">+</button></div></div>' +
        '<div class="bl-kanan"><b>' + rp(p.harga * x.q) + '</b><button data-hapus="' + i + '">Hapus</button></div></div>';
    }).join('');
    $('[data-subtotal]', K).textContent = rp(subtotal()); $('[data-n]', K).textContent = jumlah();
    $$('[data-d]', K).forEach(function (b) { b.addEventListener('click', function () { var x = kr[+b.dataset.i]; x.q = Math.max(1, Math.min(20, x.q + +b.dataset.d)); simpan('keranjang', kr); lencana(); gambarKr(); }); });
    $$('[data-hapus]', K).forEach(function (b) { b.addEventListener('click', function () { kr.splice(+b.dataset.hapus, 1); simpan('keranjang', kr); lencana(); gambarKr(); }); });
  }
  gambarKr();

  // ---- checkout
  var co = $('[data-checkout]');
  if (co) {
    if (!kr.length) { location.replace('keranjang.html'); return; }
    $('.rk-item', co).innerHTML = kr.map(function (x) { return '<div class="rk-baris rk-i"><span>' + M[x.s].nama + ' · ' + M[x.s].var[x.v][0] + ' × ' + x.q + '</span><b>' + rp(M[x.s].harga * x.q) + '</b></div>'; }).join('');
    function ongkir() { return +$('input[name=kurir]:checked').value; }
    function biaya() { return $('input[name=bayar]:checked').value === 'va' ? 4000 : 0; }
    function total() { return subtotal() + ongkir() + biaya(); }
    function hitung() {
      $('[data-subtotal]', co).textContent = rp(subtotal()); $('[data-ongkir]', co).textContent = rp(ongkir());
      $('[data-biaya]', co).textContent = biaya() ? rp(biaya()) : 'Gratis';
      $$('[data-total]').forEach(function (e) { e.textContent = rp(total()); });
    }
    $$('input[type=radio]', co).forEach(function (r) { r.addEventListener('change', hitung); }); hitung();
    var modal = $('[data-modal]'), timer;
    $('[data-bayar]').addEventListener('click', function () {
      var wajib = ['nama', 'wa', 'alamat', 'kota'], kurang = null;
      wajib.forEach(function (n) { var i = $('input[name=' + n + ']'); var sal = !i.value.trim(); i.closest('label').classList.toggle('salah', sal); if (sal && !kurang) kurang = i; });
      if (kurang) { kurang.focus(); toast('Lengkapi alamat kirim dulu, ya.'); return; }
      var va = biaya() > 0;
      $('[data-m-judul]').textContent = va ? 'Transfer ke virtual account BCA ini' : 'Scan QRIS ini';
      $('[data-qr]').innerHTML = va ? '<div class="va">8808 0851 9655 8646</div>' : qr();
      modal.hidden = false; var sisa = 899; clearInterval(timer);
      timer = setInterval(function () { sisa = Math.max(0, sisa - 1); $('[data-timer]').textContent = Math.floor(sisa / 60) + ':' + ('0' + sisa % 60).slice(-2); }, 1000);
    });
    $('[data-tutup]').addEventListener('click', function () { modal.hidden = true; clearInterval(timer); });
    $('[data-sudah]').addEventListener('click', function () {
      var ps = baca('pesanan', []), d = new Date();
      ps.unshift({ id: 'MTG-' + String(d.getTime()).slice(-6), tgl: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), isi: kr, total: total(), kurir: $('input[name=kurir]:checked').closest('label').querySelector('b').textContent.split(' · ')[0], kota: $('input[name=kota]').value });
      simpan('pesanan', ps); simpan('keranjang', []); location.href = 'pesanan.html?baru=1';
    });
  }
  function qr() {
    var n = 25, c = '', x, y, s = 11;
    function sudut(a, b) { return '<rect x="' + a + '" y="' + b + '" width="7" height="7" fill="#1A1A1A"/><rect x="' + (a + 1) + '" y="' + (b + 1) + '" width="5" height="5" fill="#fff"/><rect x="' + (a + 2) + '" y="' + (b + 2) + '" width="3" height="3" fill="#1A1A1A"/>'; }
    for (y = 0; y < n; y++) for (x = 0; x < n; x++) {
      if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) continue;
      s = (s * 9301 + 49297) % 233280; if (s / 233280 > 0.52) c += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="#1A1A1A"/>';
    }
    return '<svg viewBox="-1 -1 27 27" shape-rendering="crispEdges"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/>' + c + sudut(0, 0) + sudut(n - 7, 0) + sudut(0, n - 7) + '</svg>';
  }

  // ---- pesananku
  var P = $('[data-pesanan]');
  if (P) {
    var ps = baca('pesanan', []);
    if (/baru=1/.test(location.search)) $('.sukses').hidden = false;
    if (!ps.length) { $('.kosong-k').hidden = false; return; }
    var TAHAP = ['Dibayar', 'Diproduksi', 'Dikirim', 'Sampai'];
    P.innerHTML = ps.map(function (o) {
      return '<article class="psn"><div class="psn-k"><div><small>No. pesanan</small><b>' + o.id + '</b></div><div><small>Tanggal</small><b>' + o.tgl + '</b></div><div><small>Kirim ke</small><b>' + (o.kota || '-') + ' · ' + o.kurir + '</b></div><div><small>Total</small><b>' + rp(o.total) + '</b></div></div>' +
        '<ol class="tahap">' + TAHAP.map(function (t, i) { return '<li class="' + (i === 0 ? 'ok' : (i === 1 ? 'kini' : '')) + '"><i></i><span>' + t + '</span>' + (i === 1 ? '<em>Batch pre-order sedang diproduksi</em>' : '') + '</li>'; }).join('') + '</ol>' +
        '<div class="psn-isi">' + o.isi.map(function (x) { var p = M[x.s]; return p ? '<div class="bl-item">' + thumb(x.s, x.v) + '<div class="bl-ket"><b>' + p.nama + '</b><span>' + p.var[x.v][0] + ' × ' + x.q + '</span></div><div class="bl-kanan"><b>' + rp(p.harga * x.q) + '</b></div></div>' : ''; }).join('') + '</div></article>';
    }).join('');
  }
})();
