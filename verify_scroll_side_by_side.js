const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Test clone
  const pageClone = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageClone.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await pageClone.waitForTimeout(4000); // Past preloader

  // 2. Test original
  const pageKota = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageKota.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await pageKota.waitForTimeout(3000);

  const scrollSteps = [0, 200, 450, 700, 900, 1100];
  const results = [];

  if (!fs.existsSync('inspection_data/verification')) {
    fs.mkdirSync('inspection_data/verification', { recursive: true });
  }

  for (const y of scrollSteps) {
    // Scroll clone
    await pageClone.evaluate((top) => window.scrollTo(0, top), y);
    await pageClone.waitForTimeout(200);

    // Scroll kota
    await pageKota.evaluate((top) => window.scrollTo(0, top), y);
    await pageKota.waitForTimeout(200);

    const cloneData = await pageClone.evaluate(() => {
      const vid = document.getElementById('hero-video');
      const btn = document.getElementById('5czkxl');
      const playText = document.getElementById('playreel-text-play');
      const reelText = document.getElementById('playreel-text-reel');
      const vidRect = vid ? vid.getBoundingClientRect() : null;
      return {
        vidRect: vidRect ? {
          top: Math.round(vidRect.top),
          left: Math.round(vidRect.left),
          width: Math.round(vidRect.width),
          height: Math.round(vidRect.height)
        } : null,
        vidRadius: vid ? vid.style.borderRadius : null,
        btnTransform: btn ? btn.style.transform : null,
        playTransform: playText ? playText.style.transform : null,
        reelTransform: reelText ? reelText.style.transform : null
      };
    });

    const kotaData = await pageKota.evaluate(() => {
      const vid = document.getElementById('hero-video');
      const btn = document.getElementById('5czkxl');
      const p = document.getElementById('playreel');
      const playText = p ? p.querySelector('.framer-yhnnzu') : null;
      const reelText = p ? p.querySelector('.framer-of2eat') : null;
      const vidRect = vid ? vid.getBoundingClientRect() : null;
      return {
        vidRect: vidRect ? {
          top: Math.round(vidRect.top),
          left: Math.round(vidRect.left),
          width: Math.round(vidRect.width),
          height: Math.round(vidRect.height)
        } : null,
        vidRadius: vid ? vid.style.borderRadius : null,
        btnTransform: btn ? btn.style.transform : null,
        playTransform: playText ? playText.style.transform : null,
        reelTransform: reelText ? reelText.style.transform : null
      };
    });

    await pageClone.screenshot({ path: `inspection_data/verification/clone_scrollY_${y}.png` });
    await pageKota.screenshot({ path: `inspection_data/verification/kota_scrollY_${y}.png` });

    results.push({
      scrollY: y,
      clone: cloneData,
      kota: kotaData
    });
    console.log(`scrollY ${y}:`, { clone: cloneData, kota: kotaData });
  }

  fs.writeFileSync('inspection_data/verification/comparison_report.json', JSON.stringify(results, null, 2));
  console.log('Verification finished! Saved comparison_report.json');
  await browser.close();
})();
