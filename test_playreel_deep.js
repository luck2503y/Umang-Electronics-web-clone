const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  for (const y of [0, 300, 600, 900, 1200, 1500, 1800]) {
    await page.evaluate(top => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
    const data = await page.evaluate(() => {
      const p = document.getElementById('playreel');
      if (!p) return null;
      const playText = p.querySelector('p');
      const btn = document.getElementById('5czkxl');
      return {
        playreelTop: p.getBoundingClientRect().top,
        textParentTransform: playText ? playText.parentElement.style.transform : null,
        btnTransform: btn ? btn.style.transform : null,
        btnOpacity: btn ? btn.style.opacity : null
      };
    });
    console.log(`ScrollY ${y}:`, data);
  }
  await browser.close();
})();
