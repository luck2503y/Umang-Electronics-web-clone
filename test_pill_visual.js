const { chromium } = require('playwright');

async function testPillVisual() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);

  // Take screenshot of just the pill
  const pill = await page.locator('.hero-preview-pill');
  await pill.screenshot({ path: 'inspection_data/pill_direct_snap.png' });
  console.log('Saved pill_direct_snap.png');

  await browser.close();
}

testPillVisual().catch(console.error);
