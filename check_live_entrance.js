const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function checkLiveEntrance() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const dir = 'inspection_data/live_entrance';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log('Navigating to https://madebykota.com/ ...');
  await page.goto('https://madebykota.com/', { waitUntil: 'commit' });

  // Take rapid screenshots during first 2.5 seconds
  for (let i = 0; i <= 10; i++) {
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(dir, `live_${i * 250}ms.png`) });
  }

  // Also check if there is a preloader element in DOM
  const preloader = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*'));
    return els.filter(el => {
      const cls = (el.className || '') + ' ' + (el.id || '');
      return /load|intro|splash|counter|progress/i.test(cls);
    }).map(el => ({ tag: el.tagName, id: el.id, class: el.className, text: el.innerText?.slice(0, 50) }));
  });

  console.log('Preloader elements found on live site:', preloader);

  await browser.close();
}

checkLiveEntrance().catch(console.error);
