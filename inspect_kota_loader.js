const { chromium } = require('playwright');
const fs = require('fs');

async function inspectKotaLoader() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Record everything about the loader on madebykota.com
  await page.addInitScript(() => {
    window.__snapshots = [];
    const record = () => {
      const loader = document.querySelector('[data-framer-name="Mask"]');
      if (loader) {
        const cards = Array.from(loader.querySelectorAll('[data-framer-name^="Intro-"]')).map(el => {
          const cs = window.getComputedStyle(el);
          return {
            name: el.getAttribute('data-framer-name'),
            transform: cs.transform,
            opacity: cs.opacity,
            width: cs.width,
            height: cs.height,
            zIndex: cs.zIndex,
            borderRadius: cs.borderRadius,
            boxShadow: cs.boxShadow
          };
        });
        const counter = loader.querySelector('[class*="1kvacm1"]')?.innerText?.trim();
        const brand = loader.querySelector('[class*="uo8kr8"]')?.innerText?.trim();
        const loaderCS = window.getComputedStyle(loader);
        window.__snapshots.push({
          time: performance.now(),
          counter,
          brand,
          loaderOpacity: loaderCS.opacity,
          loaderTransform: loaderCS.transform,
          mask: loaderCS.mask || loaderCS.webkitMask,
          cards
        });
      }
    };
    const interval = setInterval(record, 40);
    setTimeout(() => clearInterval(interval), 5000);
  });

  await page.goto('https://madebykota.com/', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => window.__snapshots);
  fs.writeFileSync('inspection_data/kota_loader_snapshots.json', JSON.stringify(data, null, 2));
  console.log('Recorded snapshots:', data?.length);

  // Also get the CSS rules for framer-ciqOo or Intro cards
  const css = await page.evaluate(() => {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const r of sheet.cssRules) {
          if (r.cssText && (r.cssText.includes('Intro-') || r.cssText.includes('183zful') || r.cssText.includes('framer-i8icsu') || r.cssText.includes('framer-ciqOo'))) {
            rules.push(r.cssText);
          }
        }
      } catch (e) {}
    }
    return rules;
  });
  fs.writeFileSync('inspection_data/kota_loader_rules.json', JSON.stringify(css, null, 2));
  console.log('CSS rules found:', css.length);

  await browser.close();
}

inspectKotaLoader().catch(console.error);
