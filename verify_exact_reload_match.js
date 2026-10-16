const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyReload() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const outDir = path.resolve(__dirname, 'inspection_data', 'final_reload_verification');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const logs = [];
  page.on('console', msg => logs.push(msg.text()));
  page.on('pageerror', err => logs.push('PAGE_ERROR: ' + err.message));

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  console.log('Triggering page reload ...');
  const reloadPromise = page.reload({ waitUntil: 'commit' });
  await reloadPromise;

  const start = performance.now();
  const times = [200, 700, 1400, 2200, 2800, 3400, 3900, 4300, 4900];

  for (const t of times) {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, t - elapsed);
    if (wait > 0) await page.waitForTimeout(wait);
    const snapPath = path.join(outDir, `reload_${t}ms.png`);
    await page.screenshot({ path: snapPath });
    console.log(`Saved screenshot at ${t}ms -> ${snapPath}`);
  }

  console.log('Console logs during test:', logs.slice(0, 10));
  await browser.close();
}

verifyReload().catch(console.error);
