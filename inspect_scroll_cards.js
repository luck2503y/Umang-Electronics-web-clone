const { chromium } = require('playwright');
const fs = require('fs');

async function inspectScrollCards() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const steps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1500];
  const logs = [];

  for (const s of steps) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    await page.waitForTimeout(150);

    const data = await page.evaluate((scrollPos) => {
      const mask = document.querySelector('[data-framer-name="Mask"]');
      const maskParent = mask ? mask.parentElement : null;
      const maskParentParent = maskParent ? maskParent.parentElement : null;

      const introCards = Array.from(document.querySelectorAll('[data-framer-name^="Intro-"]')).map(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          name: el.getAttribute('data-framer-name'),
          transform: style.transform,
          inlineTransform: el.style.transform,
          opacity: style.opacity,
          rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) }
        };
      });

      // Also check hero video overlay
      const heroVideo = document.getElementById('hero-video-overlay');
      const playreelVideo = document.getElementById('playreel-video');

      return {
        scrollY: window.scrollY,
        maskStyle: mask ? {
          transform: window.getComputedStyle(mask).transform,
          maskImage: window.getComputedStyle(mask).maskImage || window.getComputedStyle(mask).webkitMaskImage,
          display: window.getComputedStyle(mask).display,
          opacity: window.getComputedStyle(mask).opacity
        } : null,
        maskParentStyle: maskParent ? {
          transform: window.getComputedStyle(maskParent).transform,
          opacity: window.getComputedStyle(maskParent).opacity
        } : null,
        maskGrandParentStyle: maskParentParent ? {
          transform: window.getComputedStyle(maskParentParent).transform,
          opacity: window.getComputedStyle(maskParentParent).opacity,
          display: window.getComputedStyle(maskParentParent).display,
          top: window.getComputedStyle(maskParentParent).top
        } : null,
        introCards,
        heroVideo: heroVideo ? {
          transform: window.getComputedStyle(heroVideo).transform,
          opacity: window.getComputedStyle(heroVideo).opacity,
          rect: heroVideo.getBoundingClientRect()
        } : null,
        playreelVideo: playreelVideo ? {
          transform: window.getComputedStyle(playreelVideo).transform,
          opacity: window.getComputedStyle(playreelVideo).opacity,
          rect: playreelVideo.getBoundingClientRect()
        } : null
      };
    }, s);

    logs.push(data);
  }

  fs.writeFileSync('inspection_data/cards_on_scroll.json', JSON.stringify(logs, null, 2));
  console.log('Saved inspection_data/cards_on_scroll.json');

  await browser.close();
}

inspectScrollCards().catch(console.error);
