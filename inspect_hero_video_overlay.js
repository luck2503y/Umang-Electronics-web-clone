const { chromium } = require('playwright');
const fs = require('fs');

async function dumpHeroVideo() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const data = await page.evaluate(() => {
    const heroOverlay = document.getElementById('hero-video-overlay');
    const playreel = document.getElementById('playreel');
    const hero = document.getElementById('hero');

    return {
      heroOverlay: heroOverlay ? {
        outerHTML: heroOverlay.outerHTML,
        style: heroOverlay.getAttribute('style'),
        computed: {
          position: window.getComputedStyle(heroOverlay).position,
          transform: window.getComputedStyle(heroOverlay).transform,
          width: window.getComputedStyle(heroOverlay).width,
          height: window.getComputedStyle(heroOverlay).height
        }
      } : null,
      hero: hero ? {
        outerHTML: hero.outerHTML.slice(0, 3000),
      } : null,
      playreel: playreel ? {
        outerHTML: playreel.outerHTML.slice(0, 3000),
      } : null
    };
  });

  fs.writeFileSync('inspection_data/hero_overlay_dump.json', JSON.stringify(data, null, 2));
  console.log('Saved hero_overlay_dump.json');

  await browser.close();
}

dumpHeroVideo().catch(console.error);
