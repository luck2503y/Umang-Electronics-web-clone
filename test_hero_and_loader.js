const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testHeroAndLoader() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const outDir = path.resolve(__dirname, 'inspection_data', 'test_results_final');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  // 1. Capture loader at 500ms
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '01_loader_500ms.png') });
  console.log('Captured 01_loader_500ms.png');

  // 2. Capture loader at 1200ms
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, '02_loader_1200ms.png') });
  console.log('Captured 02_loader_1200ms.png');

  // 3. Wait for preloader to finish (~2.5s total) and capture Hero loaded
  await page.waitForTimeout(1600);
  await page.screenshot({ path: path.join(outDir, '03_hero_fully_loaded.png') });
  console.log('Captured 03_hero_fully_loaded.png');

  // 4. Capture after pill transitions to next product
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(outDir, '04_hero_pill_cycle.png') });
  console.log('Captured 04_hero_pill_cycle.png');

  // 5. Test scroll behavior
  await page.evaluate(() => window.scrollTo(0, 350));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '05_hero_scrolled_350px.png') });
  console.log('Captured 05_hero_scrolled_350px.png');

  // 6. Test Mobile view
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2800);
  await mobilePage.screenshot({ path: path.join(outDir, '06_hero_mobile_view.png') });
  console.log('Captured 06_hero_mobile_view.png');

  console.log('Console Errors found:', consoleErrors);

  await browser.close();
}

testHeroAndLoader().catch(console.error);
