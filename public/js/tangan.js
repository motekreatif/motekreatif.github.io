/* Hero MOTE Kreatif "Creative meet Performance" (acuan: "Arte vs. Diseño Gráfico", metafora The Creation of Adam).
   Tangan biru (performance, stylus) dari kiri atas, tangan oranye (creative, pensil) dari kanan bawah; lengan selalu
   keluar tepi layar. Urutan: tangan menjulur masuk -> stylus menarik kurva vektor turun ke celah "meet",
   pensil mencoret naik ke celah yang sama -> dua tali melilit membentuk dua lengkung simpul MOTE ->
   simpul MENGENCANG (tali menebal, menarik ke tengah, jadi tinta) -> cahaya. Semua lewat animasi garis. */
(function () {
  var ht = document.querySelector('[data-ht]');
  if (!ht) return;
  var svg = ht.querySelector('[data-garis]'), NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T = {
    biru: { el: ht.querySelector('[data-tg=biru]'), ujung: [.0540, .956], pangkal: [.9708, .36], rasio: .7997 },
    oranye: { el: ht.querySelector('[data-tg=oranye]'), ujung: [.977, .389], pangkal: [.05, .87], rasio: .7016 }
  };
  var W, H, B, O, M, K, g, mulai = null, jalan = false, mx = 0, my = 0, cx = 0, cy = 0;

  function atur() {
    W = ht.clientWidth; H = ht.clientHeight;
    var hp = W < 760;
    B = { x: hp ? W * .54 : W * .62, y: hp ? H * .3 : H * .36 };
    O = { x: hp ? W * .44 : W * .34, y: hp ? H * .74 : H * .7 };
    pasang(T.biru, hp ? W * .9 : Math.min(W * .42, 820), B);
    pasang(T.oranye, hp ? W * .95 : Math.min(W * .46, 900), O);
    garis();
  }
  function pasang(t, w, P) {
    t.w = w; t.h = w * t.rasio; t.x = P.x - t.ujung[0] * w; t.y = P.y - t.ujung[1] * t.h;
    t.el.style.width = w + 'px';
    t.el.style.transformOrigin = (t.pangkal[0] * 100) + '% ' + (t.pangkal[1] * 100) + '%';
    var px = t.x + t.pangkal[0] * w, py = t.y + t.pangkal[1] * t.h, L = Math.hypot(px - P.x, py - P.y) || 1;
    t.dx = (px - P.x) / L; t.dy = (py - P.y) / L;
  }
  function el(par, n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); par.appendChild(e); return e; }
  function siapDash(p) { var L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.L = L; return p; }
  function garis() {
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.innerHTML = '';
    var grp = document.createElementNS(NS, 'g'); grp.setAttribute('transform', 'translate(' + W + ' 0) scale(-1 1)'); svg.appendChild(grp);
    var B_ = B, O_ = O; B = { x: W - B_.x, y: B_.y }; O = { x: W - O_.x, y: O_.y };
    var s = Math.min(W, H) / 900, hr = ht.getBoundingClientRect(), mr = ht.querySelector('[data-meet]').getBoundingClientRect();
    M = { x: mr.left - hr.left + mr.width / 2, y: mr.top - hr.top + mr.height / 2 }; K = mr.width;
    ht.style.setProperty('--mx', M.x + 'px'); ht.style.setProperty('--my', M.y + 'px'); ht.style.setProperty('--mk', K + 'px');
    var Mreal = M; M = { x: W - M.x, y: M.y };
    var atas = M.y - .22 * K, bawah = M.y + .22 * K;
    // tali stylus: rapi, turun dari atas ke celah "meet"
    var d1 = 'M' + B.x + ' ' + B.y + ' C ' + (B.x + 240 * s) + ' ' + (B.y + 10 * s) + ' ' + (M.x - 10 * s) + ' ' + (atas - 200 * s) + ' ' + M.x + ' ' + atas;
    // tali pensil: coretan spontan dulu, lalu naik ke celah "meet"
    var d2 = 'M' + O.x + ' ' + O.y +
      ' c ' + 30 * s + ' ' + 30 * s + ' ' + 70 * s + ' ' + -10 * s + ' ' + 40 * s + ' ' + -30 * s +
      ' c ' + -30 * s + ' ' + -18 * s + ' ' + -40 * s + ' ' + 30 * s + ' ' + 5 * s + ' ' + 30 * s +
      ' C ' + (O.x - 120 * s) + ' ' + (O.y + 60 * s) + ' ' + (M.x + 20 * s) + ' ' + (bawah + 200 * s) + ' ' + M.x + ' ' + bawah;
    var tipis = 3.2 * s + 1;
    g = {};
    g.t1 = siapDash(el(grp, 'path', { d: d1, stroke: '#fff', 'stroke-width': tipis }));
    g.t2 = siapDash(el(grp, 'path', { d: d2, stroke: 'var(--ink)', 'stroke-width': tipis }));
    g.cs = [
      ['M' + (O.x + 110 * s) + ' ' + (O.y + 120 * s) + ' l ' + 40 * s + ' ' + 14 * s, '#fff', 14 * s],
      ['M' + (O.x + 100 * s) + ' ' + (O.y + 150 * s) + ' l ' + 48 * s + ' ' + 18 * s, '#fff', 12 * s],
      ['M' + (O.x - 150 * s) + ' ' + (O.y + 140 * s) + ' l ' + -6 * s + ' ' + 26 * s + ' M' + (O.x - 136 * s) + ' ' + (O.y + 138 * s) + ' l ' + -6 * s + ' ' + 26 * s, 'var(--ink)', 4 * s]
    ].map(function (c) { return siapDash(el(grp, 'path', { d: c[0], stroke: c[1], 'stroke-width': c[2] })); });
    var mid = g.t1.getPointAtLength(g.t1.L * .35), hx = 60 * s, sw = 1.6 * s + .5;
    g.hand = [el(grp, 'line', { x1: mid.x - hx, y1: mid.y - 8 * s, x2: mid.x + hx, y2: mid.y + 8 * s, stroke: 'var(--ink)', 'stroke-width': sw }),
      el(grp, 'circle', { cx: mid.x - hx, cy: mid.y - 8 * s, r: 6 * s + 1, fill: 'var(--kun)', stroke: 'var(--ink)', 'stroke-width': sw }),
      el(grp, 'circle', { cx: mid.x + hx, cy: mid.y + 8 * s, r: 6 * s + 1, fill: 'var(--kun)', stroke: 'var(--ink)', 'stroke-width': sw }),
      el(grp, 'rect', { x: mid.x - 6 * s, y: mid.y - 6 * s, width: 12 * s, height: 12 * s, fill: '#fff', stroke: 'var(--ink)', 'stroke-width': sw })];
    g.hand.forEach(function (h) { h.style.opacity = 0; });
    // simpul: dua lengkung bertolak belakang (bentuk logo MOTE), digambar dalam satuan lebar celah K
    var sim = el(grp, 'g', { transform: 'translate(' + M.x + ' ' + M.y + ')', class: 'ht-ikat' });
    function u(v) { return (v * K).toFixed(2); }
    var k1 = 'M 0 ' + u(-.22) + ' C 0 ' + u(-.05) + ' ' + u(-.05) + ' ' + u(.02) + ' ' + u(-.18) + ' ' + u(-.06) +
      ' C ' + u(-.34) + ' ' + u(-.16) + ' ' + u(-.5) + ' ' + u(-.06) + ' ' + u(-.44) + ' ' + u(.06) +
      ' C ' + u(-.38) + ' ' + u(.18) + ' ' + u(-.16) + ' ' + u(.12) + ' ' + u(.02) + ' ' + u(.02) + ' L ' + u(.24) + ' ' + u(-.18);
    var k2 = 'M 0 ' + u(.22) + ' C 0 ' + u(.05) + ' ' + u(.05) + ' ' + u(-.02) + ' ' + u(.18) + ' ' + u(.06) +
      ' C ' + u(.34) + ' ' + u(.16) + ' ' + u(.5) + ' ' + u(.06) + ' ' + u(.44) + ' ' + u(-.06) +
      ' C ' + u(.38) + ' ' + u(-.18) + ' ' + u(.16) + ' ' + u(-.12) + ' ' + u(-.02) + ' ' + u(-.02) + ' L ' + u(-.24) + ' ' + u(.18);
    g.sim = sim;
    g.k1 = siapDash(el(sim, 'path', { d: k1, stroke: '#fff', 'stroke-width': tipis }));
    g.k2 = siapDash(el(sim, 'path', { d: k2, stroke: 'var(--ink)', 'stroke-width': tipis }));
    g.tipis = tipis; g.tebal = Math.max(K * .085, 5); g.Mx = M.x;
    M = Mreal; B = B_; O = O_;
  }
  function ease(x) { return x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3); }
  function inOut(x) { return x <= 0 ? 0 : x >= 1 ? 1 : x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function campur(a, b, e) { return a + (b - a) * e; }
  function warna(e) {   // putih/tinta -> tinta
    var r = Math.round(campur(255, 35, e)), gg = Math.round(campur(255, 34, e)), bb = Math.round(campur(255, 38, e));
    return 'rgb(' + r + ',' + gg + ',' + bb + ')';
  }
  function langkah(now) {
    jalan = false;
    if (!g) return; // gambar tangan belum selesai dimuat, garis belum disiapkan
    if (mulai === null) mulai = now;
    var t = reduce ? 1e6 : now - mulai;
    var m = inOut(t / 900), jauh = (1 - m) * Math.max(W, H) * .45;
    cx += (mx - cx) * .05; cy += (my - cy) * .05;
    ['biru', 'oranye'].forEach(function (k, i) {
      var o = T[k], idle = t > 900 ? Math.sin((t - 900) / (i ? 900 : 760) + i) : 0, sg = i ? -1 : 1;
      o.el.style.transform = 'translate3d(' + (o.x + o.dx * jauh + sg * cx * 14) + 'px,' + (o.y + o.dy * jauh + sg * cy * 10) + 'px,0) rotate(' + idle * (i ? .9 : 1.1) + 'deg)';
    });
    // tali menuju celah "meet"
    var a = inOut((t - 600) / 1100), b = inOut((t - 700) / 1000);
    g.t1.style.strokeDashoffset = g.t1.L * (1 - a);
    g.t2.style.strokeDashoffset = g.t2.L * (1 - b);
    g.cs.forEach(function (c, i) { c.style.strokeDashoffset = c.L * (1 - ease((t - 800 - i * 120) / 350)); });
    var h = ease((t - 1500) / 300); g.hand.forEach(function (x) { x.style.opacity = h; });
    // tali melilit jadi simpul
    var k = inOut((t - 1700) / 900);
    g.k1.style.strokeDashoffset = g.k1.L * (1 - k);
    g.k2.style.strokeDashoffset = g.k2.L * (1 - k);
    // simpul mengencang: menebal, menyusut sedikit ke tengah, jadi tinta
    var z = inOut((t - 2600) / 500), pul = z < 1 ? 1 + .18 * Math.sin(z * Math.PI) * (1 - z) : 1;
    g.k1.setAttribute('stroke-width', campur(g.tipis, g.tebal, z)); g.k2.setAttribute('stroke-width', campur(g.tipis, g.tebal, z));
    g.k1.setAttribute('stroke', warna(z));
    g.sim.setAttribute('transform', 'translate(' + g.Mx + ' ' + M.y + ') scale(' + campur(1.22, 1, z) * pul + ')');
    if (z > .6) ht.classList.add('satu');
    if (!reduce) tick();
  }
  function tick() { if (!jalan) { jalan = true; requestAnimationFrame(langkah); } }
  function siap(img) { return img.complete ? Promise.resolve() : new Promise(function (r) { img.onload = img.onerror = r; }); }
  Promise.all([siap(T.biru.el), siap(T.oranye.el), document.fonts ? document.fonts.ready : 0]).then(function () { atur(); tick(); });
  addEventListener('resize', function () { atur(); tick(); });
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    ht.addEventListener('pointermove', function (e) { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
    ht.addEventListener('pointerleave', function () { mx = 0; my = 0; });
  }
  // lencana pojok kanan bawah disembunyikan selama hero tampil, karena pojok itu dipakai tulisan "Kreatif"
  new IntersectionObserver(function (en) { document.documentElement.classList.toggle('hero-tampak', en[0].isIntersecting); }, { threshold: .2 }).observe(ht);
  new IntersectionObserver(function (en) { if (en[0].isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) { reduce = false; tick(); } else reduce = true; }).observe(ht);
})();
