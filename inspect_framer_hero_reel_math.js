const { chromium } = require('playwright');
const fs = require('fs');

async function inspectFramerMath() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // We want to know:
  // 1. Where does the small hero video start? (x, y, width, height, borderRadius)
  // 2. Where does it end in Playreel? (x, y, width, height, borderRadius)
  // 3. How does it interpolate as scrollY changes from 0 to 1200?
  // 4. What happens to the PLAY, REEL, [00:44], ©2026, and the glass play button?
  // 5. What happens to the hero headline text (Row 1, Row 2, Row 3) as we scroll?

  const points = [];
  for (let s = 0; s <= 1400; s += 50) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    await page.waitForTimeout(80);

    const snapshot = await page.evaluate((currS) => {
      // Find the hero video element
      const heroVid = document.getElementById('hero-video');
      const heroOverlay = document.getElementById('hero-video-overlay');
      const playreelVid = document.getElementById('playreel-video');
      const playText = document.querySelector('[data-framer-name="PLAY"]') || Array.from(document.querySelectorAll('*')).find(e => e.textContent === 'PLAY');
      const reelText = document.querySelector('[data-framer-name="REEL"]') || Array.from(document.querySelectorAll('*')).find(e => e.textContent === 'REEL');
      const playBtn = document.getElementById('5czkxl') || document.querySelector('[data-framer-name="Large"]');
      const mainHeader = document.querySelector('[data-framer-name="Main Header"]');
      const header = document.querySelector('[data-framer-name="Header"]');

      function getInfo(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
          transform: el.style.transform || cs.transform,
          opacity: el.style.opacity || cs.opacity,
          borderRadius: cs.borderRadius
        };
      }

      return {
        scrollY: currS,
        heroVid: getInfo(heroVid),
        heroOverlay: getInfo(heroOverlay),
        playreelVid: getInfo(playreelVid),
        playText: getInfo(playText),
        reelText: getInfo(reelText),
        playBtn: getInfo(playBtn),
        mainHeader: getInfo(mainHeader),
        header: getInfo(header)
      };
    }, s);

    points.push(snapshot);
  }

  fs.writeFileSync('inspection_data/framer_scroll_math.json', JSON.stringify(points, null, 2));
  console.log('Saved inspection_data/framer_scroll_math.json');

  await browser.close();
}

inspectFramerMath().catch(console.error);
