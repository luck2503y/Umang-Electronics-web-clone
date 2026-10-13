const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  const videos = await page.$$eval('[data-framer-name="Section - Services"] video', els => els.map(e => e.src || (e.querySelector('source') ? e.querySelector('source').src : '')));
  console.log('Services video sources:', videos);
  
  // Also get ALL videos across the page
  const allVideos = await page.$$eval('video', els => els.map(e => e.src || (e.querySelector('source') ? e.querySelector('source').src : '')));
  console.log('All page video sources:', allVideos);
  await browser.close();
})();
