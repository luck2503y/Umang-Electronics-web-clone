const { chromium } = require('playwright');

async function checkMobileOrig() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'inspection_data/live_orig_mobile.png' });
  await browser.close();
  console.log('Saved live_orig_mobile.png');
}

checkMobileOrig().catch(console.error);
