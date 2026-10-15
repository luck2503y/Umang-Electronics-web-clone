const { chromium } = require('playwright');
const fs = require('fs');

async function inspectCurrentClone() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take screenshot of replica hero at load
  await page.screenshot({ path: 'inspection_data/current_replica_hero_load.png' });

  // Scroll down a bit and take screenshot
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'inspection_data/current_replica_hero_scroll300.png' });

  console.log('Console Errors:', consoleErrors);

  await browser.close();
}

inspectCurrentClone().catch(console.error);
