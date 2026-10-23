/* Hero MOTE Kreatif: stiker ikut kursor (paralaks), dihaluskan dengan lerp tiap frame.
   Dekoratif saja; mati di layar sentuh dan saat prefers-reduced-motion. */
(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var stk = [].slice.call(hero.querySelectorAll('.hm-stk, .hk-org')).map(function (el) { return { el: el, k: parseFloat(getComputedStyle(el).getPropertyValue('--k')) || 1, x: 0, y: 0 }; });
  var tx = 0, ty = 0, jalan = false;
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5;
    if (!jalan) { jalan = true; requestAnimationFrame(langkah); }
  });
  hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; });
  function langkah() {
    var diam = true;
    stk.forEach(function (s) {
      var gx = -tx * 40 * s.k, gy = -ty * 30 * s.k;
      s.x += (gx - s.x) * .08; s.y += (gy - s.y) * .08;
      if (Math.abs(gx - s.x) > .1 || Math.abs(gy - s.y) > .1) diam = false;
      s.el.style.transform = 'translate3d(' + s.x.toFixed(2) + 'px,' + s.y.toFixed(2) + 'px,0)';
    });
    if (diam && tx === 0 && ty === 0) { jalan = false; return; }
    requestAnimationFrame(langkah);
  }
})();
