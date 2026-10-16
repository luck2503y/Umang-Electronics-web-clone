const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const videoPath = path.resolve(__dirname, 'Screen Recording 2026-10-16 215503.mp4');

const server = http.createServer((req, res) => {
  if (req.url === '/video.mp4') {
    const stat = fs.statSync(videoPath);
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <body style="margin:0; background:#000;">
          <video id="vid" src="/video.mp4" playsinline style="width:100vw; height:100vh; object-fit:contain;"></video>
        </body>
      </html>
    `);
  }
});

server.listen(4569, async () => {
  console.log('Server listening on http://localhost:4569');
  const outDir = path.resolve(__dirname, 'inspection_data', 'scroll_video_frames');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4569/');
  const duration = await page.evaluate(async () => {
    const vid = document.getElementById('vid');
    if (vid.readyState < 1) {
      await new Promise(r => { vid.onloadedmetadata = r; });
    }
    return vid.duration;
  });
  console.log('Video duration:', duration);

  const step = Math.max(0.5, duration / 12);
  for (let t = 0; t <= duration; t += step) {
    await page.evaluate((time) => {
      const vid = document.getElementById('vid');
      vid.currentTime = time;
      return new Promise(r => { vid.onseeked = r; });
    }, t);
    await page.waitForTimeout(60);
    const snapPath = path.join(outDir, `frame_${t.toFixed(1)}s.png`);
    await page.locator('#vid').screenshot({ path: snapPath });
    console.log(`Saved ${t.toFixed(1)}s -> ${snapPath}`);
  }

  await browser.close();
  server.close();
  console.log('Completed frame extraction.');
});
