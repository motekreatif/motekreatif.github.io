/* Gerak situs MOTE (prototipe lokal).
   1. Transisi tali: satu garis digambar lalu menebal sampai menutup layar, dibuka lagi di halaman tujuan.
   2. Muncul saat tergulung (.in), pita terbuka dari kiri, kartu bertumpuk, pemindah brand di logo.
   Berjalan dari file:// tanpa server: perpindahan halaman memakai navigasi biasa. */
(function () {
  var html = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WARNA = { kreatif: '#FCD12D', kelas: '#FE7B00', mtgoods: '#7558FE', lobi: '#232226' };
  var tr = document.querySelector('.tr'), path = tr && tr.querySelector('path');

  // Pengaman klik tembus: di sebagian browser (Safari), klik pada pilihan dropdown <select> ikut "jatuh" ke elemen
  // di bawahnya. Kalau yang kena link (mis. tombol Masyarakat MOTE di header), halaman pindah dan terlihat seperti
  // refresh sendiri. Klik ke link dalam 600 ms setelah dropdown dipakai diabaikan.
  var pilihT = 0;
  ['mousedown', 'change', 'input', 'focusin'].forEach(function (ev) {
    document.addEventListener(ev, function (e) { if (e.target && e.target.tagName === 'SELECT') pilihT = Date.now(); }, true);
  });
  document.addEventListener('click', function (e) {
    if (Date.now() - pilihT < 600 && e.target.closest && e.target.closest('a[href]') && !(e.target.closest('select'))) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);

  function brandDari(href) {
    if (/\/creativeagency\//.test(href)) return 'kreatif';
    if (/\/kelasmote\//.test(href)) return 'kelas';
    if (/\/mtgoods\//.test(href)) return 'mtgoods';
    return 'lobi';
  }
  function anim(el, kf, opt) { return el.animate(kf, Object.assign({ fill: 'forwards', easing: 'cubic-bezier(.7,0,.2,1)' }, opt)); }

  function buka() {
    if (!path) return;
    var w = sessionStorage.getItem('mote-tr');
    if (!w) return;
    sessionStorage.removeItem('mote-tr');
    tr.style.color = w;
    if (reduce) { html.classList.remove('tr-masuk'); return; }
    path.style.strokeWidth = 520; path.style.strokeDashoffset = 0;
    requestAnimationFrame(function () {
      html.classList.remove('tr-masuk');
      var a = anim(path, [{ strokeDashoffset: 0, strokeWidth: 520 }, { strokeDashoffset: -1, strokeWidth: 60 }], { duration: 1100 });
      a.onfinish = function () { path.style.strokeWidth = 0; path.style.strokeDashoffset = 1; a.cancel(); };
    });
  }
  function tutup(href) {
    var w = WARNA[brandDari(href)];
    sessionStorage.setItem('mote-tr', w);
    if (!path || reduce) { location.href = href; return; }
    tr.style.color = w;
    var a = anim(path, [{ strokeDashoffset: 1, strokeWidth: 40 }, { strokeDashoffset: 0, strokeWidth: 520 }], { duration: 950 });
    a.onfinish = function () { location.href = href; };
  }

  // ---- pemindah brand: klik logo membuka daftar brand
  var merek = document.querySelector('.merek');
  if (merek && merek.querySelector('.merek-menu, .lg-geser')) {   // dropdown sudah tidak dipakai (navigasi = pil logogram); dibiarkan kalau suatu saat kembali
    var tombol = merek.querySelector('.logo');
    tombol.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var b = merek.classList.toggle('buka'); tombol.setAttribute('aria-expanded', b);
    });
    document.addEventListener('click', function (e) { if (!merek.contains(e.target)) merek.classList.remove('buka'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') merek.classList.remove('buka'); });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var h = a.getAttribute('href');
    if (!h || h.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(h)) return;
    if (a.href.split('#')[0] === location.href.split('#')[0]) return;
    e.preventDefault(); tutup(a.href);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && path) { html.classList.remove('tr-masuk'); path.getAnimations().forEach(function (x) { x.cancel(); }); path.style.strokeWidth = 0; }
  });
  buka();

  // ---- muncul saat tergulung
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('[data-in]').forEach(function (el) { io.observe(el); });

  // ---- saringan (katalog, karya)
  document.querySelectorAll('[data-saring]').forEach(function (grup) {
    var target = document.querySelector(grup.dataset.saring);
    grup.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      grup.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      var k = b.dataset.k;
      target.querySelectorAll('[data-k]').forEach(function (it) {
        it.classList.toggle('kosong', k !== '*' && it.dataset.k.split(' ').indexOf(k) < 0);
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
  });

  // ---- kartu ID tim: miring mengikuti kursor
  if (!reduce) document.querySelectorAll('.idc').forEach(function (k) {
    var inn = k.querySelector('.idc-in');
    k.addEventListener('mousemove', function (e) {
      var r = k.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      inn.style.setProperty('--rx', (x * 14).toFixed(1) + 'deg'); inn.style.setProperty('--ry', (-y * 12).toFixed(1) + 'deg');
    });
    k.addEventListener('mouseleave', function () { inn.style.setProperty('--rx', '0deg'); inn.style.setProperty('--ry', '0deg'); });
  });

  // ---- visi: baris lapis dan lingkarannya saling menyalakan
  var visi = document.querySelector('.visi');
  if (visi) visi.querySelectorAll('[data-ring]').forEach(function (el) {
    function nyala() { visi.setAttribute('data-nyala', el.getAttribute('data-ring')); }
    function padam() { visi.removeAttribute('data-nyala'); }
    el.addEventListener('mouseenter', nyala); el.addEventListener('mouseleave', padam);
    el.addEventListener('focus', nyala); el.addEventListener('blur', padam);
  });

  // ---- video studi kasus: jalan tanpa suara saat kelihatan, tombol menyalakan suara (cuma satu yang bersuara)
  var hps = document.querySelectorAll('.hp');
  if (hps.length) {
    var lihat = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        var v = x.target;
        if (x.isIntersecting) { if (!reduce || !v.muted) v.play().catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.4 });
    hps.forEach(function (h) {
      var v = h.querySelector('video'), b = h.querySelector('.hp-b');
      lihat.observe(v);
      b.addEventListener('click', function () {
        var nyala = v.muted;
        hps.forEach(function (o) { o.querySelector('video').muted = true; o.classList.remove('bunyi'); });
        if (nyala) { v.muted = false; v.currentTime = 0; v.play().catch(function () {}); h.classList.add('bunyi'); }
      });
    });
  }

  if (!window.gsap || !window.ScrollTrigger || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('[data-par]').forEach(function (el) {
    var s = parseFloat(el.dataset.par);
    gsap.fromTo(el, { y: 40 * s }, { y: -40 * s, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 } });
  });
  document.querySelectorAll('.kipas,.pintu3').forEach(function (k) {
    gsap.from(k.children, { y: 110, rotate: 0, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.09, clearProps: 'transform,opacity',
      scrollTrigger: { trigger: k, start: 'top 84%' } });
  });
  var kartu = gsap.utils.toArray('.kt');
  kartu.forEach(function (k, i) {
    if (i === kartu.length - 1) return;
    gsap.to(k, { scale: 0.94, ease: 'none', scrollTrigger: { trigger: kartu[i + 1], start: 'top 85%', end: 'top 30%', scrub: true } });
  });
  var len = document.querySelector('.lencana svg.tx');
  if (len) { len.style.animation = 'none'; gsap.to(len, { rotate: 720, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 } }); }
})();

/* RAG (aturan tipografi MOTE, memory feedback-tipografi-rag-measure):
   blok teks pendek (2–6 baris) dipersempit selebar mungkin TANPA menambah jumlah baris, jadi panjang baris seimbang
   dan baris terakhir tidak sisa satu-dua kata. Dikerjakan pakai skrip karena text-wrap:balance di Safari gagal
   pada paragraf yang berisi teks bersorot. Blok yang punya latar/garis (lebarnya bagian dari desain) dilewati. */
(function () {
  var SEL = 'p, li, dd, dt, figcaption, blockquote, .lead, h3, h4';
  function baris(el, lh) { return Math.round(el.offsetHeight / lh); }   // ukuran tata letak, tidak terpengaruh animasi transform
  function seimbang(el) {
    if (el.closest('svg, .mq, nav, .nav, .tr, [hidden], .fo, .tl-st, .km-kartu, .sambut-profil') || el.querySelector('.ln') || !el.offsetParent) return;   // benda di meja (sticky note), kartu diagram & kartu anggota punya lebar desain sendiri
    el.style.maxWidth = '';
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.display.indexOf('flex') > -1 || cs.display.indexOf('grid') > -1 || cs.display === 'inline') return;
    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(cs.borderTopWidth) || parseFloat(cs.borderBottomWidth)) return;
    var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4, n = baris(el, lh);
    if (n < 2 || n > 6) return;
    var hi = el.offsetWidth, lo = hi * .45; if (hi < 60) { el.style.maxWidth = ''; return; }
    for (var k = 0; k < 9; k++) { var m = (lo + hi) / 2; el.style.maxWidth = m + 'px'; if (baris(el, lh) > n) lo = m; else hi = m; }
    el.style.maxWidth = Math.ceil(hi + 1) + 'px';
    if (cs.textAlign === 'center') { el.style.marginLeft = 'auto'; el.style.marginRight = 'auto'; }
    else if (cs.textAlign === 'right' || cs.textAlign === 'end') el.style.marginLeft = 'auto';
  }
  function atur() { [].forEach.call(document.querySelectorAll(SEL), seimbang); }
  window.ragUlang = atur;
  var t, w = innerWidth;
  addEventListener('resize', function () { if (innerWidth === w) return; w = innerWidth; clearTimeout(t); t = setTimeout(atur, 150); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { atur(); setTimeout(atur, 900); });
  // teks yang masuk belakangan lewat skrip (profil, Kelasku, sapaan) dan bagian yang baru dibuka (FAQ) ikut diseimbangkan
  var m;
  new MutationObserver(function () { clearTimeout(m); m = setTimeout(atur, 250); })
    .observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['open', 'hidden'] });
})();

/* Warna sorotan kursor tombol header: ikut warna brand tujuan tombolnya (Kelas MOTE oranye, MTGOODS ungu,
   MOTE Kreatif kuning). Tombol tanpa tujuan brand (Tentang, Masyarakat MOTE, chat admin, pemindah brand) memakai
   warna brand halaman yang sedang dibuka, dan kuning MOTE sebagai bawaan. Teks dipilih yang kontras. */
(function () {
  // Semiotika warna: tujuan di luar situs pakai warna yang sudah melekat di kepala orang untuk platform itu
  // (WhatsApp hijau, Shopee oranye-merah, Tokopedia hijau), tujuan di dalam situs pakai warna brand MOTE.
  var W = { kreatif: ['#FCD12D', '#232226'], kelas: ['#FE7B00', '#fff'], mtgoods: ['#7558FE', '#fff'], kuning: ['#FCD12D', '#232226'],
            wa: ['#25D366', '#232226'], shopee: ['#EE4D2D', '#fff'], tokopedia: ['#03AC0E', '#fff'] };
  function dari(href) {
    if (!href) return null;
    if (/wa\.me|whatsapp\.com|api\.whatsapp/.test(href)) return 'wa';
    if (/shopee\./.test(href)) return 'shopee';
    if (/tokopedia\./.test(href)) return 'tokopedia';
    if (/\/kelasmote\//.test(href)) return 'kelas';
    if (/\/mtgoods\//.test(href)) return 'mtgoods';
    if (/\/creativeagency\//.test(href)) return 'kreatif';
    return null;
  }
  var hal = (document.body.className.match(/b-(kreatif|kelas|mtgoods)/) || [])[1] || 'kuning';
  [].forEach.call(document.querySelectorAll('.nav-in a, .merek-menu a'), function (el) {
    var w = W[dari(el.getAttribute('href') && el.href) || (el.closest('.merek-menu') ? 'kuning' : hal)];
    el.style.setProperty('--hv', w[0]); el.style.setProperty('--hvt', w[1]); el.classList.add('hv');
  });
})();

/* Kartu tim: lapisan stiker peran (.idc-stw) disamakan posisi & ukurannya dengan kotak foto, supaya stiker tampil
   di DEPAN pop-up fakta unik (kotak foto memotong isinya, jadi stiker tidak bisa tinggal di dalamnya). */
(function () {
  var k = document.querySelectorAll('.idc'); if (!k.length) return;
  function atur() {
    [].forEach.call(k, function (c) {
      var inn = c.querySelector('.idc-in'), f = c.querySelector('.idc-f'), w = c.querySelector('.idc-stw'); if (!f || !w) return;
      w.style.left = (inn.offsetLeft + f.offsetLeft) + 'px'; w.style.top = (inn.offsetTop + f.offsetTop) + 'px';
      w.style.width = f.offsetWidth + 'px'; w.style.height = f.offsetHeight + 'px';
    });
  }
  atur(); addEventListener('load', atur); addEventListener('resize', atur);
})();

/* Lobby: lebar tiap tombol logogram diukur (lebar logogram & lebar nama) supaya animasi melebar mulus */
(function () {
  var a = document.querySelectorAll('.menu-lg a'); if (!a.length) return;
  function ukur() {
    [].forEach.call(a, function (el) {
      var ik = el.querySelector('.ik'), tx = el.querySelector('.tx');
      el.style.setProperty('--wi', Math.ceil(ik.offsetWidth + (innerWidth < 760 ? 16 : 30)) + 'px');
      el.style.setProperty('--wt', Math.ceil(tx.offsetWidth + 34) + 'px');
    });
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(ukur); addEventListener('load', ukur); addEventListener('resize', ukur);
})();
