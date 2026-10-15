const { chromium } = require('playwright');
const fs = require('fs');

async function inspectAnimationsAndStyles() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Extract all CSS rules related to hero, loader, and intro
  const data = await page.evaluate(() => {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.cssText && (
            rule.cssText.includes('framer-183zful') ||
            rule.cssText.includes('Intro-') ||
            rule.cssText.includes('framer-i8icsu') ||
            rule.cssText.includes('framer-uo8kr8') ||
            rule.cssText.includes('framer-1kvacm1') ||
            rule.cssText.includes('framer-ztisoh') ||
            rule.cssText.includes('framer-302mu8') ||
            rule.cssText.includes('framer-f5mwa1') ||
            rule.cssText.includes('hero-video') ||
            rule.cssText.includes('shimmer')
          )) {
            rules.push(rule.cssText);
          }
        }
      } catch (e) {}
    }

    // Also get hero exact bounding box & styles
    const hero = document.querySelector('#hero');
    const heroComp = hero ? window.getComputedStyle(hero) : null;
    const h1 = hero ? hero.querySelector('h1, [data-framer-name="Main Header"]') : null;

    return {
      rulesCount: rules.length,
      sampleRules: rules.slice(0, 50),
      heroHeight: heroComp?.height,
      heroPadding: heroComp?.padding
    };
  });

  fs.writeFileSync('inspection_data/loader_and_hero_styles.json', JSON.stringify(data, null, 2));
  console.log('Saved styles data, count:', data.rulesCount);

  await browser.close();
}

inspectAnimationsAndStyles().catch(console.error);
