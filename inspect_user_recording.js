const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function inspectVideo() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const outDir = path.resolve(__dirname, 'inspection_data', 'user_screen_recording');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await page.goto('http://localhost:3000/inspect_products.html'); // or any page on dev server
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; height:100vh;">
        <video id="vid" src="http://localhost:3000/user_recording.mp4" playsinline style="max-width:100vw; max-height:100vh; object-fit:contain;"></video>
      </body>
    </html>
  `);

  const duration = await page.evaluate(async () => {
    const vid = document.getElementById('vid');
    if (vid.readyState < 1) {
      await new Promise((res, rej) => {
        vid.onloadedmetadata = res;
        vid.onerror = rej;
      });
    }
    return vid.duration;
  });

  console.log('Video Duration:', duration);

  const numFrames = 12;
  const step = duration / (numFrames - 1);
  for (let i = 0; i < numFrames; i++) {
    const t = i * step;
    await page.evaluate((time) => {
      const vid = document.getElementById('vid');
      vid.currentTime = time;
      return new Promise(res => { vid.onseeked = res; });
    }, t);
    await page.waitForTimeout(100);
    const snapPath = path.join(outDir, `frame_${i}_${t.toFixed(1)}s.png`);
    await page.locator('#vid').screenshot({ path: snapPath });
    console.log(`Saved frame at ${t.toFixed(1)}s to ${snapPath}`);
  }

  await browser.close();
}

inspectVideo().catch(console.error);
