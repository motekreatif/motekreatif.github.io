/* =========================================================
   BLOG ONLY JS
   - TOC collapsible on mobile
   - Smooth scroll with sticky header offset
   - Active section highlight
   - Wrap tables for safe horizontal scroll
   ========================================================= */

(function () {
  const isBlog = document.body.classList.contains("page-blog");
  if (!isBlog) return;

  const header = document.querySelector(".header");
  const headerOffset = () => (header ? header.getBoundingClientRect().height : 0);

  // 1) Wrap tables if not wrapped
  document.querySelectorAll(".articleTable").forEach((table) => {
    const parent = table.parentElement;
    if (!parent) return;

    if (!parent.classList.contains("tableWrap")) {
      const wrap = document.createElement("div");
      wrap.className = "tableWrap";
      parent.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
  });

  // 2) Smooth scroll with offset (TOC + any anchor link inside blog)
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const top =
      window.scrollY + el.getBoundingClientRect().top - headerOffset() - 12;

    window.scrollTo({ top, behavior: "smooth" });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    const id = href.replace("#", "").trim();
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    scrollToId(id);

    // close TOC on mobile after click
    const tocCard = document.querySelector(".articleAside__card.is-collapsible");
    if (tocCard && tocCard.classList.contains("is-open")) {
      tocCard.classList.remove("is-open");
    }
  });

  // 3) Active TOC highlight (IntersectionObserver)
  const tocLinks = Array.from(document.querySelectorAll(".articleToc a[href^='#']"));
  const sections = tocLinks
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        // ambil entry paling “visible”
        const visible = entries
          .filter((x) => x.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.id;
        tocLinks.forEach((a) => {
          const active = a.getAttribute("href") === `#${id}`;
          a.classList.toggle("is-active", active);
        });
      },
      {
        root: null,
        // offset supaya highlight pindah ketika heading lewat bawah header sticky
        rootMargin: `-${headerOffset() + 20}px 0px -60% 0px`,
        threshold: [0.08, 0.2, 0.4],
      }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // 4) Collapsible TOC on mobile (tanpa ubah HTML manual)
  function setupCollapsibleTOC() {
    const asideCard = document.querySelector(".articleAside__card");
    const tocList = document.querySelector(".articleToc");
    if (!asideCard || !tocList) return;

    // jangan double-init
    if (asideCard.dataset.tocInit === "true") return;
    asideCard.dataset.tocInit = "true";

    // bungkus isi TOC
    asideCard.classList.add("is-collapsible");

    const existingTitle = asideCard.querySelector("strong");
    const titleText = existingTitle ? existingTitle.textContent.trim() : "Daftar Isi";
    if (existingTitle) existingTitle.remove();

    const tocBody = document.createElement("div");
    tocBody.className = "tocBody";

    // pindahkan TOC list ke tocBody
    tocBody.appendChild(tocList);

    // button toggle
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tocToggle";
    btn.innerHTML = `
      <span>${titleText}</span>
      <span class="tocToggle__hint">Tap</span>
      <span class="tocChevron" aria-hidden="true"></span>
    `;

    asideCard.prepend(btn);
    asideCard.appendChild(tocBody);

    const mq = window.matchMedia("(max-width: 980px)");

    function applyMode() {
      if (mq.matches) {
        // default closed on mobile
        asideCard.classList.remove("is-open");
      } else {
        // open on desktop
        asideCard.classList.add("is-open");
      }
    }

    btn.addEventListener("click", () => {
      asideCard.classList.toggle("is-open");
    });

    applyMode();
    mq.addEventListener("change", applyMode);
  }

  setupCollapsibleTOC();
})();
