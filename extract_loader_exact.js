const { chromium } = require('playwright');
const fs = require('fs');

async function extractLoaderExact() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.addInitScript(() => {
    window.__preloaderHTML = '';
    const interval = setInterval(() => {
      const el = document.querySelector('[data-framer-name*="Mask"], .framer-183zful, [data-framer-name*="Phone-1"]')?.parentElement?.parentElement;
      if (el && !window.__preloaderHTML) {
        window.__preloaderHTML = el.outerHTML;
      }
    }, 50);
  });

  await page.goto('https://madebykota.com/', { waitUntil: 'commit' });
  await page.waitForTimeout(400);

  const html = await page.evaluate(() => {
    const el = document.querySelector('.framer-183zful')?.closest('[data-framer-name]') || document.querySelector('.framer-183zful')?.parentElement;
    return el ? el.outerHTML : (window.__preloaderHTML || 'NOT FOUND');
  });

  fs.writeFileSync('inspection_data/exact_loader.html', html);
  console.log('Loader extracted, length:', html.length);

  await browser.close();
}

extractLoaderExact().catch(console.error);
