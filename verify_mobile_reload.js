const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyMobileReload() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await context.newPage();

  const outDir = path.resolve(__dirname, 'inspection_data', 'replica_reload_verification');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const start = performance.now();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  // Capture at 3000ms (cards stacked on mobile)
  const elapsed = performance.now() - start;
  await page.waitForTimeout(Math.max(0, 3000 - elapsed));
  await page.screenshot({ path: path.join(outDir, 'mobile_3000ms.png') });
  console.log('Captured mobile_3000ms.png');

  // Capture at 4400ms (curtain finished)
  await page.waitForTimeout(1400);
  await page.screenshot({ path: path.join(outDir, 'mobile_4400ms.png') });
  console.log('Captured mobile_4400ms.png');

  await browser.close();
}

verifyMobileReload().catch(console.error);
