const { chromium } = require('playwright');
const fs = require('fs');

async function getChunk() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  const mjsFiles = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('.mjs')) {
      try {
        const text = await res.text();
        if (text.includes('Intro-1')) {
          console.log('FOUND Intro-1 in response:', url);
          fs.writeFileSync('inspection_data/loader_component_script.js', text);
        }
      } catch (e) {}
    }
  });

  await page.goto('https://madebykota.com/', { waitUntil: 'networkidle' });
  await browser.close();
}
getChunk().catch(console.error);
