/* Pembaca PDF ala Mac di Kelas MOTE: halaman bergulir, nomor halaman ikut, tombol & panah keyboard, zoom, thumbnail.
   Navigasi keyboard tanpa animasi (dipakai berulang); tombol & thumbnail bergulir halus. */
(function () {
  var pdf = document.querySelector('[data-pdf]');
  if (!pdf) return;
  var isi = pdf.querySelector('[data-isi]'), hal = [].slice.call(isi.querySelectorAll('.hal'));
  var ke = pdf.querySelector('[data-ke]'), thumbs = pdf.querySelector('[data-thumbs]');
  var kini = 0, zoom = 1, ZOOM = [0.7, 0.85, 1, 1.25, 1.5];

  // thumbnail: salinan halaman yang diperkecil
  hal.forEach(function (h, i) {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Halaman ' + (i + 1));
    var tb = document.createElement('span'); tb.className = 'tb'; var c = h.cloneNode(true); c.style.removeProperty('--z');
    c.querySelectorAll('a').forEach(function (a) { a.setAttribute('tabindex', '-1'); });
    tb.appendChild(c); b.appendChild(tb); b.appendChild(document.createTextNode(i + 1));
    b.addEventListener('click', function () { ke_(i, true); });
    thumbs.appendChild(b);
  });
  var tbs = [].slice.call(thumbs.children);

  function tandai(i) {
    kini = i; ke.textContent = i + 1;
    tbs.forEach(function (t, j) { t.classList.toggle('on', j === i); });
  }
  function ke_(i, halus) {
    i = Math.max(0, Math.min(hal.length - 1, i));
    isi.scrollTo({ top: hal[i].offsetTop - 28, behavior: halus && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto' });
    tandai(i);
  }
  // halaman aktif = yang paling banyak tampil di jendela
  isi.addEventListener('scroll', function () {
    var tengah = isi.scrollTop + isi.clientHeight * 0.4, best = 0;
    hal.forEach(function (h, i) { if (h.offsetTop <= tengah) best = i; });
    if (best !== kini) tandai(best);
  }, { passive: true });

  pdf.querySelector('[data-prev]').addEventListener('click', function () { ke_(kini - 1, true); });
  pdf.querySelector('[data-next]').addEventListener('click', function () { ke_(kini + 1, true); });
  pdf.querySelector('[data-thumb-btn]').addEventListener('click', function () { pdf.classList.toggle('thumb-buka'); this.classList.toggle('on'); });
  function setZoom(d) {
    var i = Math.max(0, Math.min(ZOOM.length - 1, ZOOM.indexOf(zoom) + d)); zoom = ZOOM[i];
    hal.forEach(function (h) { h.style.setProperty('--z', zoom); });
    ke_(kini, false);
  }
  pdf.querySelector('[data-zin]').addEventListener('click', function () { setZoom(1); });
  pdf.querySelector('[data-zout]').addEventListener('click', function () { setZoom(-1); });

  // panah kiri/kanan & PageUp/PageDown saat kursor atau fokus ada di dalam pembaca
  var di = false;
  pdf.addEventListener('pointerenter', function () { di = true; });
  pdf.addEventListener('pointerleave', function () { di = false; });
  document.addEventListener('keydown', function (e) {
    if (!di && !pdf.contains(document.activeElement)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); ke_(kini + 1, false); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); ke_(kini - 1, false); }
  });
  // tautan "Lihat semua kelas" di slide terakhir: tutup ke katalog
  pdf.querySelectorAll('a[href="#kelas"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); var t = document.querySelector('[data-grid]'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  });
  // lencana pojok kanan bawah menutupi rail; sembunyikan selama pembaca tampil
  new IntersectionObserver(function (en) { document.documentElement.classList.toggle('pdf-tampak', en[0].isIntersecting); }, { threshold: 0.3 }).observe(pdf);
  tandai(0);
})();
