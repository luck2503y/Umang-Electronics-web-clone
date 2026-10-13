const { chromium } = require('playwright');
const fs = require('fs');

async function inspectProductPages() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Inspect /products
  console.log('Navigating to https://madebykota.com/products ...');
  await page.goto('https://madebykota.com/products', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const productsData = await page.evaluate(() => {
    // Find all interactive filters or links
    const links = Array.from(document.querySelectorAll('a, button')).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
      tag: a.tagName
    })).filter(x => x.text.length > 0);
    const h1 = document.querySelector('h1')?.innerText;
    return { h1, links: links.slice(0, 30) };
  });
  console.log('PRODUCTS PAGE DATA:', JSON.stringify(productsData, null, 2));

  // 2. Inspect /products/orionix
  console.log('Navigating to https://madebykota.com/products/orionix ...');
  await page.goto('https://madebykota.com/products/orionix', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const orionixData = await page.evaluate(() => {
    const title = document.querySelector('h1, h2')?.innerText;
    const buttons = Array.from(document.querySelectorAll('button, a')).map(b => ({
      text: b.innerText.trim(),
      href: b.getAttribute('href'),
      tag: b.tagName
    })).filter(x => x.text.length > 0);
    // Find thumbnails or side nav
    const images = Array.from(document.querySelectorAll('img')).map(i => ({
      src: i.src,
      alt: i.alt,
      width: i.naturalWidth,
      height: i.naturalHeight
    }));
    return { title, buttons: buttons.slice(0, 25), imagesCount: images.length, sampleImages: images.slice(0, 8) };
  });
  console.log('ORIONIX DATA:', JSON.stringify(orionixData, null, 2));

  await browser.close();
}

inspectProductPages().catch(console.error);
