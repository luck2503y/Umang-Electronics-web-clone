const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function analyzeVisualDiff() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  // 1. Live page
  const pageOrig = await context.newPage();
  await pageOrig.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await pageOrig.waitForTimeout(3000);
  
  // Capture detailed element bounding boxes and screenshots of each section on the original
  const origHeroBox = await pageOrig.locator('[data-framer-name="Section - Hero"]').boundingBox();
  console.log('Original Hero Box:', origHeroBox);
  await pageOrig.screenshot({ path: 'inspection_data/live_orig_hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Get computed styles of original elements
  const origData = await pageOrig.evaluate(() => {
    const hero = document.querySelector('[data-framer-name="Section - Hero"]');
    const header = document.querySelector('header, [data-framer-name="Header"], .framer-jhnoku-container');
    const nav = document.querySelector('[data-framer-name*="Nav"]');
    
    // Get all children texts and classes in hero
    const allHeroEls = hero ? Array.from(hero.querySelectorAll('*')).map(el => ({
      tag: el.tagName,
      classes: el.className,
      name: el.getAttribute('data-framer-name'),
      text: el.innerText ? el.innerText.trim() : '',
      box: el.getBoundingClientRect(),
      style: {
        background: window.getComputedStyle(el).background,
        color: window.getComputedStyle(el).color,
        fontSize: window.getComputedStyle(el).fontSize,
        fontFamily: window.getComputedStyle(el).fontFamily,
        display: window.getComputedStyle(el).display,
        position: window.getComputedStyle(el).position
      }
    })).filter(x => x.text && x.text.length > 0 && x.box.width > 0) : [];

    return {
      allHeroEls: allHeroEls.slice(0, 30)
    };
  });

  fs.writeFileSync('inspection_data/orig_hero_elements.json', JSON.stringify(origData, null, 2));

  // 2. Replica page
  const pageReplica = await context.newPage();
  await pageReplica.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await pageReplica.waitForTimeout(1000);
  await pageReplica.screenshot({ path: 'inspection_data/replica_hero_check.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });

  console.log('Saved live_orig_hero.png and replica_hero_check.png');
  await browser.close();
}

analyzeVisualDiff().catch(console.error);
