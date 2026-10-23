/* Kartu otak kanan/kiri: tangan ditaruh sehingga ujung pensil dan ujung telunjuk menyentuh bulatan "meet".
   Saat kursor mendekat, tangan sedikit condong mengikuti kursor (pegas, lerp per frame), lalu kembali. */
function kartuTangan() {
  var cp = document.querySelector('.cp'); if (!cp) return;
  var m = cp.querySelector('.cp-m'), t1 = cp.querySelector('.cp-t1'), t2 = cp.querySelector('.cp-t2');
  if (!m || !t1 || !t2) return;
  function atur() {
    var c = cp.getBoundingClientRect(), r = m.getBoundingClientRect();
    var mx = r.left - c.left, my = r.top - c.top, w1 = t1.offsetWidth, w2 = t2.offsetWidth;
    t1.style.setProperty('--x', (mx + 6 - w1 * .977) + 'px'); t1.style.setProperty('--y', (my + r.height * .62 - w1 * .7016 * .389) + 'px');
    t2.style.setProperty('--x', (mx + r.width - 8 - w2 * .0540) + 'px'); t2.style.setProperty('--y', (my + 6 - w2 * .7997 * .956) + 'px');
    t1.style.transformOrigin = '0% 90%'; t2.style.transformOrigin = '100% 10%';
  }
  // sentuhan: bentuk bulatan tetap; di titik ujung pensil dan ujung telunjuk muncul rona warna (oranye creative,
  // ungu performance) yang menyebar dari titik sentuh lalu memudar. Tangan ikut maju sedikit saat menyentuh.
  var NS = 'http://www.w3.org/2000/svg', bentuk = document.createElementNS(NS, 'svg'), jalur = document.createElementNS(NS, 'path');
  bentuk.setAttribute('class', 'cp-m-bentuk'); bentuk.setAttribute('aria-hidden', 'true');
  bentuk.innerHTML = '<defs><radialGradient id="rona-o"><stop offset="0" stop-color="#FE7B00"/><stop offset=".45" stop-color="#FE7B00" stop-opacity=".55"/><stop offset="1" stop-color="#FE7B00" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="rona-u"><stop offset="0" stop-color="#7558FE"/><stop offset=".45" stop-color="#7558FE" stop-opacity=".55"/><stop offset="1" stop-color="#7558FE" stop-opacity="0"/></radialGradient>' +
    '<clipPath id="rona-pil"><rect/></clipPath></defs>';
  bentuk.appendChild(jalur);
  var batas = bentuk.querySelector('#rona-pil rect'), rona = ['o', 'u'].map(function (k) {
    var c = document.createElementNS(NS, 'circle'); c.setAttribute('fill', 'url(#rona-' + k + ')'); c.setAttribute('clip-path', 'url(#rona-pil)'); bentuk.appendChild(c); return c;
  });
  m.insertBefore(bentuk, m.firstChild);
  var gerakOk = !matchMedia('(prefers-reduced-motion: reduce)').matches, tekan = 0, mulaiTekan = null, tampak = false;
  function gambar() {
    var W = m.offsetWidth, H = m.offsetHeight;
    var c1 = [6, H * .62], c2 = [W - 8, 6], dalam = 5 * tekan;
    bentuk.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    jalur.setAttribute('d', 'M' + H / 2 + ' 0H' + (W - H / 2) + 'A' + H / 2 + ' ' + H / 2 + ' 0 0 1 ' + (W - H / 2) + ' ' + H + 'H' + H / 2 + 'A' + H / 2 + ' ' + H / 2 + ' 0 0 1 ' + H / 2 + ' 0Z');
    ['x', 'y', 'width', 'height', 'rx'].forEach(function (k, i) { batas.setAttribute(k, [0, 0, W, H, H / 2][i]); });
    [c1, c2].forEach(function (c, i) { // rona melebar dan menebal selama jari menekan
      rona[i].setAttribute('cx', c[0]); rona[i].setAttribute('cy', c[1]);
      rona[i].setAttribute('r', (H * (.35 + .55 * tekan)).toFixed(2)); rona[i].setAttribute('opacity', (tekan * .95).toFixed(3));
    });
    // tangan maju sejauh lesakan: pensil ke kanan, telunjuk ke kiri-bawah
    t1.style.translate = (dalam * .9).toFixed(2) + 'px ' + (-dalam * .1).toFixed(2) + 'px';
    t2.style.translate = (-dalam * .6).toFixed(2) + 'px ' + (dalam * .7).toFixed(2) + 'px';
  }
  function napasTekan(now) { // tekan pelan 0,7 dtk, tahan 0,5 dtk, lepas 0,9 dtk, jeda; berulang selama terlihat
    if (mulaiTekan === null) mulaiTekan = now;
    var t = ((now - mulaiTekan) % 4200) / 1000, e = function (x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
    tekan = t < .7 ? e(t / .7) : t < 1.2 ? 1 : t < 2.1 ? 1 - e((t - 1.2) / .9) : 0;
    gambar();
    if (tampak) requestAnimationFrame(napasTekan);
  }
  new IntersectionObserver(function (en) {
    var dulu = tampak; tampak = en[0].isIntersecting && gerakOk;
    if (tampak && !dulu) { mulaiTekan = null; requestAnimationFrame(napasTekan); }
  }).observe(cp);
  new ResizeObserver(gambar).observe(m); gambar();

  addEventListener('resize', atur); addEventListener('load', atur);
  if (document.fonts) document.fonts.ready.then(atur);
  new ResizeObserver(atur).observe(cp); atur();

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  // kartu juga ikut condong; tangan menumpang gerak kartunya supaya tetap "menempel"
  var k = cp.querySelectorAll('.cp-k'), K = [{ el: k[0] }, { el: k[1] }];
  K.forEach(function (s) { s.x = s.y = s.r = s.tx = s.ty = s.tr = 0; s.kuat = 10; s.putar = 1.6; });
  var S = [{ el: t1, kartu: K[0] }, { el: t2, kartu: K[1] }];
  S.forEach(function (s) { s.x = s.y = s.r = s.tx = s.ty = s.tr = 0; s.kuat = 18; s.putar = 5; });
  var semua = K.concat(S), jalan = false;
  function langkah() {
    jalan = false; var gerak = false;
    semua.forEach(function (s) {
      s.x += (s.tx - s.x) * .12; s.y += (s.ty - s.y) * .12; s.r += (s.tr - s.r) * .12;
      if (Math.abs(s.tx - s.x) > .05 || Math.abs(s.ty - s.y) > .05 || Math.abs(s.tr - s.r) > .02) gerak = true;
      var x = s.x + (s.kartu ? s.kartu.x : 0), y = s.y + (s.kartu ? s.kartu.y : 0);
      s.el.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0) rotate(' + s.r.toFixed(2) + 'deg)';
    });
    if (gerak) mulai();
  }
  function mulai() { if (!jalan) { jalan = true; requestAnimationFrame(langkah); } }
  var area = cp.parentElement;
  area.addEventListener('pointermove', function (e) {
    // kursor di sekitar "meet": tangan diam di tempat supaya ujung jari tidak menutupi huruf
    var mb = m.getBoundingClientRect(), dekatMeet = e.clientX > mb.left - 60 && e.clientX < mb.right + 60 && e.clientY > mb.top - 60 && e.clientY < mb.bottom + 60;
    semua.forEach(function (s, i) {
      if (dekatMeet) { s.tx = s.ty = s.tr = 0; return; }
      var b = s.el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy), jang = Math.max(b.width, 260) * 1.3;
      var f = Math.max(0, 1 - d / jang);                       // makin dekat makin kuat
      s.tx = dx / (d || 1) * s.kuat * f; s.ty = dy / (d || 1) * s.kuat * .8 * f;
      s.tr = (i % 2 ? -1 : 1) * (dx / (d || 1)) * s.putar * f; // condong ke arah kursor
    });
    mulai();
  });
  area.addEventListener('pointerleave', function () { semua.forEach(function (s) { s.tx = s.ty = s.tr = 0; }); mulai(); });
}
// skrip dimuat sebelum bagian kartu ada di halaman, jadi tunggu dokumen selesai diurai
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kartuTangan); else kartuTangan();
