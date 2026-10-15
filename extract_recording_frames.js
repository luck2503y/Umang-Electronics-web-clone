const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function extractVideoFrames() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const videoPath = path.resolve(__dirname, 'Screen Recording 2026-10-15 161738.mp4');
  const fileUrl = 'file:///' + videoPath.replace(/\\/g, '/');

  console.log('Loading video from:', fileUrl);

  const outDir = path.resolve(__dirname, 'inspection_data', 'user_screen_recording');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; height:100vh;">
        <video id="vid" src="${fileUrl}" controls style="max-width:100%; max-height:100%;"></video>
      </body>
    </html>
  `);

  await page.waitForTimeout(1000);

  const duration = await page.evaluate(async () => {
    const vid = document.getElementById('vid');
    if (vid.readyState < 1) {
      await new Promise(res => { vid.onloadedmetadata = res; });
    }
    return vid.duration;
  });

  console.log('Video Duration:', duration);

  // Capture snapshots at various intervals
  const step = Math.max(1, duration / 10);
  for (let t = 0; t <= duration; t += step) {
    await page.evaluate((time) => {
      const vid = document.getElementById('vid');
      vid.currentTime = time;
      return new Promise(res => {
        vid.onseeked = res;
      });
    }, t);
    await page.waitForTimeout(200);
    const snapPath = path.join(outDir, `frame_${t.toFixed(1)}s.png`);
    const vidEl = await page.locator('#vid');
    await vidEl.screenshot({ path: snapPath });
    console.log(`Saved frame at ${t.toFixed(1)}s to ${snapPath}`);
  }

  await browser.close();
}

extractVideoFrames().catch(console.error);
