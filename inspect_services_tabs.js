const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });

  // Find Marketing Site button in Services
  const mktgBtn = page.locator('text=Marketing Site').first();
  console.log('Marketing Site exists:', await mktgBtn.count());
  if (await mktgBtn.count() > 0) {
    await mktgBtn.click();
    await page.waitForTimeout(1000);
    // Find text in service section
    const secText = await page.$eval('[data-framer-name="Section - Services"]', el => el.innerText);
    console.log('--- AFTER CLICK MARKETING SITE ---');
    console.log(secText);
  }

  const motionBtn = page.locator('text=Motion Design').first();
  if (await motionBtn.count() > 0) {
    await motionBtn.click();
    await page.waitForTimeout(1000);
    const secText = await page.$eval('[data-framer-name="Section - Services"]', el => el.innerText);
    console.log('--- AFTER CLICK MOTION DESIGN ---');
    console.log(secText);
  }

  await browser.close();
})();
