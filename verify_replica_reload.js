const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verifyReplicaReload() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const outDir = path.resolve(__dirname, 'inspection_data', 'replica_reload_verification');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Navigating to http://localhost:3000/ ...');
  const start = performance.now();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  const captureTimes = [300, 1000, 1800, 2600, 3100, 3500, 3900, 4600];

  for (const targetMs of captureTimes) {
    const elapsed = performance.now() - start;
    const waitTime = Math.max(0, targetMs - elapsed);
    if (waitTime > 0) {
      await page.waitForTimeout(waitTime);
    }
    const snapPath = path.join(outDir, `replica_${targetMs}ms.png`);
    await page.screenshot({ path: snapPath });
    console.log(`Captured snapshot at ~${targetMs}ms -> ${snapPath}`);
  }

  // Also verify console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await browser.close();
}

verifyReplicaReload().catch(console.error);
