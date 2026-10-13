const { chromium } = require('playwright');
const fs = require('fs');

async function inspectScrollTriggers() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Loading live site https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Measure sections top, height, and sticky containers
  const sectionsLayout = await page.evaluate(() => {
    const list = [];
    const sectionEls = document.querySelectorAll('[data-framer-name*="Section -"]');
    for (const el of sectionEls) {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const stickyEl = el.querySelector('[data-framer-name="Sticky"], [style*="sticky"]');
      const stickyStyle = stickyEl ? window.getComputedStyle(stickyEl) : null;
      list.push({
        name: el.getAttribute('data-framer-name'),
        id: el.id,
        offsetTop: el.offsetTop,
        offsetHeight: el.offsetHeight,
        heightStyle: style.height,
        hasSticky: !!stickyEl,
        stickyHeight: stickyStyle ? stickyStyle.height : null,
        stickyPosition: stickyStyle ? stickyStyle.position : null,
        stickyTop: stickyStyle ? stickyStyle.top : null
      });
    }
    return list;
  });

  console.log('Sections Layout & Heights:', JSON.stringify(sectionsLayout, null, 2));
  fs.writeFileSync('inspection_data/sections_scroll_layout.json', JSON.stringify(sectionsLayout, null, 2));

  // Now sample scroll positions inside Services (e.g. from service.offsetTop to service.offsetTop + service.offsetHeight)
  const servSection = sectionsLayout.find(s => s.id === 'service');
  if (servSection) {
    const startY = servSection.offsetTop;
    const h = servSection.offsetHeight;
    console.log(`Sampling Services at ${startY} to ${startY + h} ...`);
    const samples = [startY, startY + h * 0.25, startY + h * 0.5, startY + h * 0.75, startY + h * 0.95];
    for (const y of samples) {
      await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(500);
      const activeState = await page.evaluate(() => {
        const activeName = document.querySelector('[data-framer-name="Section - Services"] [data-framer-name*="Active"], [data-framer-name="Section - Services"] [class*="v-"]')?.getAttribute('data-framer-name');
        return activeName;
      });
      console.log(`Scroll ${Math.round(y)}px -> Active:`, activeState);
    }
  }

  // Now sample scroll positions inside Templates
  const tempSection = sectionsLayout.find(s => s.id === 'templates');
  if (tempSection) {
    const startY = tempSection.offsetTop;
    const h = tempSection.offsetHeight;
    console.log(`Sampling Templates at ${startY} to ${startY + h} ...`);
    const samples = [startY, startY + h * 0.2, startY + h * 0.4, startY + h * 0.6, startY + h * 0.8, startY + h * 0.95];
    for (const y of samples) {
      await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(500);
      const activeState = await page.evaluate(() => {
        const text = document.querySelector('[data-framer-name="Section - Templates"] h3, [data-framer-name="Section - Templates"] [data-framer-name="Name"]')?.innerText;
        return text;
      });
      console.log(`Scroll ${Math.round(y)}px -> Template active:`, activeState);
    }
  }

  await browser.close();
}

inspectScrollTriggers().catch(console.error);
