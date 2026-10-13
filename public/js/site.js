/* Gerak situs MOTE (prototipe lokal).
   1. Transisi tali: satu garis digambar lalu menebal sampai menutup layar, dibuka lagi di halaman tujuan.
   2. Muncul saat tergulung (.in), pita terbuka dari kiri, kartu bertumpuk, pemindah brand di logo.
   Berjalan dari file:// tanpa server: perpindahan halaman memakai navigasi biasa. */
(function () {
  var html = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WARNA = { kreatif: '#FCD12D', kelas: '#FE7B00', mtgoods: '#7558FE', lobi: '#232226' };
  var tr = document.querySelector('.tr'), path = tr && tr.querySelector('path');

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
  if (merek) {
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
