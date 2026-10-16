const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const videoPath = path.resolve(__dirname, 'Screen Recording 2026-10-15 161738.mp4');

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

server.listen(4567, async () => {
  console.log('Server listening on http://localhost:4567');
  const outDir = path.resolve(__dirname, 'inspection_data', 'video_frames_precise');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4567/');
  await page.waitForFunction(() => {
    const vid = document.getElementById('vid');
    return vid && vid.readyState >= 2;
  });

  for (let t = 4.0; t <= 10.0; t += 0.2) {
    await page.evaluate((time) => {
      const vid = document.getElementById('vid');
      vid.currentTime = time;
      return new Promise(r => { vid.onseeked = r; });
    }, t);
    await page.waitForTimeout(60);
    const snapPath = path.join(outDir, `frame_${t.toFixed(1)}s.png`);
    await page.locator('#vid').screenshot({ path: snapPath });
    console.log(`Saved ${t.toFixed(1)}s`);
  }

  await browser.close();
  server.close();
  console.log('Completed frame extraction.');
});
