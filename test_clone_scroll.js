const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function inspectCloneScroll() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const outDir = path.resolve(__dirname, 'inspection_data', 'clone_scroll_deep');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5500); // Wait for preloader to finish

  const scrollSteps = [0, 200, 400, 600, 800, 1000, 1200, 1500, 1800, 2200];
  for (const s of scrollSteps) {
    await page.evaluate((top) => window.scrollTo(0, top), s);
    await page.waitForTimeout(300);
    const snapPath = path.join(outDir, `clone_scroll_${s}px.png`);
    await page.screenshot({ path: snapPath });
    console.log(`Captured clone scroll at ${s}px`);
  }

  await browser.close();
}

inspectCloneScroll().catch(console.error);
