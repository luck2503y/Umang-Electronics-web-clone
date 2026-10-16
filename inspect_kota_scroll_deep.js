const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectKotaScroll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const outDir = path.resolve(__dirname, 'inspection_data', 'kota_scroll_deep');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Navigating to https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000); // Wait for preloader to finish

  // Take screenshot at scroll top 0
  await page.screenshot({ path: path.join(outDir, 'scroll_0px.png') });

  // Scroll down incrementally and inspect all animated elements and capture screenshots
  const scrollSteps = [0, 200, 400, 600, 800, 1000, 1200, 1500, 1800, 2200, 2600, 3000];
  const inspectionResults = [];

  for (const s of scrollSteps) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    await page.waitForTimeout(300);

    const data = await page.evaluate((currScroll) => {
      // Find all elements with transforms, opacity changes, or data-framer attributes
      const els = Array.from(document.querySelectorAll('[data-framer-name], section, [style*="transform"], [style*="opacity"]'));
      const active = els.map(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const name = el.getAttribute('data-framer-name') || el.className || el.tagName;
        return {
          name,
          tag: el.tagName,
          rect: { top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
          transform: style.transform,
          opacity: style.opacity,
          filter: style.filter,
          display: style.display,
          classes: typeof el.className === 'string' ? el.className : ''
        };
      }).filter(item => {
        // Filter elements that have interesting transforms or are key structural sections
        return item.rect.height > 20 && (item.transform !== 'none' || item.name.toLowerCase().includes('reel') || item.name.toLowerCase().includes('hero') || item.name.toLowerCase().includes('card'));
      });

      return {
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        activeElements: active.slice(0, 30)
      };
    }, s);

    inspectionResults.push(data);
    await page.screenshot({ path: path.join(outDir, `scroll_${s}px.png`) });
    console.log(`Captured scroll at ${s}px`);
  }

  fs.writeFileSync(path.join(outDir, 'inspection.json'), JSON.stringify(inspectionResults, null, 2));
  console.log('Saved inspection data to inspection_data/kota_scroll_deep/inspection.json');

  await browser.close();
}

inspectKotaScroll().catch(console.error);
