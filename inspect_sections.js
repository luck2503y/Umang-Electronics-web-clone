const { chromium } = require('playwright');
const fs = require('fs');

async function inspectSections() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // Get all direct children of main or root
  const pageStructure = await page.evaluate(() => {
    function getSummary(el, depth = 0) {
      if (depth > 4) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const name = el.getAttribute('data-framer-name') || el.id || el.tagName;
      
      const children = Array.from(el.children).map(c => getSummary(c, depth + 1)).filter(Boolean);
      return {
        name,
        tag: el.tagName,
        classes: typeof el.className === 'string' ? el.className.split(' ').filter(c => !c.startsWith('framer-')).join(' ') : '',
        id: el.id,
        height: rect.height,
        top: rect.top + window.scrollY,
        position: style.position,
        hasTransform: style.transform !== 'none',
        childCount: el.children.length,
        children: children.length < 15 ? children : children.slice(0, 15)
      };
    }

    // Find main container
    const main = document.querySelector('main') || document.body;
    return Array.from(main.children).map(c => getSummary(c, 0)).filter(Boolean);
  });

  fs.writeFileSync('inspection_data/kota_sections.json', JSON.stringify(pageStructure, null, 2));
  console.log('Saved inspection_data/kota_sections.json');

  await browser.close();
}

inspectSections().catch(console.error);
