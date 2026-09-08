import json, sys, pathlib
from playwright.sync_api import sync_playwright

VIEWPORTS = [(320, 800), (360, 800), (390, 844), (430, 932), (1280, 800), (1440, 900)]
JS = """
() => {
  const de = document.documentElement;
  const cw = de.clientWidth;
  // Scroll horizontal NYATA saja. section.scrollWidth ikut menghitung anak yang
  // sudah dipotong overflow-hidden (blob/ribbon), jadi memakainya = false positive.
  const overflow = de.scrollWidth > cw;
  // Diagnostik terpisah: elemen yang keluar viewport tapi terpotong. Bukan kegagalan.
  const clipped = [...document.querySelectorAll('section')].filter(s => s.scrollWidth > cw).length;
  const h1 = document.querySelector('h1');
  let h1px = 0, h1lines = 0;
  if (h1) {
    const cs = getComputedStyle(h1);
    h1px = parseFloat(cs.fontSize);
    const lh = parseFloat(cs.lineHeight) || h1px;
    h1lines = Math.round(h1.getBoundingClientRect().height / lh);
  }
  const first = document.querySelector('main section') || document.querySelector('section');
  const small = first ? [...first.querySelectorAll('a,button')].map(e => {
    const r = e.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return null;
    return (r.width < 44 || r.height < 44)
      ? `${e.tagName}:${(e.textContent||'').trim().slice(0,30)}:${Math.round(r.width)}x${Math.round(r.height)}`
      : null;
  }).filter(Boolean) : [];
  const cta = [...document.querySelectorAll('section a')].find(a => /WhatsApp/i.test(a.textContent||''));
  return { overflow, clipped, h1px, h1lines, small, ctaBottom: cta ? Math.round(cta.getBoundingClientRect().bottom) : null };
}
"""

def main(url, outdir):
    out = pathlib.Path(outdir); out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        for w, h in VIEWPORTS:
            pg = b.new_page(viewport={"width": w, "height": h}, device_scale_factor=2)
            pg.goto(url, wait_until="networkidle")
            pg.wait_for_timeout(400)
            pg.screenshot(path=str(out / f"{w}x{h}.png"), full_page=(w >= 1024))
            r = pg.evaluate(JS)
            print(f"{w}x{h}: overflow={r['overflow']} clipped_sections={r['clipped']} h1_px={r['h1px']} h1_lines={r['h1lines']} cta_bottom={r['ctaBottom']} small_targets={json.dumps(r['small'])}")
            pg.close()
        b.close()

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
