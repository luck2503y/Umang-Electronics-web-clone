const { chromium } = require('playwright');
const fs = require('fs');

async function inspectFullLoader() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.addInitScript(() => {
    window.__allSnaps = [];
    let start = null;
    const loop = (now) => {
      if (!start) start = now;
      const maskEl = document.querySelector('[data-framer-name="Mask"]');
      const hero = document.querySelector('[data-framer-name*="Hero"]') || document.querySelector('section');
      const counterEl = document.querySelector('[class*="1kvacm1"]');
      const brandEl = document.querySelector('[class*="uo8kr8"]');

      let maskCS = maskEl ? window.getComputedStyle(maskEl) : null;

      window.__allSnaps.push({
        elapsed: Math.round(now - start),
        maskPresent: !!maskEl,
        maskAttr: maskEl ? maskEl.getAttribute('style') : null,
        maskCSS: maskCS ? (maskCS.mask || maskCS.webkitMask) : null,
        counter: counterEl ? counterEl.innerText.trim() : null,
        brandOpacity: brandEl ? window.getComputedStyle(brandEl).opacity : null,
        heroOpacity: hero ? window.getComputedStyle(hero).opacity : null,
        heroTransform: hero ? window.getComputedStyle(hero).transform : null
      });

      if (now - start < 6000) {
        requestAnimationFrame(loop);
      }
    };
    requestAnimationFrame(loop);
  });

  await page.goto('https://madebykota.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6500);

  const snaps = await page.evaluate(() => window.__allSnaps);
  fs.writeFileSync('inspection_data/full_timeline_snaps.json', JSON.stringify(snaps, null, 2));
  console.log('Recorded RAF snaps:', snaps ? snaps.length : 0);

  await browser.close();
}

inspectFullLoader().catch(console.error);
