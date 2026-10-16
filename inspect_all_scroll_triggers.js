const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Find all sections
  const sections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section, [data-framer-name^=\"Section\"]')).map(s => ({
      id: s.id,
      name: s.getAttribute('data-framer-name'),
      top: s.getBoundingClientRect().top + window.scrollY,
      height: s.offsetHeight
    }));
  });
  console.log('Sections:', sections);

  // Check scroll triggers across 0 to 5000 in steps of 200
  const scrollTriggers = [];
  for (let y = 0; y <= 5000; y += 300) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
    const data = await page.evaluate((currentY) => {
      // Find elements with transform or style changes
      const animated = [];
      const all = document.querySelectorAll('[style*=\"transform\"], [style*=\"opacity\"], [style*=\"mask\"]');
      all.forEach(el => {
        const style = el.getAttribute('style') || '';
        const name = el.getAttribute('data-framer-name') || el.className;
        const text = el.innerText ? el.innerText.slice(0, 30).trim() : '';
        if (style.includes('translate') || style.includes('scale') || style.includes('mask') || style.includes('matrix')) {
          animated.push({ name, text, style: style.slice(0, 100) });
        }
      });
      return { y: currentY, count: animated.length, samples: animated.slice(0, 8) };
    }, y);
    scrollTriggers.push(data);
  }

  fs.writeFileSync('inspection_data/sections_and_triggers.json', JSON.stringify({ sections, scrollTriggers }, null, 2));
  console.log('Saved inspection_data/sections_and_triggers.json');
  await browser.close();
})();
