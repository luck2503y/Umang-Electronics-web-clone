const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Section - Services"]');
    if (!el) return null;
    const media = Array.from(el.querySelectorAll('video, canvas, iframe, svg, [style*="background"]')).map(m => ({
      tag: m.tagName,
      style: m.getAttribute('style') || '',
      classes: m.className
    }));
    return {
      childrenCount: el.children.length,
      media
    };
  });
  console.log('Services visual elements:', JSON.stringify(info, null, 2));
  await browser.close();
})();
