/* Lobi: benda jatuh dengan gravitasi dan saling bertumbukan (Matter.js).
   Kursor yang menyapu mendorong benda searah geraknya; kursor yang diam tidak mendorong,
   supaya label brand tetap bisa diklik. Tanpa gerak (prefers-reduced-motion): tumpukan langsung jadi. */
(function () {
  var sec = document.querySelector('.sambut'), meja = sec && sec.querySelector('.meja');
  if (!meja || !window.Matter) return;
  var M = Matter, Bodies = M.Bodies, Body = M.Body, Composite = M.Composite;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sempit = meja.clientWidth < 760;
  var els = [].slice.call(meja.querySelectorAll('.fo')).filter(function (el) {
    if (sempit && el.dataset.hp === '0') { el.remove(); return false; } return true;
  });
  var engine = M.Engine.create({ enableSleeping: false });
  engine.gravity.y = 1.1;
  var W, H, dinding = [], benda = [];

  function ukur() { W = meja.clientWidth; H = meja.clientHeight; }
  function pasangDinding() {
    Composite.remove(engine.world, dinding);
    var t = 400;
    dinding = [
      Bodies.rectangle(W / 2, H + t / 2, W * 3, t, { isStatic: true }),
      Bodies.rectangle(-t / 2, 0, t, H * 4, { isStatic: true }),
      Bodies.rectangle(W + t / 2, 0, t, H * 4, { isStatic: true })
    ];
    Composite.add(engine.world, dinding);
  }
  // skala ikut LUAS layar, bukan cuma lebar: tumpukan selalu mengisi porsi layar yang sama
  // (kalibrasi: 1440x900 -> 1,4375). Layar tegak (tablet, HP) otomatis dapat benda lebih besar.
  function skala() { return Math.min(Math.sqrt(3.306 * H / W), 3); }
  function lebar(el) {
    return Math.min(Math.max(W * parseFloat(el.dataset.w) * skala(), 40), W * 0.6);
  }
  function tampil(b) {
    var el = b.el;
    el.style.transform = 'translate(' + (b.position.x - b.w / 2) + 'px,' + (b.position.y - b.h / 2) + 'px) rotate(' + b.angle + 'rad)';
  }
  function siap(el) {
    var img = el.querySelector('img');
    return img.complete ? Promise.resolve() : new Promise(function (r) { img.onload = img.onerror = r; });
  }

  ukur(); pasangDinding();
  els.forEach(function (el) { el.style.width = lebar(el) + 'px'; });

  Promise.all(els.map(siap)).then(function () {
    var kiri = W < 760 ? 0.08 : 0.32;
    els.forEach(function (el, i) {
      var w = el.offsetWidth, h = el.offsetHeight;
      var x = W * (kiri + Math.random() * (0.96 - kiri));
      x = Math.min(Math.max(x, w / 2 + 4), W - w / 2 - 4);
      var b = Bodies.rectangle(x, -h / 2 - 40, w * 0.94, h * 0.94, {
        chamfer: { radius: Math.min(w, h) * 0.12 }, restitution: 0.18, friction: 0.55, frictionAir: 0.012, density: 0.0016
      });
      b.alas = el.classList.contains('fo-alas');
      if (b.alas) {
        // alas potong: jatuh paling awal, tetap rata di dasar, berat supaya tak terdorong jauh
        Body.setPosition(b, { x: W < 760 ? W / 2 : W * 0.62, y: -h / 2 - 40 });
        Body.setInertia(b, Infinity); Body.setDensity(b, 0.006);
      } else Body.setAngle(b, (Math.random() - 0.5) * 0.7);
      b.el = el; b.w = w; b.h = h;
      // benda berlabel & catatan: selalu kembali tegak supaya tulisannya terbaca
      b.tegak = el.matches('.fo-catatan, .fo-tegak');
      benda.push(b);
      if (reduce) { Body.setPosition(b, { x: x, y: H - h / 2 - i * 6 }); Composite.add(engine.world, b); }
      else setTimeout(function () { Composite.add(engine.world, b); if (!b.alas) Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.08); }, (b.alas ? 0 : 450) + i * 110);
    });
    if (reduce) { for (var s = 0; s < 900; s++) M.Engine.update(engine, 1000 / 60); benda.forEach(tampil); return; }
    jalan();
  });

  // genggam & lempar (mouse saja): benda ikut kursor dari titik yang dipegang, dilepas membawa kecepatannya
  var genggam = null;
  if (matchMedia('(pointer: fine)').matches && !reduce) {
    var mouse = M.Mouse.create(meja);
    meja.removeEventListener('wheel', mouse.mousewheel); meja.removeEventListener('mousewheel', mouse.mousewheel); meja.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    genggam = M.MouseConstraint.create(engine, { mouse: mouse, constraint: { stiffness: 0.18, damping: 0.08, render: { visible: false } } });
    Composite.add(engine.world, genggam);
    M.Events.on(genggam, 'startdrag', function () { meja.classList.add('genggam'); });
    M.Events.on(genggam, 'enddrag', function () { meja.classList.remove('genggam'); });
  }

  // kursor: dorongan sebanding kecepatan sapuan, makin dekat makin kuat
  var kursor = null;
  function gerak(e) {
    var r = meja.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, t = performance.now();
    if (kursor) {
      var dt = Math.max(t - kursor.t, 8);
      kursor.vx = (x - kursor.x) / dt * 16.7; kursor.vy = (y - kursor.y) / dt * 16.7;
    }
    kursor = { x: x, y: y, t: t, vx: kursor ? kursor.vx : 0, vy: kursor ? kursor.vy : 0 };
  }
  sec.addEventListener('pointermove', gerak, { passive: true });
  sec.addEventListener('pointerleave', function () { kursor = null; });

  function dorong() {
    if (!kursor || (genggam && genggam.body)) return;
    var cepat = Math.hypot(kursor.vx, kursor.vy);
    if (cepat < 2.5) return;
    benda.forEach(function (b) {
      var dx = b.position.x - kursor.x, dy = b.position.y - kursor.y, d = Math.hypot(dx, dy);
      var jang = Math.max(b.w, b.h) / 2 + 40;
      if (d > jang) return;
      var f = 1 - d / jang;
      var vx = b.velocity.x + kursor.vx * 0.45 * f + (dx / (d || 1)) * 3 * f;
      var vy = b.velocity.y + kursor.vy * 0.45 * f - 4 * f;
      var m = Math.hypot(vx, vy), batas = 38;
      if (m > batas) { vx *= batas / m; vy *= batas / m; }
      Body.setVelocity(b, { x: vx, y: vy });
      Body.setAngularVelocity(b, b.angularVelocity + (kursor.vx > 0 ? 1 : -1) * 0.02 * f);
    });
    kursor.vx *= 0.5; kursor.vy *= 0.5;
  }

  var tampak = true, rafId = 0;
  function langkah() {
    dorong();
    M.Engine.update(engine, 1000 / 60);
    benda.forEach(function (b) {
      if (b.tegak) {
        var sudut = Math.atan2(Math.sin(b.angle), Math.cos(b.angle));
        Body.setAngularVelocity(b, b.angularVelocity * 0.9 - sudut * 0.012);
      }
      if (b.position.y > H + 600 || b.position.x < -300 || b.position.x > W + 300) {
        Body.setPosition(b, { x: W * 0.6, y: -b.h }); Body.setVelocity(b, { x: 0, y: 0 });
      }
      tampil(b);
    });
    rafId = tampak ? requestAnimationFrame(langkah) : 0;
  }
  function jalan() { if (!rafId) rafId = requestAnimationFrame(langkah); }
  new IntersectionObserver(function (en) { tampak = en[0].isIntersecting; if (tampak && benda.length) jalan(); }).observe(sec);

  var tunda;
  addEventListener('resize', function () {
    clearTimeout(tunda);
    tunda = setTimeout(function () {
      ukur(); pasangDinding();
      // ukuran benda menyesuaikan layar baru, lalu jatuh lagi dari atas supaya tumpukannya rapi
      benda.forEach(function (b, i) {
        var f = lebar(b.el) / b.w;
        if (Math.abs(f - 1) > 0.02) {
          Body.scale(b, f, f); b.w *= f; b.h *= f; b.el.style.width = b.w + 'px';
          if (b.alas) Body.setInertia(b, Infinity);
        }
        if (b.position.x > W - b.w / 2 || b.position.y > H) {
          Body.setPosition(b, { x: Math.min(Math.max(W * (0.3 + Math.random() * 0.65), b.w / 2), W - b.w / 2), y: -b.h - i * 30 });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      });
    }, 200);
  });
})();
