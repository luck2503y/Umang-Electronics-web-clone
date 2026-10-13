const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function inspectSubpages() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. /products
  const prodFilePath = 'file://' + path.resolve('inspection_data/page__products.html').replace(/\\/g, '/');
  await page.goto(prodFilePath, { waitUntil: 'load' });
  const prodData = await page.evaluate(() => {
    const title = document.title;
    const h1 = document.querySelector('h1')?.innerText;
    const cards = Array.from(document.querySelectorAll('a[href*="/products/"]')).map(a => {
      const text = a.innerText.trim();
      const img = a.querySelector('img')?.src;
      const rect = a.getBoundingClientRect();
      return { href: a.getAttribute('href'), text, img, rect };
    }).filter(c => c.text && c.rect.width > 50);

    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    return { title, h1, bodyBg, cards };
  });
  console.log('PRODUCTS DATA:', JSON.stringify(prodData, null, 2));
  fs.writeFileSync('inspection_data/products_audit.json', JSON.stringify(prodData, null, 2));

  // 2. /products/orionix
  const oriFilePath = 'file://' + path.resolve('inspection_data/page__products_orionix.html').replace(/\\/g, '/');
  await page.goto(oriFilePath, { waitUntil: 'load' });
  const oriData = await page.evaluate(() => {
    const title = document.title;
    const buttons = Array.from(document.querySelectorAll('button, a')).map(b => ({
      text: b.innerText.trim(),
      href: b.getAttribute('href'),
      classes: b.className
    })).filter(b => b.text);

    const images = Array.from(document.querySelectorAll('img')).map(i => ({
      src: i.src,
      alt: i.alt,
      width: i.width,
      height: i.height
    })).filter(i => i.width > 20);

    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const mainHtml = document.querySelector('main, #main, [data-framer-name="Main"]')?.innerHTML?.slice(0, 3000) || '';
    return { title, bodyBg, buttons, imagesCount: images.length, images: images.slice(0, 10), mainSnippet: mainHtml };
  });
  console.log('ORIONIX DATA:', JSON.stringify({ ...oriData, mainSnippet: undefined }, null, 2));
  fs.writeFileSync('inspection_data/orionix_audit.json', JSON.stringify(oriData, null, 2));

  // 3. /docs
  const docsFilePath = 'file://' + path.resolve('inspection_data/page__docs.html').replace(/\\/g, '/');
  await page.goto(docsFilePath, { waitUntil: 'load' });
  const docsData = await page.evaluate(() => {
    const title = document.title;
    const sidebarItems = Array.from(document.querySelectorAll('[data-framer-name*="Module"], [data-framer-name*="Item"], li, a')).map(el => el.innerText.trim()).filter(t => t.length > 0 && t.length < 50);
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    return { title, bodyBg, sidebarItems: Array.from(new Set(sidebarItems)) };
  });
  console.log('DOCS DATA:', JSON.stringify(docsData, null, 2));
  fs.writeFileSync('inspection_data/docs_audit.json', JSON.stringify(docsData, null, 2));

  await browser.close();
}

inspectSubpages().catch(console.error);
