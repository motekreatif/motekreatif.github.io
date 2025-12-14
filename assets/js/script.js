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


}
)();


/* ===================================
   FORM → GOOGLE SHEET → WHATSAPP (FINAL)
   =================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const payload = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      need: formData.get("need"),
      message: formData.get("message")
    };

    // 1. Kirim ke Google Sheet (FORM ENCODED)
    await fetch("https://script.google.com/macros/s/AKfycbxgGjYjQxVDmXGCLwlsSckL-AOPpYBbP3BNQrn5ztIKtlstEMr3e93eDFoXNkNOnywM/exec", {
      method: "POST",
      body: new URLSearchParams(payload)
    });

    // 2. Format pesan WhatsApp
    const whatsappText = `
Halo MOTE!
Saya *${payload.name}*
Kontak: ${payload.contact}
Kebutuhan:
${payload.need}

Pesan:
${payload.message}
`;

    const phoneNumber = "6289662158784";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;

    // 3. Reset form (SETELAH KIRIM)
    contactForm.reset();

    // 4. Redirect ke WhatsApp
    window.open(whatsappURL, "_blank");
  });
}
