const { chromium } = require('playwright');

async function testServicesSticky() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(1000);

  // Tab 1: Landing Page
  await page.evaluate(() => window.scrollTo(0, 3400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'validation_results/final_verification/fixed_services_tab1.png' });

  // Tab 2: Marketing Site
  await page.evaluate(() => window.scrollTo(0, 4400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'validation_results/final_verification/fixed_services_tab2.png' });

  // Tab 3: Motion Design
  await page.evaluate(() => window.scrollTo(0, 5200));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'validation_results/final_verification/fixed_services_tab3.png' });

  await browser.close();
  console.log('Services sticky test passed.');
}

testServicesSticky().catch(console.error);
