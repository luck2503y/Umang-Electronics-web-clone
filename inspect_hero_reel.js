const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectHeroAndReel() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const analysis = await page.evaluate(() => {
    // Look for all elements between hero and about
    const sections = Array.from(document.querySelectorAll('section, [data-framer-name]'));
    const names = sections.map(s => ({
      name: s.getAttribute('data-framer-name'),
      tag: s.tagName,
      className: s.className,
      id: s.id,
      rect: s.getBoundingClientRect()
    }));

    // Find the container that holds PLAY REEL
    const playReelText = Array.from(document.querySelectorAll('*')).find(el => el.textContent && el.textContent.includes('PLAY') && el.textContent.includes('REEL') && el.children.length > 0);
    
    let playReelContainerInfo = null;
    if (playReelText) {
      let p = playReelText;
      const parents = [];
      while (p && p !== document.body) {
        parents.push({
          name: p.getAttribute('data-framer-name'),
          tag: p.tagName,
          className: p.className,
          style: p.getAttribute('style'),
          rect: p.getBoundingClientRect()
        });
        p = p.parentElement;
      }
      playReelContainerInfo = parents;
    }

    return {
      names: names.slice(0, 40),
      playReelContainerInfo
    };
  });

  fs.writeFileSync('inspection_data/hero_reel_analysis.json', JSON.stringify(analysis, null, 2));
  console.log('Saved hero_reel_analysis.json');

  await browser.close();
}

inspectHeroAndReel().catch(console.error);
