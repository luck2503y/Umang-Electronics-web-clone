const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  await page.screenshot({ path: 'inspection_data/new_replica_footer.png' });
  console.log('Saved inspection_data/new_replica_footer.png');

  // Test clicking the scroll to top button
  const topBtn = await page.$('footer button[aria-label="Scroll to top"]');
  if (topBtn) {
    console.log('Clicking scroll to top button...');
    await topBtn.click();
    await page.waitForTimeout(1500);
    const scrollY = await page.evaluate(() => window.scrollY);
    console.log('ScrollY after clicking scroll-to-top:', scrollY);
  }

  await browser.close();
  console.log('Test completed successfully!');
})();
