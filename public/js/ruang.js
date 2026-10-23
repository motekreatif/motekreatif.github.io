/* Ruang belajar Kelas MOTE: tampilan setelah daftar. Pemutar video & slideshow buatan sendiri.
   Video: kalau RUANG_D.mp4 diisi, pakai berkas video sendiri (<video>); kalau belum, pakai YouTube IFrame API
   dengan kontrol YouTube dimatikan, iframe tidak bisa diklik, dan bilah judul/logo dipotong di luar panggung.
   Slide: gambar per halaman (aset/kelas/slide/<slug>/NN.webp), bukan berkas PDF yang dibuka browser. */
(function () {
  var D = window.RUANG_D, rb = document.querySelector('[data-rb]');
  if (!D || !rb) return;
  function $(s) { return rb.querySelector(s); }
  function $$(s) { return [].slice.call(rb.querySelectorAll(s)); }
  function dua(n) { return (n < 10 ? '0' : '') + n; }
  function jam(t) { t = Math.max(0, t | 0); return (t / 60 | 0) + ':' + dua(t % 60); }
  var panggung = $('[data-panggung]'), mode = null;

  /* ---------- tampil / sembunyi ---------- */
  function tampil() { rb.hidden = false; document.documentElement.classList.add('rg-on'); if (!mode) pakai(D.yt || D.hls || D.mp4 ? 'video' : 'slide'); }
  function tutupRuang() { document.documentElement.classList.remove('rg-on'); rb.hidden = true; jedaVideo(); scrollTo(0, 0); }
  $$('[data-rg-tutup]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); tutupRuang(); }); });
  function pakai(m) {
    mode = m;
    rb.setAttribute('data-mode', m);
    var jd = $('[data-samping-j]'); if (jd) jd.textContent = m === 'video' ? 'Isi video' : 'Isi slide';
    $$('[data-mode-btn]').forEach(function (b) { b.classList.toggle('on', b.dataset.modeBtn === m); b.setAttribute('aria-selected', b.dataset.modeBtn === m); });
    if (m === 'slide') { jedaVideo(); if (!slideSiap) slide(1); }
  }
  $$('[data-mode-btn]').forEach(function (b) { b.addEventListener('click', function () { pakai(b.dataset.modeBtn); }); });

  /* ---------- layar penuh (panggung saja, bukan seluruh halaman) ---------- */
  function layarPenuh() {
    var fs = document.fullscreenElement || document.webkitFullscreenElement;
    if (fs) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    var f = panggung.requestFullscreen || panggung.webkitRequestFullscreen;
    if (f) f.call(panggung); else rb.classList.toggle('rg-penuh-semu');   // iPhone: tanpa API fullscreen, panggung dibentangkan
  }
  $$('[data-fs]').forEach(function (b) { b.addEventListener('click', layarPenuh); });
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (ev) {
    document.addEventListener(ev, function () { rb.classList.toggle('rg-penuh', !!(document.fullscreenElement || document.webkitFullscreenElement)); });
  });

  /* ---------- slideshow ---------- */
  var cur = 1, slideSiap = false, gbr = $('[data-s-img]');
  function slide(h) {
    if (!gbr) return;
    slideSiap = true;
    cur = Math.max(1, Math.min(D.n, h));
    gbr.classList.add('ganti');
    var baru = new Image();
    baru.onload = function () { gbr.src = baru.src; gbr.classList.remove('ganti'); };
    baru.src = D.src + dua(cur) + '.webp';
    if (cur < D.n) new Image().src = D.src + dua(cur + 1) + '.webp';          // muat halaman berikutnya duluan
    $('[data-s-no]').textContent = cur + ' / ' + D.n;
    $$('[data-strip] button').forEach(function (b) { var on = +b.dataset.hal === cur; b.classList.toggle('on', on); if (on && mode === 'slide') b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); });
    tandai('slide', function (b) { return +b.dataset.hal; }, cur);
  }
  $$('[data-s-prev]').forEach(function (b) { b.addEventListener('click', function () { slide(cur - 1); }); });
  $$('[data-s-next]').forEach(function (b) { b.addEventListener('click', function () { slide(cur + 1); }); });
  $$('[data-strip] button,[data-daftar="slide"] button').forEach(function (b) {
    b.addEventListener('click', function () { pakai('slide'); slide(+b.dataset.hal); });
  });
  // geser di HP
  var x0 = null;
  if (gbr) {
    gbr.parentNode.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    gbr.parentNode.addEventListener('touchend', function (e) { if (x0 === null) return; var d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 40) slide(cur + (d < 0 ? 1 : -1)); x0 = null; });
  }

  /* ---------- daftar isi: tandai bagian yang sedang aktif ---------- */
  function tandai(m, nilai, sekarang) {
    var bs = $$('[data-daftar="' + m + '"] button'), aktif = null;
    bs.forEach(function (b) { if (nilai(b) <= sekarang) aktif = b; });
    bs.forEach(function (b) { b.classList.toggle('on', b === aktif); });
    if (aktif) { var g = aktif.closest('details'); if (g && !g.open) g.open = true; }
  }

  /* ---------- pemutar video ---------- */
  var v = $('[data-v]'), tirai = $('[data-tirai]'), rentang = $('[data-rentang]'), waktu = $('[data-waktu]'), pemain = null, jenis = null, durasi = 0, main = false, menunggu = null;
  var api = {   // satu antarmuka untuk YouTube dan <video>
    putar: function () { jenis === 'yt' ? pemain.playVideo() : pemain.play(); },
    jeda: function () { jenis === 'yt' ? pemain.pauseVideo() : pemain.pause(); },
    ke: function (t) { jenis === 'yt' ? pemain.seekTo(t, true) : (pemain.currentTime = t); },
    t: function () { return jenis === 'yt' ? (pemain.getCurrentTime() || 0) : pemain.currentTime; },
    dur: function () { return jenis === 'yt' ? (pemain.getDuration() || 0) : (pemain.duration || 0); },
    laju: function (r) { jenis === 'yt' ? pemain.setPlaybackRate(r) : (pemain.playbackRate = r); },
    bisu: function (b) { jenis === 'yt' ? (b ? pemain.mute() : pemain.unMute()) : (pemain.muted = b); }
  };
  function status(s) {   // s: 'main' | 'jeda' | 'selesai'
    main = s === 'main';
    if (main) v.classList.add('mulai');
    v.classList.toggle('main', main);
    tirai.hidden = main;
    $('[data-tirai-t]').textContent = s === 'selesai' ? 'Tonton lagi' : (api.t() > 1 ? 'Lanjut nonton' : 'Mulai nonton');
    $('[data-main]').classList.toggle('jeda', !main);
    $('[data-main]').setAttribute('aria-label', main ? 'Jeda' : 'Putar');
  }
  function siapkan(cb) {
    if (pemain) return cb();
    if (D.hls || D.mp4) {   // video sendiri (R2): HLS dua kualitas lewat hls.js, atau satu berkas mp4
      jenis = 'mp4';
      pemain = document.createElement('video');
      pemain.playsInline = true; pemain.preload = 'metadata';
      pemain.setAttribute('controlslist', 'nodownload'); pemain.oncontextmenu = function () { return false; };
      $('[data-layar-v]').appendChild(pemain);
      pemain.addEventListener('play', function () { status('main'); });
      pemain.addEventListener('pause', function () { status('jeda'); });
      pemain.addEventListener('ended', function () { status('selesai'); });
      if (!D.hls) { pemain.src = D.mp4; return cb(); }
      muatHls(function () {
        if (window.Hls && Hls.isSupported()) {
          var h = new Hls({ capLevelToPlayerSize: false, startLevel: -1 });
          h.loadSource(D.hls); h.attachMedia(pemain);
          h.on(Hls.Events.MANIFEST_PARSED, function () { menuKualitas(h); cb(); });
        } else { pemain.src = D.hls; cb(); }          // iPhone lama: HLS bawaan, kualitas diatur otomatis oleh sistem
      });
      return;
    }
    jenis = 'yt';
    function buat() {
      pemain = new YT.Player($('[data-layar-v] div'), {
        videoId: D.yt, host: 'https://www.youtube-nocookie.com',
        playerVars: { controls: 0, disablekb: 1, rel: 0, iv_load_policy: 3, playsinline: 1, fs: 0, modestbranding: 1, cc_load_policy: 0 },
        events: {
          onReady: function () { try { pemain.setPlaybackQualityRange && pemain.setPlaybackQualityRange('hd1080'); } catch (e) {} cb(); },
          onStateChange: function (e) {
            if (e.data === 1) status('main');
            else if (e.data === 2) status('jeda');
            else if (e.data === 0) status('selesai');
          }
        }
      });
    }
    if (window.YT && YT.Player) return buat();
    window.onYouTubeIframeAPIReady = buat;
    var s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  }
  function muatHls(cb) {
    if (window.Hls) return cb();
    var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js'; s.onload = cb; s.onerror = cb; document.head.appendChild(s);
  }
  // pilihan kualitas: Otomatis (ikut kecepatan internet) / 1080p / 720p
  function menuKualitas(h) {
    var tb = $('[data-kualitas]'); if (!tb || h.levels.length < 2) return;
    var pil = [{ n: 'Otomatis', i: -1 }].concat(h.levels.map(function (l, i) { return { n: l.height + 'p', i: i }; }).sort(function (a, b) { return h.levels[b.i].height - h.levels[a.i].height; }));
    var menu = $('[data-kualitas-menu]');
    menu.innerHTML = pil.map(function (p) { return '<button data-lv="' + p.i + '"' + (p.i === -1 ? ' class="on"' : '') + '>' + p.n + '</button>'; }).join('');
    tb.hidden = false;
    tb.addEventListener('click', function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; });
    document.addEventListener('click', function () { menu.hidden = true; });
    [].forEach.call(menu.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation(); h.currentLevel = +b.dataset.lv; menu.hidden = true;
        [].forEach.call(menu.querySelectorAll('button'), function (x) { x.classList.toggle('on', x === b); });
        tb.textContent = +b.dataset.lv === -1 ? 'Auto' : h.levels[+b.dataset.lv].height + 'p';
      });
    });
  }
  function video(t) {
    pakai('video');
    siapkan(function () { if (t != null) api.ke(t); api.putar(); });
  }
  function jedaVideo() { if (pemain && main) api.jeda(); }
  if (v) {
    tirai.addEventListener('click', function () { video(null); });
    $('[data-main]').addEventListener('click', function () { if (!pemain) return video(null); main ? api.jeda() : api.putar(); });
    $('[data-lompat]').addEventListener('click', function () { if (pemain) api.ke(Math.max(0, api.t() - 10)); });
    var laju = [1, 1.25, 1.5, 2], li = 0;
    $('[data-laju]').addEventListener('click', function () { li = (li + 1) % laju.length; this.textContent = laju[li] + '×'; if (pemain) api.laju(laju[li]); });
    var diam = false;
    $('[data-bisu]').addEventListener('click', function () { diam = !diam; this.classList.toggle('diam', diam); if (pemain) api.bisu(diam); });
    rentang.addEventListener('input', function () { if (pemain && durasi) { api.ke(rentang.value / 1000 * durasi); } });
    // klik di layar = jeda/putar
    $('[data-ketuk]').addEventListener('click', function () { if (pemain) (main ? api.jeda() : api.putar()); });
    $$('[data-daftar="video"] button').forEach(function (b) { b.addEventListener('click', function () { video(+b.dataset.t); }); });
    setInterval(function () {
      if (!pemain || (jenis === 'yt' && typeof pemain.getDuration !== 'function')) return;   // pemutar YouTube belum siap
      durasi = api.dur(); var t = api.t();
      if (durasi) { rentang.value = t / durasi * 1000; rentang.style.setProperty('--isi', (t / durasi * 100) + '%'); }
      waktu.textContent = jam(t) + ' / ' + jam(durasi);
      tandai('video', function (b) { return +b.dataset.t; }, t + .5);
    }, 250);
    // kontrol menghilang saat video jalan dan kursor diam
    panggung.addEventListener('mousemove', function () { v.classList.remove('idle'); clearTimeout(menunggu); menunggu = setTimeout(function () { if (main) v.classList.add('idle'); }, 2200); });
  }

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    if (rb.hidden || /input|textarea|select/i.test(e.target.tagName)) return;
    if (mode === 'slide') {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { slide(cur + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { slide(cur - 1); e.preventDefault(); }
    } else if (pemain) {
      if (e.key === ' ' || e.key === 'k') { main ? api.jeda() : api.putar(); e.preventDefault(); }
      if (e.key === 'ArrowRight') api.ke(api.t() + 10);
      if (e.key === 'ArrowLeft') api.ke(Math.max(0, api.t() - 10));
    }
    if (e.key === 'f') layarPenuh();
  });

  window.Ruang = {
    tampil: tampil,
    buka: function (m, nilai) { tampil(); scrollTo(0, 0); if (m === 'slide') { pakai('slide'); slide(nilai || 1); } else video(nilai); }
  };
})();
