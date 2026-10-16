const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const heroVid = document.querySelector('[data-framer-name="onDesktop"]');
    const playreel = document.querySelector('[data-framer-name="Section - Playreel"]');
    const hero = document.querySelector('[data-framer-name="Section - Hero"]');
    return {
      heroVidHTML: heroVid ? heroVid.outerHTML : 'none',
      heroVidComputed: heroVid ? window.getComputedStyle(heroVid).cssText : 'none',
      playreelHTML: playreel ? playreel.outerHTML.slice(0, 1500) : 'none',
      heroHTML: hero ? hero.outerHTML.slice(0, 1500) : 'none'
    };
  });

  fs.writeFileSync('inspection_data/dom_structure.json', JSON.stringify(data, null, 2));
  console.log('Saved inspection_data/dom_structure.json');
  await browser.close();
})();
