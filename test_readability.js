const { chromium } = require('playwright');
const fs = require('fs');

async function testReadability() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const outDir = 'validation_results/readability_check';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. About section
  await page.evaluate(() => window.scrollTo(0, 1850));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/about_readable.png` });

  // 2. Testimonial Quote 1
  await page.evaluate(() => window.scrollTo(0, 5800));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/quote1_readable.png` });

  // 3. Testimonial Quote 2
  await page.evaluate(() => window.scrollTo(0, 6500));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/quote2_readable.png` });

  // 4. Testimonial Quote 3
  await page.evaluate(() => window.scrollTo(0, 7200));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/quote3_readable.png` });

  await browser.close();
  console.log('Readability screenshots captured successfully.');
}

testReadability().catch(console.error);
