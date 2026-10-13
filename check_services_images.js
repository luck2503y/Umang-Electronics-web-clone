const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  const imgs = await page.$$eval('[data-framer-name="Section - Services"] img', els => els.map(e => e.src));
  console.log('Services images:', imgs);
  await browser.close();
})();
