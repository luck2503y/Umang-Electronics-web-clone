const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const section = await page.$('#templates');
  if (!section) {
    console.error('Section #templates not found!');
    await browser.close();
    return;
  }

  const box = await section.boundingBox();
  console.log('Templates bounding box:', box);

  const top = box.y;
  const height = box.height;
  const scrollDistance = height - 900;

  // Let's scroll to the 5 templates and take screenshots
  for (let i = 0; i < 5; i++) {
    const fraction = (i + 0.5) / 5;
    const targetScrollY = top + fraction * scrollDistance;
    console.log(`Scrolling to template ${i + 1} at scrollY: ${targetScrollY}`);
    
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, targetScrollY);
    await page.waitForTimeout(1000);

    const shotPath = `inspection_data/replica_template_${i + 1}.png`;
    await page.screenshot({ path: shotPath });
    console.log(`Saved screenshot ${shotPath}`);
  }

  await browser.close();
  console.log('Done testing templates replica!');
})();
