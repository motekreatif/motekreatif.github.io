/* =========================================================
   MOTE Website - script.js
   - Mobile menu toggle
   - Header elevation on scroll
   - Reveal on scroll
   - Contact form demo submit
   ========================================================= */

(function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const header = document.querySelector("[data-elevate]");
  const yearEl = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  function setNav(open) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  }
  
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = !navMenu.classList.contains("is-open");
      setNav(open);
    });

    // Close on link click
    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setNav(false));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInside = navMenu.contains(target) || navToggle.contains(target);
      if (!clickedInside) setNav(false);
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNav(false);
    });
  }

  // Header elevation
  function onScroll() {
    if (!header) return;
    header.setAttribute("data-elevated", String(window.scrollY > 8));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => io.observe(el));

  /* ================================
   Infinite marquee (seamless loop)
   ================================ */
(function () {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;

  const logos = Array.from(track.children);

  // Duplikasi semua logo
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });
})();

  /* ================================
   Partner slider
   ================================ */
  (function () {
    const slider = document.querySelector("[data-partner-slider]");
    const track = slider?.querySelector("[data-partner-track]");
    const prev = slider?.querySelector("[data-partner-prev]");
    const next = slider?.querySelector("[data-partner-next]");
    if (!slider || !track) return;

    const slides = Array.from(track.children);
    if (!slides.length) return;

    // Duplicate slides once so the loop stays full while recycling
    slides.forEach((slide) => {
      track.appendChild(slide.cloneNode(true));
    });

    const speed = 60; // px per second
    let gap = 0;
    let offset = 0;
    let lastTs = null;

    const getGap = () => {
      const style = window.getComputedStyle(track);
      return parseFloat(style.columnGap || style.gap || "0") || 0;
    };

    const measure = () => {
      gap = getGap();
      offset = 0;
      track.style.transform = "translateX(0)";
    };

    const loop = (ts) => {
      if (lastTs === null) lastTs = ts;
      const delta = (ts - lastTs) / 1000;
      lastTs = ts;

      offset += speed * delta;

      let first = track.firstElementChild;
      while (first) {
        const step = first.getBoundingClientRect().width + gap;
        if (offset < step) break;
        offset -= step;
        track.appendChild(first);
        first = track.firstElementChild;
      }

      track.style.transform = `translateX(-${offset}px)`;
      window.requestAnimationFrame(loop);
    };

    const shift = (dir) => {
      measure();
      if (dir > 0) {
        const first = track.firstElementChild;
        if (first) track.appendChild(first);
      } else {
        const last = track.lastElementChild;
        if (last) track.insertBefore(last, track.firstElementChild);
      }
    };

    next?.addEventListener("click", () => shift(1));
    prev?.addEventListener("click", () => shift(-1));
    window.addEventListener("resize", measure);

    measure();
    window.requestAnimationFrame(loop);
  })();


}
)();

/* ===================================
   FORM → WHATSAPP (OPEN FIRST) + SHEET (FIRE & FORGET)
   =================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const payload = {
      name: (formData.get("name") || "").toString().trim(),
      contact: (formData.get("contact") || "").toString().trim(),
      need: (formData.get("need") || "").toString().trim(),
      message: (formData.get("message") || "").toString().trim(),
    };

    // (Opsional) UX
    const hint = document.getElementById("formHint");
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    // 1) SIAPKAN URL WHATSAPP DULU
    const phoneNumber = "6289662158784";

    const whatsappText =
    `Halo MOTE!
    Saya *${payload.name}*
    Kontak: ${payload.contact}

    Kebutuhan:
    ${payload.need}

    Pesan:
    ${payload.message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;

    // 2) BUKA WHATSAPP DULU (BIAR TIDAK KENA POPUP BLOCKER & TIDAK TERGANTUNG FETCH)
    const w = window.open(whatsappURL, "_blank", "noopener,noreferrer");

    // Fallback kalau popup diblok / device memaksa same-tab
    if (!w) window.location.href = whatsappURL;

    // 3) KIRIM KE GOOGLE SHEET “FIRE & FORGET” (JANGAN AWAIT)
    //    Catatan: no-cors = kita gak baca response, tapi request tetap terkirim.
    const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbxgGjYjQxVDmXGCLwlsSckL-AOPpYBbP3BNQrn5ztIKtlstEMr3e93eDFoXNkNOnywM/exec";

    fetch(SHEET_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(payload),
      keepalive: true,
    }).catch(() => {
      // sengaja di-silent: jangan ganggu flow WhatsApp
    });

    // 4) RESET + UI
    contactForm.reset();
    if (hint) hint.textContent = "Mengalihkan ke WhatsApp…";
    if (btn) btn.disabled = false;
  });
}
