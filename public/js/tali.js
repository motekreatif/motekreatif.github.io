/* Diagram siklus enam pekerjaan (halaman Layanan MOTE Kreatif).
   Masuk layar: tali tergambar, kartu muncul berurutan. Manik kuning jalan pelan searah jarum jam;
   kalau kursor bergerak di atas diagram, manik pindah ke sudut kursor dan kartu terdekat terangkat. */
(function () {
  var el = document.querySelector('[data-tali]'); if (!el) return;
  var c = el.dataset.c.split(',').map(Number), CX = c[0], CY = c[1], R = c[2];
  var svg = el.querySelector('svg'), manik = el.querySelector('.tl-manik'), urat = el.querySelector('.tl-urat');
  var st = [].slice.call(el.querySelectorAll('.tl-st[data-sudut]'));
  var diam = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sudut = 200, target = null, tampak = false, jalan = 0;
  function taruh(a) {
    var r = a * Math.PI / 180;
    manik.setAttribute('cx', (CX + R * Math.cos(r)).toFixed(1)); manik.setAttribute('cy', (CY + R * Math.sin(r)).toFixed(1));
    urat.style.strokeDashoffset = (-a * 4.3).toFixed(1);   // tekstur tali ikut berputar
    var dekat = null, min = 999;
    st.forEach(function (s) { var d = Math.abs(((+s.dataset.sudut - a) % 360 + 540) % 360 - 180); if (d < min) { min = d; dekat = s; } });
    st.forEach(function (s) { s.classList.toggle('dekat', s === dekat && min < 30); });
  }
  function langkah() {
    if (!tampak) { jalan = 0; return; }
    if (target === null) sudut += .09;                     // pelan: satu putaran ±1 menit
    else { var d = ((target - sudut) % 360 + 540) % 360 - 180; sudut += d * .12; }
    sudut = (sudut + 360) % 360; taruh(sudut); jalan = requestAnimationFrame(langkah);
  }
  new IntersectionObserver(function (en) {
    tampak = en[0].isIntersecting;
    if (tampak) { el.classList.add('tl-jadi'); if (!diam && !jalan) jalan = requestAnimationFrame(langkah); }
  }, { threshold: .25 }).observe(el);
  taruh(sudut);
  if (diam || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  el.addEventListener('pointermove', function (e) {
    var b = svg.getBoundingClientRect(), k = b.width / 1000;
    target = Math.atan2((e.clientY - b.top) / k - CY, (e.clientX - b.left) / k - CX) * 180 / Math.PI;
  });
  el.addEventListener('pointerleave', function () { target = null; });
})();
