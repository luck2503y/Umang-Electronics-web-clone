const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const videoPath = path.resolve(__dirname, 'Screen Recording 2026-10-15 161738.mp4');
  const fileUrl = 'file:///' + videoPath.replace(/\\/g, '/');
  const outDir = path.resolve(__dirname, 'inspection_data', 'reload_detailed_frames');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <video id="vid" src="${fileUrl}" style="width:100vw; height:100vh; object-fit:contain;"></video>
      </body>
    </html>
  `);
  await page.waitForTimeout(1000);

  // Extract frames every 200ms from 4.0s to 11.0s
  for (let t = 4.0; t <= 11.0; t += 0.25) {
    await page.evaluate((time) => {
      const vid = document.getElementById('vid');
      vid.currentTime = time;
      return new Promise(r => { vid.onseeked = r; });
    }, t);
    await page.waitForTimeout(80);
    const snapPath = path.join(outDir, `frame_${t.toFixed(2)}s.png`);
    await page.locator('#vid').screenshot({ path: snapPath });
    console.log(`Saved frame at ${t.toFixed(2)}s`);
  }
  console.log('Done extracting detailed frames');
  await browser.close();
}
run().catch(console.error);
