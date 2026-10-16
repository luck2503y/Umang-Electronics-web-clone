const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testCloneReload() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const outDir = path.resolve(__dirname, 'inspection_data', 'clone_reload_debug');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4500); // Wait for initial preloader to finish

  console.log('Now reloading page to test RELOAD ANIMATION...');
  // Add init script to record high precision timeline and take screenshots
  await page.evaluate(() => {
    window.__reloadStart = performance.now();
  });

  const reloadPromise = page.reload({ waitUntil: 'commit' });
  await reloadPromise;

  const times = [200, 600, 1200, 1800, 2400, 2800, 3200, 3600, 4000, 4400];
  const start = performance.now();

  for (const t of times) {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, t - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    await page.screenshot({ path: path.join(outDir, `reload_${t}ms.png`) });
    console.log(`Captured clone reload at ${t}ms`);
  }

  await browser.close();
}

testCloneReload().catch(console.error);
