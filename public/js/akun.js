/* Akun Kelas MOTE (tingkat 2): kartu anggota Masyarakat Modal Tekun (komunitas yang dibangun MOTE), daftar, masuk, sesi.
   Kartu ini sekaligus cara gabung Masyarakat Modal Tekun dan kunci semua kelas di Kelas MOTE.
   Server: Worker kelas-mote (window.KM_API) + Cloudflare D1. Sesi = token Bearer di localStorage 'kelas-sesi' {token, data}.
   data = {akun: {nama, email, wa, kota, ke, no, dibuat, foto}, milik: [{kelas, harga, waktu}]}. */
(function () {
  var API = window.KM_API || 'https://kelas-mote.motekreatif.workers.dev', KUNCI = 'kelas-sesi';
  function baca() { try { return JSON.parse(localStorage.getItem(KUNCI)) || null; } catch (e) { return null; } }
  function tulis(v) { try { v ? localStorage.setItem(KUNCI, JSON.stringify(v)) : localStorage.removeItem(KUNCI); } catch (e) {} }
  var sesi = baca();

  function api(jalur, isi, biner) {
    var h = {}; if (sesi && sesi.token) h.Authorization = 'Bearer ' + sesi.token;
    if (!biner) h['Content-Type'] = 'text/plain';
    return fetch(API + '/api/' + jalur, { method: isi === undefined ? 'GET' : 'POST', headers: h, body: biner ? isi : (isi === undefined ? undefined : JSON.stringify(isi)) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { if (!r.ok) { var e = new Error(d.galat || 'Koneksinya lagi bermasalah. Coba lagi ya.'); e.kode = d.kode; e.status = r.status; throw e; } return d; }); });
  }
  function simpan(d) {
    if (d.token) sesi = { token: d.token, data: { akun: d.akun, milik: d.milik } };
    else if (sesi) sesi.data = { akun: d.akun, milik: d.milik };
    tulis(sesi); return sesi.data;
  }
  // kelas yang dulu diambil tanpa akun (disimpan di browser) dipindah ke akun begitu masuk
  function pindahLama() {
    var lama; try { lama = JSON.parse(localStorage.getItem('kelas-punya')) || []; } catch (e) { lama = []; }
    var slug = lama.map(function (x) { return x.slug; }).filter(Boolean);
    if (!slug.length) return Promise.resolve();
    return api('ambil', { kelas: slug, harga: 0 }).then(function (d) { simpan(d); try { localStorage.removeItem('kelas-punya'); } catch (e) {} }).catch(function () {});
  }

  /* kartu anggota: dipakai di halaman daftar (pratinjau langsung), Kelasku, dan checkout */
  function esc(t) { var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; }
  function inisial(n) { return (n || '?').trim().split(/\s+/).slice(0, 2).map(function (x) { return x[0]; }).join('').toUpperCase() || '?'; }
  function bulan(t) { var d = t ? new Date(t) : new Date(); return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }); }
  function kartu(a, opsi) {
    a = a || {}; opsi = opsi || {};
    var foto = a.fotoLokal || (a.foto ? API + a.foto : '');
    return '<div class="km-kartu' + (opsi.kecil ? ' kecil' : '') + '"><div class="km-in"><div class="km-tali"></div>' +
      '<div class="km-h"><span class="bw">' + (window.KM_BOW || '') + '</span><span class="km-kom">MASYARAKAT<br>MODAL TEKUN</span><em>No. ' + esc(a.no || '····') + '</em></div>' +
      '<div class="km-f"' + (opsi.ubahFoto ? ' data-km-foto role="button" tabindex="0" aria-label="Pasang foto"' : '') + '>' +
      (foto ? '<img src="' + esc(foto) + '" alt="">' : '<span class="km-ini">' + esc(inisial(a.nama)) + '</span>') +
      (opsi.ubahFoto ? '<span class="km-ubah">' + (foto ? 'Ganti foto' : '+ Pasang foto') + '</span>' : '') + '</div>' +
      '<div class="km-k"><b>' + esc(a.nama || 'Nama kamu') + '</b><span>' + esc([a.pekerjaan, a.kota || 'Kotamu'].filter(Boolean).join(' · ')) + '</span><i>Anggota sejak ' + esc(bulan(a.dibuat)) + '</i></div>' +
      '</div></div>';
  }
  // foto diperkecil di browser jadi JPEG ±480 px supaya ringan
  function kecilkan(file) {
    return new Promise(function (ok, gagal) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var s = 480 / Math.min(img.width, img.height), w = Math.round(img.width * Math.min(1, s)), h = Math.round(img.height * Math.min(1, s));
        var c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { b ? ok(b) : gagal(new Error('Fotonya nggak kebaca.')); }, 'image/jpeg', .85);
      };
      img.onerror = function () { gagal(new Error('Fotonya nggak kebaca. Coba foto lain.')); };
      img.src = url;
    });
  }

  window.Akun = {
    API: API,
    masuk: function () { return !!(sesi && sesi.token); },
    data: function () { return sesi && sesi.data; },
    milik: function (slug) { return !!(sesi && sesi.data && sesi.data.milik.some(function (m) { return m.kelas === slug; })); },
    segar: function () { if (!this.masuk()) return Promise.resolve(null); return api('saya').then(simpan).catch(function (e) { if (e.status === 401) { sesi = null; tulis(null); } return sesi && sesi.data; }); },
    daftar: function (isi) { return api('daftar', isi).then(simpan).then(function (d) { return pindahLama().then(function () { return sesi.data; }); }); },
    masukAkun: function (email, sandi) { return api('masuk', { email: email, sandi: sandi }).then(simpan).then(function () { return pindahLama().then(function () { return sesi.data; }); }); },
    profil: function (isi) { return api('profil', isi).then(simpan); },
    ambil: function (slug, harga) { return api('ambil', { kelas: slug, harga: harga || 0 }).then(simpan); },
    foto: function (file) { return kecilkan(file).then(function (b) { return api('foto', b, true); }).then(simpan); },
    keluar: function () { var t = api('keluar', {}).catch(function () {}); sesi = null; tulis(null); return t; },
    kartu: kartu, kecilkan: kecilkan,
    // lanjut = jalur dari akar situs, mis. 'kelasmote/checkout.html?kelas=x'
    keMasuk: function (lanjut) { location.href = (window.R_KELAS || '../') + 'masyarakat/index.html?lanjut=' + encodeURIComponent(lanjut || ''); },
    // tombol Masyarakat MOTE di header: foto/inisial + nama panggilan kalau sudah masuk
    tombol: function () {
      var d = sesi && sesi.data, a = d && d.akun;
      [].forEach.call(document.querySelectorAll('[data-km-tombol]'), function (t) {
        if (!t.dataset.ikon) t.dataset.ikon = t.querySelector('.km-av').innerHTML;
        var av = t.querySelector('.km-av'), tl = t.querySelector('.km-tl');
        t.classList.toggle('masuk', !!a);
        if (a) {
          av.innerHTML = a.foto ? '<img src="' + esc(API + a.foto) + '" alt="">' : '<b>' + esc(inisial(a.nama)) + '</b>';
          tl.textContent = a.panggilan || a.nama.split(' ')[0];
          t.setAttribute('aria-label', 'Masyarakat MOTE: kartu & profil ' + (a.panggilan || a.nama));
        } else { av.innerHTML = t.dataset.ikon; tl.textContent = 'Masyarakat MOTE'; t.removeAttribute('aria-label'); }
      });
    }
  };
  function siap() { window.Akun.tombol(); if (sesi) window.Akun.segar().then(function () { window.Akun.tombol(); }); }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', siap) : siap();
})();
